import { GLOBALTYPES, EditDatabost, DeleteData } from "./globalTypes";
import { BOST_TYPES } from "./bostAction";
import { createNotify, removeNotify } from "./notifyAction";
import {
  postDataAPIbost,
  patchDataAPIbost,
  deleteDataAPI,
} from "../../utils/fetchData";

export const createBomment = ({ bost, newBomment, auth, socket }) => async (
  dispatch
) => {
  const newBost = { ...bost, bomments: [...bost.bomments, newBomment] };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });

  try {
    const data = {
      ...newBomment,
      bostId: bost._id,
      bostUserId: bost.user._id,
    };
    const res = await postDataAPIbost("bomment", data, auth.token);

    const newData = { ...res.data.newBomment, user: auth.user };
    const newBost = { ...bost, bomments: [...bost.bomments, newData] };
    dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });

    // todo socket
    socket.emit("createBomment", newBost);

    // todo notification
    const msg = {
      id: res.data.newBomment._id,
      text: newBomment.reply
        ? "mentioned you in a bomment."
        : "bommented on your bost.",
      recipients: newBomment.reply ? [newBomment.tag._id] : [bost.user._id],
      url: `/bost/${bost._id}`,
      content: newBomment.reply ? newBomment.content : bost.content,
      image: bost.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updateBomment = ({ bomment, bost, content, auth }) => async (
  dispatch
) => {
  const newBomments = EditDatabost(bost.bomments, bomment._id, {
    ...bomment,
    content,
  });
  const newBost = { ...bost, bomments: newBomments };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });

  try {
    await patchDataAPIbost(`bomment/${bomment._id}`, { content }, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const likeBomment = ({ bomment, bost, auth }) => async (dispatch) => {
  const newBomment = { ...bomment, likes: [...bomment.likes, auth.user] };
  const newBomments = EditDatabost(bost.bomments, bomment._id, newBomment);
  const newBost = { ...bost, bomments: newBomments };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
  try {
    await patchDataAPIbost(`bomment/${bomment._id}/like`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const unLikeBomment = ({ bomment, bost, auth }) => async (dispatch) => {
  const newBomment = {
    ...bomment,
    likes: DeleteData(bomment.likes, auth.user._id),
  };
  const newBomments = EditDatabost(bost.bomments, bomment._id, newBomment);
  const newBost = { ...bost, bomments: newBomments };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
  try {
    await patchDataAPIbost(`bomment/${bomment._id}/unlike`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const deleteBomment = ({ bost, bomment, auth, socket }) => async (
  dispatch
) => {
  const deleteArr = [
    ...bost.bomments.filter((cm) => cm.reply === bomment._id),
    bomment,
  ];

  const newBost = {
    ...bost,
    bomments: bost.bomments.filter(
      (cm) => !deleteArr.find((da) => cm._id === da._id)
    ),
  };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });

  socket.emit("deleteBomment", newBost);

  try {
    deleteArr.forEach((item) => {
      deleteDataAPI(`bomment/${item._id}`, auth.token);

      // todo notification
      const msg = {
        id: item._id,
        text: item.reply
          ? "mentioned you in a bomment."
          : "bommented on your bost.",
        recipients: item.reply ? [item.tag._id] : [bost.user._id],
        url: `/bost/${bost._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
