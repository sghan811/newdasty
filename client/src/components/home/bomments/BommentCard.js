import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import LikeButton from "../../LikeButton";
import BommentMenu from "./BommentMenu";
import {
  likeBomment,
  unLikeBomment,
  updateBomment,
} from "../../../redux/actions/bommentAction";
import InputBomment from "../InputBomment";

const BommentCard = ({ children, bomment, bost, bommentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(bomment.content);
    setIsLike(false);
    setOnReply(false);
    if (bomment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [bomment, auth.user._id]);

  const handleUpdate = () => {
    if (bomment.content !== content) {
      dispatch(updateBomment({ bomment, bost, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;

    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeBomment({ bomment, bost, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeBomment({ bomment, bost, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) {
      return setOnReply(false);
    }
    setOnReply({ ...bomment, bommentId });
  };

  const styleCard = {
    opacity: bomment._id ? 1 : 0.5,
    pointerEvents: bomment._id ? "inherit" : "none",
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${bomment.user._id}`} className="d-flex text-dark">
        <Avatar src={bomment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{bomment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div
          className="flex-fill"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: theme ? "white" : "#111",
          }}
        >
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {bomment.tag && bomment.tag._id !== bomment.user._id && (
                <Link
                  to={`/profile/${bomment.tag._id}`}
                  style={{ textDecoration: "none" }}
                  className="me-1"
                >
                  @{bomment.tag.username}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "..."}
              </span>
              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Hide " : "Read more"}
                </span>
              )}
            </div>
          )}

          <div style={{ cursor: "pointer" }}>
            <small className="text-muted" style={{ marginRight: "9px" }}>
              {moment(bomment.createdAt).fromNow()}
            </small>

            <small
              style={{ fontWeight: "bold", marginRight: "9px" }}
              className="mr3"
            >
              {bomment.likes.length} likes
            </small>
            {onEdit ? (
              <>
                <small
                  onClick={handleUpdate}
                  style={{ fontWeight: "bold", marginRight: "9px" }}
                  className="mr3"
                >
                  update
                </small>
                <small
                  onClick={() => setOnEdit(false)}
                  style={{ fontWeight: "bold", marginRight: "9px" }}
                  className="mr3"
                >
                  cancel
                </small>
              </>
            ) : (
              <small
                style={{ fontWeight: "bold", marginRight: "9px" }}
                className="mr3"
                onClick={handleReply}
              >
                {onReply ? "cancel" : "reply"}
              </small>
            )}
          </div>
        </div>

        <div
          className="d-flex align-items-center "
          style={{ cursor: "pointer" }}
        >
          <BommentMenu bost={bost} bomment={bomment} setOnEdit={setOnEdit} />

          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <InputBomment bost={bost} onReply={onReply} setOnReply={setOnReply}>
          <Link
            style={{ textDecoration: "none" }}
            className="mr-1"
            to={`/profile/${onReply.user._id}`}
          >
            @{onReply.user.username}
          </Link>
        </InputBomment>
      )}
      {children}
    </div>
  );
};

export default BommentCard;
