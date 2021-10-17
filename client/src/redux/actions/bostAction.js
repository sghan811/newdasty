import { GLOBALTYPES } from "./globalTypes";
import {
  postDataAPIbost,
  getDataAPI,
  patchDataAPIbost,
  deleteDataAPI,
} from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { createNotify, removeNotify } from "./notifyAction";

export const BOST_TYPES = {
  CREATE_BOST: "CREATE_BOST",
  LOADING_BOST: "LOADING_BOST",
  GET_BOSTS: "GET_BOSTS",
  UPDATE_BOST: "UPDATE_BOST",
  GET_BOST: "GET_BOST",
  DELETE_BOST: "DELETE_BOST",
  REPORT_BOST: "REPORT_BOST",
  SAVE_BOST: "SAVE_BOST",
};

export const createBost = ({
  content,
  contentsub,
  community,
  images,
  images2,
  auth,
  socket,
}) => async (dispatch) => {
  let media = [];
  let media2 = [];

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    if (images.length > 0) {
      media = await imageUpload(images);
    }
    if (images2.length > 0) {
      media2 = await imageUpload(images2);
    }

    const res = await postDataAPIbost(
      "bosts",
      { content, contentsub, community, images: media, images2: media2 },
      auth.token
    );

    dispatch({
      type: BOST_TYPES.CREATE_BOST,
      payload: { ...res.data.newBost, user: auth.user },
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    // todo notification
    const msg = {
      id: res.data.newBost._id,
      text: "Added a new bost.",
      recipients: res.data.newBost.user.followers,
      url: `/bost/${res.data.newBost._id}`,
      content,
      contentsub,
      community,
      image: media[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getBosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: BOST_TYPES.LOADING_BOST, payload: true });
    const res = await getDataAPI("bosts", token);
    dispatch({ type: BOST_TYPES.GET_BOSTS, payload: { ...res.data, page: 2 } });

    dispatch({ type: BOST_TYPES.LOADING_BOST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
// export const getAllBosts = (token) => async (dispatch) => {
//   try {
//     dispatch({ type: BOST_TYPES.LOADING_BOST, payload: true });
//     const res = await getDataAPI("bosts", token);
//     dispatch({ type: BOST_TYPES.GET_BOSTS, payload: { ...res.data, page: 2 } });

//     dispatch({ type: BOST_TYPES.LOADING_BOST, payload: false });
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

export const updateBost = ({
  content,
  contentsub,
  community,
  images,
  images2,
  auth,
  status,
}) => async (dispatch) => {
  let media = [];
  const imgNewUrl = images.filter((img) => !img.url);
  const imgOldUrl = images.filter((img) => img.url);
  let media2 = [];
  const imgNewUrl2 = images2.filter((img2) => !img2.url);
  const imgOldUrl2 = images2.filter((img2) => img2.url);
  if (
    status.content === content &&
    status.contentsub === contentsub &&
    status.community === community &&
    imgNewUrl.length === 0 &&
    imgOldUrl.length === status.images.length &&
    imgNewUrl2.length === 0 && //added part
    imgOldUrl2.length === status.images2.length //added part
  ) {
    return;
  }
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    if (imgNewUrl.length > 0) {
      media = await imageUpload(imgNewUrl);
    }
    if (imgNewUrl2.length > 0) {
      media2 = await imageUpload(imgNewUrl2);
    }
    const res = await patchDataAPIbost(
      `bost/${status._id}`,
      {
        content,
        contentsub,
        community,
        images: [...imgOldUrl, ...media],
        images2: [
          ...imgOldUrl2,
          ...media2,
        ] /* added title, images2: [...imgOldUrl2, ...media2]*/,
      },
      auth.token
    );

    dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: res.data.newBost });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const likeBost = ({ bost, auth, socket }) => async (dispatch) => {
  const newBost = { ...bost, likes: [...bost.likes, auth.user] };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
  socket.emit("likeBost", newBost);

  try {
    await patchDataAPIbost(`bost/${bost._id}/like`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Liked your bost.",
      recipients: [bost.user._id],
      url: `/bost/${bost._id}`,
      content: bost.content,
      contentsub: bost.contentsub,
      community: bost.community,
      image: bost.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const unLikeBost = ({ bost, auth, socket }) => async (dispatch) => {
  const newBost = {
    ...bost,
    likes: bost.likes.filter((like) => like._id !== auth.user._id),
  };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
  socket.emit("unLikeBost", newBost);

  try {
    await patchDataAPIbost(`bost/${bost._id}/unlike`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Liked your bost.",
      recipients: [bost.user._id],
      url: `/bost/${bost._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const likeleftBost = ({ bost, auth, socket }) => async (dispatch) => {
  const newBost = { ...bost, likelefts: [...bost.likelefts, auth.user] };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
  socket.emit("likeleftBost", newBost);

  try {
    await patchDataAPIbost(`bost/${bost._id}/likeleft`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likeleftd your bost.",
      recipients: [bost.user._id],
      url: `/bost/${bost._id}`,
      content: bost.content,
      contentsub: bost.contentsub,
      community: bost.community,
      image: bost.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const unLikeleftBost = ({ bost, auth, socket }) => async (dispatch) => {
  const newBost = {
    ...bost,
    likelefts: bost.likelefts.filter(
      (likeleft) => likeleft._id !== auth.user._id
    ),
  };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
  socket.emit("unLikeleftBost", newBost);

  try {
    await patchDataAPIbost(`bost/${bost._id}/unlikeleft`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likeleftd your bost.",
      recipients: [bost.user._id],
      url: `/bost/${bost._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const likerightBost = ({ bost, auth, socket }) => async (dispatch) => {
  const newBost = { ...bost, likerights: [...bost.likerights, auth.user] };
  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
  socket.emit("likerightBost", newBost);

  try {
    await patchDataAPIbost(`bost/${bost._id}/likeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your bost.",
      recipients: [bost.user._id],
      url: `/bost/${bost._id}`,
      content: bost.content,
      contentsub: bost.contentsub,
      community: bost.community,
      image: bost.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const unLikerightBost = ({ bost, auth, socket }) => async (dispatch) => {
  const newBost = {
    ...bost,
    likerights: bost.likerights.filter(
      (likeright) => likeright._id !== auth.user._id
    ),
  };

  dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
  socket.emit("unLikerightBost", newBost);

  try {
    await patchDataAPIbost(`bost/${bost._id}/unlikeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your bost.",
      recipients: [bost.user._id],
      url: `/bost/${bost._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getBost = ({ detailBost, id, auth }) => async (dispatch) => {
  if (detailBost.every((bost) => bost._id !== id)) {
    try {
      const res = await getDataAPI(`bost/${id}`, auth.token);
      dispatch({ type: BOST_TYPES.GET_BOST, payload: res.data.bost });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};

export const deleteBost = ({ bost, auth, socket }) => async (dispatch) => {
  dispatch({ type: BOST_TYPES.DELETE_BOST, payload: bost });

  try {
    const res = await deleteDataAPI(`bost/${bost._id}`, auth.token);

    // todo notification
    const msg = {
      id: bost._id,
      text: "Added a new bost.",
      recipients: res.data.newBost.user.followers,
      url: `/bost/${bost._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const reportBost = ({ bost, auth }) => async (dispatch) => {
  const reportExist = bost.reports.find((report) => report === auth.user._id);

  if (reportExist && reportExist.length > 0) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "You have already reported this bost." },
    });
  }
  const newBost = { ...bost };
  newBost.reports.push(auth.user._id);

  dispatch({ type: BOST_TYPES.REPORT_BOST, payload: newBost });

  try {
    const res = await patchDataAPIbost(
      `bost/${bost._id}/report`,
      null,
      auth.token
    );
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const saveBost = ({ bost, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: [...auth.user.saved, bost._id] };

  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPIbost(`saveBost/${bost._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const unSaveBost = ({ bost, auth }) => async (dispatch) => {
  const newUser = {
    ...auth.user,
    saved: auth.user.saved.filter((id) => id !== bost._id),
  };

  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPIbost(`unSaveBost/${bost._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
