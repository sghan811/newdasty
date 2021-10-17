import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBomment } from "../../../redux/actions/bommentAction";

const BommentMenu = ({ bost, bomment, setOnEdit }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (bost.user._id === auth.user._id || bomment.user._id === auth.user._id) {
      dispatch(deleteBomment({ bost, auth, bomment, socket }));
    }
  };

  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
          <span className="material-icons text-primary">create</span> Edit
        </div>
        <div className="dropdown-item" onClick={handleRemove}>
          <span className="material-icons text-red">delete_outline</span> Delete
        </div>
      </>
    );
  };
  return (
    <div className="menu">
      {(bost.user._id === auth.user._id ||
        bomment.user._id === auth.user._id) && (
        <div className="nav-item dropdown more">
          <span
            className="material-icons"
            id="moreLink"
            data-bs-toggle="dropdown"
          >
            more_vert
          </span>
          <div className="dropdown-menu" aria-labelledby="moreLink">
            {bost.user._id === auth.user._id ? (
              bomment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-item" onClick={handleRemove}>
                  <span className="material-icons">delete_outline</span> Delete
                </div>
              )
            ) : (
              bomment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BommentMenu;
