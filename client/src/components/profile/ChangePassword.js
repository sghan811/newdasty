import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { changePassword } from "../../redux/actions/authAction";

import { checkImage } from "../../utils/imageUpload";

const ChangePassword = ({ setChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfNewPassword, setCnfNewPassword] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changePassword({ oldPassword, newPassword, cnfNewPassword, auth })
    );
  };

  return (
    <div className="edit_profile ">
      <form onSubmit={handleSubmit}>
        <div className="edit_close">
          <button onClick={() => setChangePassword(false)}>Close</button>
        </div>
        <div className="form_group">
          <label htmlFor="oldPassword">old password</label>

          <input
            type="text"
            className="form-control"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="form_group">
          <label htmlFor="newPassword">new password</label>

          <input
            type="text"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form_group">
          <label htmlFor="cnfNewPassword">confirm new password</label>

          <input
            type="text"
            className="form-control"
            id="cnfNewPassword"
            name="cnfNewPassword"
            value={cnfNewPassword}
            onChange={(e) => setCnfNewPassword(e.target.value)}
          />
        </div>
        <div className="submit_profile ">
          <button className="" type="submit">
            update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
