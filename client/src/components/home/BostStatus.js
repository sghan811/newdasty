import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const BostStatus = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="">
      <button
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS1, payload: true })}
        className="statusBtn flex-fill "
        style={{ marginLeft: "7px" }}
      >
        <span>{auth.user.username}, Make your own community</span>
      </button>
    </div>
  );
};

export default BostStatus;
