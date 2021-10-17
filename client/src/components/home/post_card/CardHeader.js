import React from "react";
import Avatar from "../../Avatar";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { BASE_URL } from "../../../utils/config";

import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost, reportPost } from "../../../redux/actions/postAction";

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePost({ post, auth, socket }));
      return history.push("/");
    }
  };

  const handleReportPost = () => {
    dispatch(reportPost({ post, auth }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header cardpad">
      <div className="d-flex">
        <div className="medium-avatar-cover">
          <Avatar src={post.user.avatar} size="medium-avatar" />
        </div>
        <div className="card_name d-flex">
          <div className="community-nexttext">
            <div className="author Gmedium">
              <Link className="text-dark" to={`/profile/${post.user._id}`}>
                {post.user.username}
              </Link>
            </div>
            <div className="createdAt">
              <a>{moment(post.createdAt).fromNow()}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-item dropdown">
        <span
          className="material-icons"
          id="moreLink"
          data-bs-toggle="dropdown"
        >
          more_horiz
        </span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              {/* <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons text-info"> create</span>Edit
                Post
              </div> */}
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons text-red"> delete</span>Delete
                Post
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons text-primary">content_copy</span>
            링크 복사하기
          </div>
          <div className="dropdown-item" onClick={handleReportPost}>
            <span className="material-icons text-yellow">report_problem</span>
            포스트 신고하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
