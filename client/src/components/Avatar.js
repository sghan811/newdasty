import React from "react";
import { useSelector } from "react-redux";
import { IoPersonCircleOutline } from "react-icons/io5";

const Avatar = ({ src, size }) => {
  const { theme } = useSelector((state) => state);
  return (
    <>
      {src ==
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" ? (
        <>
          <IoPersonCircleOutline size="medium-avatar" className={size} />
        </>
      ) : (
        <>
          <img
            size="medium-avatar"
            src={src}
            alt="Avatar"
            className={size}
            style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
          />
        </>
      )}
    </>
  );
};

export default Avatar;
