import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI, deleteDataAPI } from "../../utils/fetchData";
import { createNotify } from "./notifyAction";

export const ADMIN_TYPES = {
  GET_TOTAL_USERS: "GET_TOTAL_USERS",
  GET_TOTAL_POSTS: "GET_TOTAL_POSTS",
  GET_TOTAL_BOSTS: "GET_TOTAL_BOSTS",
  GET_TOTAL_COMMENTS: "GET_TOTAL_COMMENTS",
  GET_TOTAL_LIKES: "GET_TOTAL_LIKES",
  GET_TOTAL_LIKELEFTS: "GET_TOTAL_LIKELEFTS",
  GET_TOTAL_LIKERIGHTS: "GET_TOTAL_LIKERIGHTS",
  GET_TOTAL_SPAM_POSTS: "GET_TOTAL_SPAM_POSTS",
  GET_TOTAL_SPAM_BOSTS: "GET_TOTAL_SPAM_BOSTS",
  GET_TOTAL_ACTIVE_USERS: "GET_TOTAL_ACTIVE_USERS",
  GET_SPAM_POSTS: "GET_SPAM_POSTS",
  GET_SPAM_BOSTS: "GET_SPAM_BOSTS",
  LOADING_ADMIN: "LOADING_ADMIN",
  DELETE_POST: "DELETE_POST",
  DELETE_BOST: "DELETE_BOST",
};

export const getTotalUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_users", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_USERS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getTotalPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_posts", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_POSTS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getTotalBosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_bosts", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_BOSTS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getTotalComments = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_comments", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_COMMENTS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getTotalLikes = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_likes", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_LIKES, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getTotalLikerights = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_likerights", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_LIKERIGHTS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getTotalLikelefts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_likelefts", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_LIKELEFTS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getTotalSpamPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_spam_posts", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_SPAM_POSTS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getTotalSpamBosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_total_spam_bosts", token);
    dispatch({ type: ADMIN_TYPES.GET_TOTAL_SPAM_BOSTS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getSpamPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_spam_posts", token);

    dispatch({ type: ADMIN_TYPES.GET_SPAM_POSTS, payload: res.data.spamPosts });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getSpamBosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: true });
    const res = await getDataAPI("get_spam_bosts", token);

    dispatch({ type: ADMIN_TYPES.GET_SPAM_BOSTS, payload: res.data.spamBosts });

    dispatch({ type: ADMIN_TYPES.LOADING_ADMIN, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const deleteSpamPost = ({ post, auth, socket }) => async (dispatch) => {
  dispatch({ type: ADMIN_TYPES.DELETE_POST, payload: post });

  try {
    const res = await deleteDataAPI(
      `delete_spam_posts/${post._id}`,
      auth.token
    );

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Your Post is deleted due to too many reports.",
      recipients: [post.user._id],
      url: `/profile/${post.user._id}`,
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

export const deleteSpamBost = ({ bost, auth, socket }) => async (dispatch) => {
  dispatch({ type: ADMIN_TYPES.DELETE_BOST, payload: bost });

  try {
    const res = await deleteDataAPI(
      `delete_spam_bosts/${bost._id}`,
      auth.token
    );

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Your Bost is deleted due to too many reports.",
      recipients: [bost.user._id],
      url: `/profile/${bost.user._id}`,
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

export const getTotalActiveUsers = ({ auth, socket }) => async (dispatch) => {
  try {
    socket.emit("getActiveUsers", auth.user._id);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
