import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";
import { ALL_TYPES } from "./redux/actions/allAction";
import { BOST_TYPES } from "./redux/actions/bostAction";
import { ALLBOST_TYPES } from "./redux/actions/allbostAction";
import { ADMIN_TYPES } from "./redux/actions/adminAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { NOTIFY_TYPES } from "./redux/actions/notifyAction";
import { MESSAGE_TYPES } from "./redux/actions/messageAction";

import audioTone from "./audio/pristine-609.mp3";

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);
  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };
};

const SocketClient = () => {
  const { auth, socket, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const audioRef = useRef();

  //!connection
  useEffect(() => {
    if (auth.user.role === "user") {
      socket.emit("joinUser", auth.user._id);
    } else if (auth.user.role === "admin") {
      socket.emit("joinAdmin", auth.user._id);
    }
  }, [socket, auth.user.role, auth.user._id]);

  useEffect(() => {
    socket.on("getActiveUsersToClient", (totalActiveUsers) => {
      dispatch({
        type: ADMIN_TYPES.GET_TOTAL_ACTIVE_USERS,
        payload: totalActiveUsers,
      });
    });
    return () => socket.off("getActiveUsersToClient");
  }, [socket, dispatch]);

  //!like Post
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("likeToClient");
  }, [socket, dispatch]);
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch({ type: ALL_TYPES.UPDATE_ALL, payload: newPost });
    });
    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  //!like Bost
  useEffect(() => {
    socket.on("likeToClient", (newBost) => {
      dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
    });
    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("likeToClient", (newBost) => {
      dispatch({ type: ALLBOST_TYPES.UPDATE_ALLBOST, payload: newBost });
    });
    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  //!Unlike Post
  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      dispatch({ type: ALLBOST_TYPES.UPDATE_ALLBOST, payload: newPost });
    });
    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);
  //!Unlike Bost
  useEffect(() => {
    socket.on("unLikeToClient", (newBost) => {
      dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
    });
    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  //!likeleft Post
  useEffect(() => {
    socket.on("likeleftToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("likeleftToClient");
  }, [socket, dispatch]);
  //!Unlike Bost
  useEffect(() => {
    socket.on("likeleftToClient", (newBost) => {
      dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
    });
    return () => socket.off("likeleftToClient");
  }, [socket, dispatch]);

  //!Unlikeleft Post
  useEffect(() => {
    socket.on("unLikeleftToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("unLikeleftToClient");
  }, [socket, dispatch]);

  //!Unlikeleft Bost
  useEffect(() => {
    socket.on("unLikeleftToClient", (newBost) => {
      dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
    });
    return () => socket.off("unLikeleftToClient");
  }, [socket, dispatch]);

  //!likeright Post
  useEffect(() => {
    socket.on("likerightToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("likerightToClient");
  }, [socket, dispatch]);

  //!likeright Bost
  useEffect(() => {
    socket.on("likerightToClient", (newBost) => {
      dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
    });
    return () => socket.off("likerightToClient");
  }, [socket, dispatch]);

  //!Unlikeright Post
  useEffect(() => {
    socket.on("unLikerightToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("unLikerightToClient");
  }, [socket, dispatch]);

  //!Unlikeright Bost
  useEffect(() => {
    socket.on("unLikerightToClient", (newBost) => {
      dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
    });
    return () => socket.off("unLikerightToClient");
  }, [socket, dispatch]);

  //!Comments
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("createBommentToClient", (newBost) => {
      dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
    });
    return () => socket.off("createBommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("deleteBommentToClient", (newBost) => {
      dispatch({ type: BOST_TYPES.UPDATE_BOST, payload: newBost });
    });
    return () => socket.off("deleteBommentToClient");
  }, [socket, dispatch]);

  //!Follow
  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });
    return () => socket.off("followToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, user: newUser },
      });
    });
    return () => socket.off("unFollowToClient");
  }, [socket, dispatch, auth]);

  //!Notifications
  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });

      if (notify.sound) {
        audioRef.current.play();
      }
      spawnNotification(
        msg.user.username + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "Dasty"
      );
    });
    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch, notify.sound]);

  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    });
    return () => socket.off("removeNotifyToClient");
  }, [socket, dispatch]);

  //!Messages
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });
    });
    return () => socket.off("addMessageToClient");
  }, []);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audioTone} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
