// import { GLOBALTYPES } from "./globalTypes";
// import { getDataAPI } from "../../utils/fetchData";

// export const ALL_TYPES = {
//   LOADING: "LOADING_ALL",
//   GET_POSTS: "GET_ALL_POSTS",
//   UPDATE_POSTS: "UPDATE_ALL_POSTS",
// };

// export const getAllPosts = (token) => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_TYPES.LOADING, payload: true });

//     const res = await getDataAPI(`post_all`, token);

//     dispatch({ type: ALL_TYPES.GET_POSTS, payload: res.data });

//     dispatch({ type: ALL_TYPES.LOADING, payload: false });
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: { error: err.response.data.msg },
//     });
//   }
// };

// import { GLOBALTYPES } from "./globalTypes";
// import {
//   postDataAPIall,
//   getDataAPI,
//   patchDataAPIall,
//   deleteDataAPI,
// } from "../../utils/fetchData";
// import { imageUpload } from "../../utils/imageUpload";
// import { createNotify, removeNotify } from "./notifyAction";

// export const ALL_TYPES = {
//   CREATE_ALL: "CREATE_ALL",
//   LOADING_ALL: "LOADING_ALL",
//   GET_ALLS: "GET_ALLS",
//   UPDATE_ALL: "UPDATE_ALL",
//   GET_ALL: "GET_ALL",
//   DELETE_ALL: "DELETE_ALL",
//   REPORT_ALL: "REPORT_ALL",
//   SAVE_ALL: "SAVE_ALL",
// };

// export const createAll = ({
//   content,
//   contentsub,
//   community,
//   images,
//   auth,
//   socket,
// }) => async (dispatch) => {
//   let media = [];

//   try {
//     dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

//     if (images.length > 0) {
//       media = await imageUpload(images);
//     }

//     const res = await postDataAPIall(
//       "alls",
//       { content, contentsub, community, images: media },
//       auth.token
//     );

//     dispatch({
//       type: ALL_TYPES.CREATE_ALL,
//       payload: { ...res.data.newAll, user: auth.user },
//     });

//     dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

//     // todo notification
//     const msg = {
//       id: res.data.newAll._id,
//       text: "Added a new all.",
//       recipients: res.data.newAll.user.followers,
//       url: `/all/${res.data.newAll._id}`,
//       content,
//       contentsub,
//       community,
//       image: media[0].url,
//     };

//     dispatch(createNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const getAlls = (token) => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_TYPES.LOADING_ALL, payload: true });
//     const res = await getDataAPI("alls", token);
//     dispatch({ type: ALL_TYPES.GET_ALLS, payload: { ...res.data, page: 2 } });

