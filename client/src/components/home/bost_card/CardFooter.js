import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import {
  likeBost,
  saveBost,
  unLikeBost,
  unSaveBost,
} from "../../../redux/actions/bostAction";
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";
import { BiConversation, BiShareAlt, BiAnchor } from "react-icons/bi";

const CardFooter = ({ bost }) => {
  const [isLike, setIsLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme, socket } = useSelector((state) => state);

  useEffect(() => {
    if (bost.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [bost.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(likeBost({ bost, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(unLikeBost({ bost, auth, socket }));
    setLoadLike(false);
  };
  const handleSaveBost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(saveBost({ bost, auth }));
    setSaveLoad(false);
  };

  const handleUnSaveBost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSaveBost({ bost, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((id) => id === bost._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [bost._id, auth.user.saved]);

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div className="d-flex">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          &ensp;
          <Link to={`/bost/${bost._id}`} className="text-dark">
            <BiConversation className="icony" />
          </Link>
          &ensp;
          <BiShareAlt
            className="icony"
            alt="Send"
            onClick={() => setIsShare(!isShare)}
          />
        </div>
        {saved ? (
          <BiAnchor className="icony text-savy " onClick={handleUnSaveBost} />
        ) : (
          <BiAnchor className="icony" onClick={handleSaveBost} />
        )}
      </div>
      <div className="d-flex justify-content-start ">
        {bost.likes.length == 0 ? (
          <a className="comments-num default">첫번째 좋아요를 눌러보세요!</a>
        ) : bost.likes.length == 1 ? (
          <a className="comments-num default">
            {bost.likes.length}명이 좋아합니다
          </a>
        ) : (
          <a className="comments-num default">
            {bost.likes.length}명이 좋아합니다
          </a>
        )}
      </div>

      {isShare && (
        <ShareModal
          url={`${BASE_URL}/bost/${bost._id}`}
          theme={theme}
          setIsShare={setIsShare}
        />
      )}
    </div>
  );
};

export default CardFooter;
