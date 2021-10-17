import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const CommuStatus = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status d-flex">
      <div className="big-avatar-cover">
        <Avatar src={auth.user.avatar} size="big-avatar" className="" />
      </div>
      <button
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS2, payload: true })}
        className="statusBtn flex-fill "
        style={{ marginLeft: "7px" }}
      >
        {/* ENG */}
        {/* <span>{auth.user.username}, What's on your mind?</span> */}
        <span className="whatstory">오늘은 어떤 이야기를 해볼까?</span>
      </button>
    </div>
  );
};

export default CommuStatus;