//     dispatch({ type: ALL_TYPES.LOADING_ALL, payload: false });
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const updateAll = ({
//   content,
//   contentsub,
//   community,
//   images,
//   auth,
//   status,
// }) => async (dispatch) => {
//   let media = [];
//   const imgNewUrl = images.filter((img) => !img.url);
//   const imgOldUrl = images.filter((img) => img.url);
//   if (
//     status.content === content &&
//     status.contentsub === contentsub &&
//     status.community === community &&
//     imgNewUrl.length === 0 &&
//     imgOldUrl.length === status.images.length
//   ) {
//     return;
//   }
//   try {
//     dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
//     if (imgNewUrl.length > 0) {
//       media = await imageUpload(imgNewUrl);
//     }
//     const res = await patchDataAPIall(
//       `all/${status._id}`,
//       { content, contentsub, community, images: [...imgOldUrl, ...media] },
//       auth.token
//     );

//     dispatch({ type: ALL_TYPES.UPDATE_ALL, payload: res.data.newAll });
//     dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const likeAll = ({ all, auth, socket }) => async (dispatch) => {
//   const newAll = { ...all, likes: [...all.likes, auth.user] };

//   dispatch({ type: ALL_TYPES.UPDATE_ALL, payload: newAll });
//   socket.emit("likeAll", newAll);

//   try {
//     await patchDataAPIall(`all/${all._id}/like`, null, auth.token);

//     // todo notification
//     const msg = {
//       id: auth.user._id,
//       text: "Liked your all.",
//       recipients: [all.user._id],
//       url: `/all/${all._id}`,
//       content: all.content,
//       contentsub: all.contentsub,
//       community: all.community,
//       image: all.images[0].url,
//     };

//     dispatch(createNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const unLikeAll = ({ all, auth, socket }) => async (dispatch) => {
//   const newAll = {
//     ...all,
//     likes: all.likes.filter((like) => like._id !== auth.user._id),
//   };

//   dispatch({ type: ALL_TYPES.UPDATE_ALL, payload: newAll });
//   socket.emit("unLikeAll", newAll);

//   try {
//     await patchDataAPIall(`all/${all._id}/unlike`, null, auth.token);

//     // todo notification
//     const msg = {
//       id: auth.user._id,
//       text: "Liked your all.",
//       recipients: [all.user._id],
//       url: `/all/${all._id}`,
//     };

//     dispatch(removeNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const likeleftAll = ({ all, auth, socket }) => async (dispatch) => {
//   const newAll = { ...all, likelefts: [...all.likelefts, auth.user] };

//   dispatch({ type: ALL_TYPES.UPDATE_ALL, payload: newAll });
//   socket.emit("likeleftAll", newAll);

//   try {
//     await patchDataAPIall(`all/${all._id}/likeleft`, null, auth.token);

//     // todo notification
//     const msg = {
//       id: auth.user._id,
//       text: "Likeleftd your all.",
//       recipients: [all.user._id],
//       url: `/all/${all._id}`,
//       content: all.content,
//       contentsub: all.contentsub,
//       community: all.community,
//       image: all.images[0].url,
//     };

//     dispatch(createNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const unLikeleftAll = ({ all, auth, socket }) => async (dispatch) => {
//   const newAll = {
//     ...all,
//     likelefts: all.likelefts.filter(
//       (likeleft) => likeleft._id !== auth.user._id
//     ),
//   };

//   dispatch({ type: ALL_TYPES.UPDATE_ALL, payload: newAll });
//   socket.emit("unLikeleftAll", newAll);

//   try {
//     await patchDataAPIall(`all/${all._id}/unlikeleft`, null, auth.token);

//     // todo notification
//     const msg = {
//       id: auth.user._id,
//       text: "Likeleftd your all.",
//       recipients: [all.user._id],
//       url: `/all/${all._id}`,
//     };

//     dispatch(removeNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const likerightAll = ({ all, auth, socket }) => async (dispatch) => {
//   const newAll = { ...all, likerights: [...all.likerights, auth.user] };
//   dispatch({ type: ALL_TYPES.UPDATE_ALL, payload: newAll });
//   socket.emit("likerightAll", newAll);

//   try {
//     await patchDataAPIall(`all/${all._id}/likeright`, null, auth.token);

//     // todo notification
//     const msg = {
//       id: auth.user._id,
//       text: "Likerightd your all.",
//       recipients: [all.user._id],
//       url: `/all/${all._id}`,
//       content: all.content,
//       contentsub: all.contentsub,
//       community: all.community,
//       image: all.images[0].url,
//     };

//     dispatch(createNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const unLikerightAll = ({ all, auth, socket }) => async (dispatch) => {
//   const newAll = {
//     ...all,
//     likerights: all.likerights.filter(
//       (likeright) => likeright._id !== auth.user._id
//     ),
//   };

//   dispatch({ type: ALL_TYPES.UPDATE_ALL, payload: newAll });
//   socket.emit("unLikerightAll", newAll);

//   try {
//     await patchDataAPIall(`all/${all._id}/unlikeright`, null, auth.token);

//     // todo notification
//     const msg = {
//       id: auth.user._id,
//       text: "Likerightd your all.",
//       recipients: [all.user._id],
//       url: `/all/${all._id}`,
//     };

//     dispatch(removeNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const getAll = ({ detailAll, id, auth }) => async (dispatch) => {
//   if (detailAll.every((all) => all._id !== id)) {
//     try {
//       const res = await getDataAPI(`all/${id}`, auth.token);
//       dispatch({ type: ALL_TYPES.GET_ALL, payload: res.data.all });
//     } catch (err) {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: {
//           error: err.response.data.msg,
//         },
//       });
//     }
//   }
// };

// export const deleteAll = ({ all, auth, socket }) => async (dispatch) => {
//   dispatch({ type: ALL_TYPES.DELETE_ALL, payload: all });

//   try {
//     const res = await deleteDataAPI(`all/${all._id}`, auth.token);

//     // todo notification
//     const msg = {
//       id: all._id,
//       text: "Added a new all.",
//       recipients: res.data.newAll.user.followers,
//       url: `/all/${all._id}`,
//     };

//     dispatch(removeNotify({ msg, auth, socket }));
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const reportAll = ({ all, auth }) => async (dispatch) => {
//   const reportExist = all.reports.find((report) => report === auth.user._id);

//   if (reportExist && reportExist.length > 0) {
//     return dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: { error: "You have already reported this all." },
//     });
//   }
//   const newAll = { ...all };
//   newAll.reports.push(auth.user._id);

//   dispatch({ type: ALL_TYPES.REPORT_ALL, payload: newAll });

//   try {
//     const res = await patchDataAPIall(
//       `all/${all._id}/report`,
//       null,
//       auth.token
//     );
//     dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const saveAll = ({ all, auth }) => async (dispatch) => {
//   const newUser = { ...auth.user, saved: [...auth.user.saved, all._id] };

//   dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

//   try {
//     await patchDataAPIall(`saveAll/${all._id}`, null, auth.token);
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };

// export const unSaveAll = ({ all, auth }) => async (dispatch) => {
//   const newUser = {
//     ...auth.user,
//     saved: auth.user.saved.filter((id) => id !== all._id),
//   };

//   dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

//   try {
//     await patchDataAPIall(`unSaveAll/${all._id}`, null, auth.token);
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.msg,
//       },
//     });
//   }
// };
