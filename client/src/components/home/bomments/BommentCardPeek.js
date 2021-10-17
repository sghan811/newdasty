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
    <div className="bomment_card " style={styleCard}>
      <div className="bomment_content_peek">
        <Link to={`/profile/${bomment.user._id}`} className="d-flex">
          <Avatar src={bomment.user.avatar} size="small-avatar" />
          &nbsp;
          <a className="default font-bold">{bomment.user.username}</a>
        </Link>
        &nbsp;
        <div
          className="flex-fill"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
          }}
        >
          {onEdit ? (
            <textarea
              rows="1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {bomment.tag && bomment.tag._id !== bomment.user._id && (
                <Link className="default" to={`/profile/${bomment.tag._id}`}>
                  @{bomment.tag.username}
                </Link>
              )}
              <Link className="default" to={`/bost/${bost._id}`}>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "..."}
              </Link>
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
        </div>
        <div
          className="d-flex align-items-center "
          style={{ cursor: "pointer" }}
        >
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
