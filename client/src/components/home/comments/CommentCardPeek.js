import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";
import {
  likeComment,
  unLikeComment,
  updateComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    randomrgb();
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };
  const randomrgb = () => {
    if (loadLike) return;
    console.log(comment);
    console.log(post);
    const b = document.getElementById(post._id);
    const aaa = b.querySelectorAll(`[id='${comment.user._id}']`);
    var user_find;
    try{
      if(post.likelefts.find((likeleft) => likeleft._id === comment.user._id) != null){
        user_find = document.getElementById(post.trend2).style.backgroundColor;
      }
    }catch{
      if(post.likerights.find((likeright) => likeright._id === comment.user._id) != null){
        user_find = document.getElementById(post.trend3).style.backgroundColor;
      }
    }
     if(post.likerights.find((likeright) => likeright._id === comment.user._id) != null){
        user_find = document.getElementById(post.trend3).style.backgroundColor;
      }

    for ( var i = 0; i < aaa.length; i++ ) {
      aaa[i].style.backgroundColor = user_find;
    }
  }
  const handleLike = async () => {
    if (loadLike) return;

    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) {
      return setOnReply(false);
    }
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };
  
  return (
    <div className="comment_card " style={styleCard} id={comment.user._id}>
      <div className={`${comment.contenty} comment_content_peek`}>
        <Link to={`/profile/${comment.user._id}`} className=" d-flex">
          <Avatar src={comment.user.avatar} size="small-avatar" />
        </Link>

        <div
          className="flex-fill  "
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
            <>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link
                  className="default text-peek font-bold "
                  to={`/profile/${comment.tag._id}`}
                >
                  @{comment.tag.username}
                </Link>
              )}
              <a className="default text-peek font-bold ">
                {comment.user.username}
              </a>

              <Link className="default text-peek" to={`/post/${post._id}`}>
                {content.length < 20
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 20) + "..."}
              </Link>
              {content.length > 20 && (
                <span
                  className="readMore font-bold"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "-" : "+"}
                </span>
              )}
            </>
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
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link
            style={{ textDecoration: "none" }}
            className="mr-1"
            to={`/profile/${onReply.user._id}`}
          >
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;

// 1000){r=r.substring(0,r.length-1);}return r;}());} var ftDomain = (window==top)?\"\":(function(){var d=document.referrer,h=(d)?d.match(\"(?::q/q/)+([qw-]+(q.[qw-]+)+)(q/)?\".replace(/q/g,decodeURIComponent(\"%\"+\"5C\")))[1]:\"\";return (h&&h!=location.host)?\"&ft_ifb=1&ft_domain=\"+encodeURIComponent(h):\"\";}()); var ftV_5708278={pID:\"5708278\",width:\"300\",height:\"250\",params:{ftx:window.ftX,fty:window.ftY,ftadz:window.ftZ,ftscw:window.ftContent,ft_custom:window.ftCustom,ft_id:window.ftID||\"\",ft_idEnabled:window.ftIDEnabled||\"\",ftOBA:window.ftOBA,ft_domain:((ftDomain||\"\").match(RegExp(\"&ft_domain=([^&$]+)\",\"i\"))||[\"\",\"\"])[1],ft_ifb:((ftDomain||\"\").match(RegExp(\"&ft_ifb=([^&$]+)\",\"i\"))||[\"\",\"\"])[1],ft_agentEnv:window.mraid||window.ormma?\"1\":\"0\",ft_referrer:encodeURIComponent(window.ft_referrer),gdpr:\"\",gdpr_consent:\"\",us_privacy:\"${US_PRIVACY}\",cachebuster:window.ftRandom},winVars:{ftClick_5708278:window.ftClick_5708278,ftExpTrack_5708278:window.ftExpTrack_5708278,ft300x250_OOBclickTrack:window.ft300x250_OOBclickTrack},DTimeout:1E3,GTimeout:1E3}, ftPProc=function(d){var c=this;d=JSON.parse(JSON.stringify(d));var f=[],l=function(a,b){b=\"undefined\"===typeof b||isNaN(b)?1:parseInt(b,10);a=a||\"\";for(var e=0<=b?b:0;e--;)a=encodeURIComponent(a);return a},h=function(a){a=a.constructor==Array?a:[];for(var b=0;b-1&&(t=\"\");var e=function(){var t=[];if(\"undefined\"!=typeof bk_results&&void 0!==bk_results.campaigns&&0
