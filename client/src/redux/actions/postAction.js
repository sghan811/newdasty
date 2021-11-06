import { GLOBALTYPES } from "./globalTypes";
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { createNotify, removeNotify } from "./notifyAction";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  GET_ALLPOSTS: "GET_ALLPOSTS",
  UPDATE_POST: "UPDATE_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
  REPORT_POST: "REPORT_POST",
  SAVE_POST: "SAVE_POST",
};
export const ALL_TYPES = {
  LOADING_POST: "LOADING_ALL",
  GET_POSTS: "GET_ALL_POSTS",
  UPDATE_POST: "UPDATE_ALL_POST",
  DELETE_POST: "DELETE_ALL_POST",
  UPDATE_POSTS: "UPDATE_ALL_POSTS",
};
export const COM_TYPES = {
  LOADING_POST: "LOADING_COM",
  GET_POSTS: "GET_COM_POSTS",
  UPDATE_POST: "UPDATE_COM_POST",
  DELETE_POST: "DELETE_COM_POST",
  UPDATE_POSTS: "UPDATE_COM_POSTS",
};

export const createPost = ({
  content,
  contentsub,
  community,
  trend1,
  trend2,
  trend3,
  images,
  images2, //added part
  title, //added part
  auth,
  socket,
}) => async (dispatch) => {
  let media = [];
  let media2 = []; //added part

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    if (images.length > 0) {
      media = await imageUpload(images);
    }
    //added from here
    if (images2.length > 0) {
      media2 = await imageUpload(images2);
    }
    //to here

    const res = await postDataAPI(
      "posts",
      {
        content,
        contentsub,
        community,
        title,
        trend1,
        trend2,
        trend3,
        images: media,
        images2: media2 /* added title, images2: media2*/,
      },
      auth.token
    );

    dispatch({
      type: POST_TYPES.CREATE_POST,
      payload: { ...res.data.newPost, user: auth.user },
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    // todo notification
    const msg = {
      id: res.data.newPost._id,
      text: "Added a new post.",
      recipients: res.data.newPost.user.followers,
      url: `/post/${res.data.newPost._id}`,
      title, //added part
      content,
      trend1,
      trend2,
      trend3,
      contentsub,
      community,
      image: media[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataAPI("posts", token);
    dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: 2 } });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const getAllPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ALL_TYPES.LOADING_POST, payload: true });
    const res = await getDataAPI("post_all", token);
    dispatch({ type: ALL_TYPES.GET_POSTS, payload: { ...res.data, page: 2 } });

    dispatch({ type: ALL_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const updatePost = ({
  content,
  contentsub,
  community,
  trend1,
  trend2,
  trend3,
  images,
  images2, //added part
  title, //added part
  auth,
  status,
}) => async (dispatch) => {
  let media = [];
  const imgNewUrl = images.filter((img) => !img.url);
  const imgOldUrl = images.filter((img) => img.url);
  //added from here
  let media2 = [];
  const imgNewUrl2 = images2.filter((img2) => !img2.url);
  const imgOldUrl2 = images2.filter((img2) => img2.url);
  //to here
  if (
    status.content === content &&
    status.contentsub === contentsub &&
    status.community === community &&
    status.trend1 === trend1 &&
    status.trend2 === trend2 &&
    status.trend3 === trend3 &&
    status.title === title && //added part
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
    //added from here
    if (imgNewUrl2.length > 0) {
      media2 = await imageUpload(imgNewUrl2);
    }
    //to here
    const res = await patchDataAPI(
      `post/${status._id}`,
      {
        content,
        contentsub,
        community,
        trend1,
        trend2,
        trend3,
        title,
        images: [...imgOldUrl, ...media],
        images2: [
          ...imgOldUrl2,
          ...media2,
        ] /* added title, images2: [...imgOldUrl2, ...media2]*/,
      },
      auth.token
    );

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: [...post.likes, auth.user] };

  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likePost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/like`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Liked your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likeAll = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: [...post.likes, auth.user] };

  dispatch({ type: ALL_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likeAll", newPost);

  try {
    await patchDataAPI(`post/${post._id}/likeall`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Liked your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likeCom = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: [...post.likes, auth.user] };

  dispatch({ type: COM_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likeCom", newPost);

  try {
    await patchDataAPI(`post/${post._id}/likeall`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Liked your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likes: post.likes.filter((like) => like._id !== auth.user._id),
  };

  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikePost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Liked your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikeAll = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likes: post.likes.filter((like) => like._id !== auth.user._id),
  };

  dispatch({ type: ALL_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikeAll", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Liked your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikeCom = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likes: post.likes.filter((like) => like._id !== auth.user._id),
  };

  dispatch({ type: COM_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikeCom", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Liked your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likeleftPost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likelefts: [...post.likelefts, auth.user] };

  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likeleftPost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/likeleft`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likeleftd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likeleftAll = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likelefts: [...post.likelefts, auth.user] };

  dispatch({ type: ALL_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likeleftAll", newPost);

  try {
    await patchDataAPI(`post/${post._id}/likeleft`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likeleftd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likeleftCom = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likelefts: [...post.likelefts, auth.user] };

  dispatch({ type: COM_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likeleftCom", newPost);

  try {
    await patchDataAPI(`post/${post._id}/likeleft`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likeleftd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikeleftPost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likelefts: post.likelefts.filter(
      (likeleft) => likeleft._id !== auth.user._id
    ),
  };

  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikeleftPost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlikeleft`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likeleftd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikeleftAll = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likelefts: post.likelefts.filter(
      (likeleft) => likeleft._id !== auth.user._id
    ),
  };

  dispatch({ type: ALL_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikeleftAll", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlikeleft`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likeleftd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikeleftCom = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likelefts: post.likelefts.filter(
      (likeleft) => likeleft._id !== auth.user._id
    ),
  };

  dispatch({ type: COM_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikeleftCom", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlikeleft`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likeleftd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likerightPost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likerights: [...post.likerights, auth.user] };
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likerightPost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/likeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likerightAll = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likerights: [...post.likerights, auth.user] };
  dispatch({ type: ALL_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likerightAll", newPost);

  try {
    await patchDataAPI(`post/${post._id}/likeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const likerightCom = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likerights: [...post.likerights, auth.user] };
  dispatch({ type: COM_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("likerightCom", newPost);

  try {
    await patchDataAPI(`post/${post._id}/likeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      contentsub: post.contentsub,
      community: post.community,
      title: post.title, //added part
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikerightPost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likerights: post.likerights.filter(
      (likeright) => likeright._id !== auth.user._id
    ),
  };

  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikerightPost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlikeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikerightAll = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likerights: post.likerights.filter(
      (likeright) => likeright._id !== auth.user._id
    ),
  };

  dispatch({ type: ALL_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikerightAll", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlikeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikerightCom = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likerights: post.likerights.filter(
      (likeright) => likeright._id !== auth.user._id
    ),
  };

  dispatch({ type: COM_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikerightCom", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlikeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unLikerightPostLikeleftPost = ({ post, auth, socket }) => async (
  dispatch
) => {
  const newPost = {
    ...post,
    likerights: post.likerights.filter(
      (likeright) => likeright._id !== auth.user._id
    ),
  };

  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  socket.emit("unLikerightPost", newPost);
  socket.emit("likeleftPost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlikeright`, null, auth.token);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "Likerightd your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const getPost = ({ detailPost, id, auth }) => async (dispatch) => {
  if (detailPost.every((post) => post._id !== id)) {
    try {
      const res = await getDataAPI(`post/${id}`, auth.token);
      dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          // error: err.response.data.msg,
        },
      });
    }
  }
};

export const deletePost = ({ post, auth, socket }) => async (dispatch) => {
  dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

  try {
    const res = await deleteDataAPI(`post/${post._id}`, auth.token);

    // todo notification
    const msg = {
      id: post._id,
      text: "Added a new post.",
      recipients: res.data.newPost.user.followers,
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const deleteAll = ({ post, auth, socket }) => async (dispatch) => {
  dispatch({ type: ALL_TYPES.DELETE_POST, payload: post });

  try {
    const res = await deleteDataAPI(`post/${post._id}`, auth.token);

    // todo notification
    const msg = {
      id: post._id,
      text: "Added a new post.",
      recipients: res.data.newPost.user.followers,
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const deleteCom = ({ post, auth, socket }) => async (dispatch) => {
  dispatch({ type: COM_TYPES.DELETE_POST, payload: post });

  try {
    const res = await deleteDataAPI(`post/${post._id}`, auth.token);

    // todo notification
    const msg = {
      id: post._id,
      text: "Added a new post.",
      recipients: res.data.newPost.user.followers,
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const reportPost = ({ post, auth }) => async (dispatch) => {
  const reportExist = post.reports.find((report) => report === auth.user._id);

  if (reportExist && reportExist.length > 0) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "You have already reported this post." },
    });
  }
  const newPost = { ...post };
  newPost.reports.push(auth.user._id);

  dispatch({ type: POST_TYPES.REPORT_POST, payload: newPost });

  try {
    const res = await patchDataAPI(`post/${post._id}/report`, null, auth.token);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const savePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };

  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI(`savePost/${post._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};

export const unSavePost = ({ post, auth }) => async (dispatch) => {
  const newUser = {
    ...auth.user,
    saved: auth.user.saved.filter((id) => id !== post._id),
  };

  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI(`unSavePost/${post._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        // error: err.response.data.msg,
      },
    });
  }
};
