import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

const UserCardBuggest = ({
  children,
  user,
  bost,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  // const { theme } = useSelector(state => state);

  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <div
      className={`d-flex justify-content-between p-2 align-items-center ${border}`}
    >
      <div>{bost.community}</div>
    </div>
  );
};

export default UserCardBuggest;
