import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import MessageBtn from "../MessageBtn";
import Following from "./Following";
import Followers from "./Followers";
import ChangePassword from "./ChangePassword";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { logout } from "../../redux/actions/authAction";
import { useSelector } from "react-redux";

const Setting = ({ id, profile, dispatch, setShowSetting }) => {
  const { auth } = useSelector((state) => state);
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, , dispatch]);

  return (
    <div className="follow">
      {userData.map((user) => (
        <>
          <div className="follow_box">
            <div className="">
              <div className="setting-button">
                <button onClick={() => setOnEdit(true)}>Edit Profile</button>
              </div>
              <div className="setting-button">
                <button onClick={() => setChangePassword(true)}>
                  change password
                </button>
              </div>
              <div className="setting-button">
                <button>
                  <Link className="" to="/" onClick={() => dispatch(logout())}>
                    Logout
                  </Link>
                </button>
              </div>
            </div>

            <div className="close" onClick={() => setShowSetting(false)}>
              &times;
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
        </>
      ))}
    </div>
  );
};

export default Setting;
