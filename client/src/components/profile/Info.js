import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import MessageBtn from "../MessageBtn";
import Following from "./Following";
import Followers from "./Followers";
import ChangePassword from "./ChangePassword";
import Setting from "./Setting";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { logout } from "../../redux/actions/authAction";
import { BiMenu } from "react-icons/bi";
import { IoApertureOutline } from "react-icons/io5";

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [showSetting, setShowSetting] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit || showSetting) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, showSetting, dispatch]);

  return (
    <div className="">
      {userData.map((user) => (
        <div>
          <div className="profile-pc">
            <div className="avatar-box">
              <Avatar src={user.avatar} size="profile-avatar" />
            </div>
            <div className="profile-pc-right">
              <div className="profile-username">
                <div className="leftalign">
                  <a>@{user.username}</a>
                </div>
                <div className="rightalign">
                  {user._id === auth.user._id ? (
                    <>
                      <span
                        className="aperture"
                        onClick={() => setShowSetting(true)}
                      >
                        <IoApertureOutline />
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="profile-top">
                <div className="profile-top-pc">
                  <div className="followers-num">
                    <span className="" onClick={() => setShowFollowers(true)}>
                      {user.followers.length}
                    </span>
                  </div>
                  <div className="followers-text">
                    <span onClick={() => setShowFollowers(true)}>
                      Followers
                    </span>
                  </div>
                </div>
                <div className="profile-top-pc">
                  <div className="followers-num">
                    <span className="" onClick={() => setShowFollowing(true)}>
                      {user.following.length}
                    </span>
                  </div>
                  <div className="followers-text">
                    <span onClick={() => setShowFollowing(true)}>
                      Following
                    </span>
                  </div>
                </div>
              </div>
              <div className="profile-name">
                <div className="">
                  <a>
                    {user.fullname} <span className="">{user.mobile}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div key={user._id} className="info_container">
            <div className="info_content">
              <div className="info_content_title">
                <p className="m-0">{user.address}</p>
                {/* <a>{user.email}</a> */}
                <a
                  style={{ textDecoration: "none" }}
                  href={user.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.website}
                </a>
                <div className="info_story">
                  <p>{user.story}</p>
                </div>

                <div className="buttons">
                  {user._id === auth.user._id ? (
                    // <button onClick={() => setOnEdit(true)}>
                    //   Edit Profile
                    // </button>
                    <></>
                  ) : (
                    <FollowBtn user={user} />
                  )}
                  {user._id === auth.user._id ? (
                    // <button onClick={() => setChangePassword(true)}>
                    //   change password
                    // </button>
                    <></>
                  ) : (
                    <MessageBtn user={user} />
                  )}
                  {user._id === auth.user._id ? (
                    // <button>
                    //   <Link
                    //     className="dropdown-item"
                    //     to="/"
                    //     onClick={() => dispatch(logout())}
                    //   >
                    //     Logout
                    //   </Link>
                    // </button>
                    <></>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            {onEdit && <EditProfile setOnEdit={setOnEdit} />}
            {changePassword && (
              <ChangePassword setChangePassword={setChangePassword} />
            )}
            {showFollowers && (
              <Followers
                users={user.followers}
                setShowFollowers={setShowFollowers}
              />
            )}
            {showFollowing && (
              <Following
                users={user.following}
                setShowFollowing={setShowFollowing}
              />
            )}
            {showSetting && (
              <Setting
                auth={auth}
                profile={profile}
                dispatch={dispatch}
                id={id}
                setShowSetting={setShowSetting}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
