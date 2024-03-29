import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import LikeleftButton from "../../LikeleftButton";
import LikerightButton from "../../LikerightButton";
import { imageShow, videoShow } from "../../../utils/mediaShow";
import CommentDisplayPeek from "../comments/CommentDisplayPeek2";
import CommentDisplayPeek2 from "../comments/CommentDisplayPeek3";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  likeleftPost,
  likerightPost,
  savePost,
  unLikeleftPost,
  unLikerightPost,
  unSavePost,
  likeleftAll,
  likerightAll,
  unLikeleftAll,
  unLikerightAll,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import Carousel from "../../Carousel";
import { postDataAPI } from "../../../utils/fetchData";

const CardBody = ({ post, comment}) => {
  function DoDisplay() {
    var con = document.getElementById("myDIV");
    if ((con.style.display = "none")) {
    } else {
      con.style.display = "none";
    }
  }
  // How long you want the animation to take, in ms
  const animationDuration = 2000;
  // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
  const frameDuration = 1000 / 60;
  // Use that to calculate how many frames we need to complete the animation
  const totalFrames = Math.round(animationDuration / frameDuration);
  // An ease-out function that slows the count as it progresses
  const easeOutQuad = (t) => t * (2 - t);

  // The animation function, which takes an Element
  const animateCountUp = (el) => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);
    // Start the animation running 60 times per second
    const counter = setInterval(() => {
      frame++;
      const a = document.querySelectorAll('.countup');
      for ( var i = 0; i < a.length; i++ ) {
        a[i].style.display = 'inline';
      }
      const b = document.querySelectorAll('.par');
      for ( var i = 0; i < b.length; i++ ) {
        b[i].style.display = 'inline';
      }
      // Calculate our progress as a value between 0 and 1
      // Pass that value to our easing function to get our
      // progress on a curve
      const progress = easeOutQuad(frame / totalFrames);
      // Use the progress value to calculate the current count
      const currentCount = Math.round(countTo * progress);

      // If the current count has changed, update the element
      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      // If we’ve reached our last frame, stop the animation
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);
  const [replyComments, setReplyComments] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isLikeleft, setIsLikeleft] = useState(false);
  const [isLikeright, setIsLikeright] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [loadLikeleft, setLoadLikeleft] = useState(false);
  const [loadLikeright, setLoadLikeright] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme, socket } = useSelector((state) => state);
  const a1 = `contentbox Lefted ${post.trend2}`;
  const a2 = `contentbox Righted ${post.trend3}`;
  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    if(post.likerights.find((likeright) => likeright._id === comment.user._id) != null){
        
    }else{
      setComments(newCm);
      setShowComments(newCm.slice(newCm.length - next));
    }
    const a = document.querySelectorAll('.countup');
    for ( var i = 0; i < a.length; i++ ) {
      a[i].style.display = 'inline';
    }
    const b = document.querySelectorAll('.par');
    for ( var i = 0; i < b.length; i++ ) {
      b[i].style.display = 'inline';
    }
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
    if (post.likelefts.find((likeleft) => likeleft._id === auth.user._id)) {
      setIsLikeleft(true);
    } else {
      setIsLikeleft(false);
    }
    if (post.likerights.find((likeright) => likeright._id === auth.user._id)) {
      setIsLikeright(true);
    } else {
      setIsLikeright(false);
    }
  }, [post.likes, post.likelefts, post.likerights, auth.user._id]);

  const handleLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(likeleftAll({ post, auth, socket }));
    const x = document.getElementById(post.trend2);
    const countupEls = x.querySelectorAll('.countup');
    // var con = document.getElementById("myDIV");
    // con.style.display = "block";
    countupEls.forEach(animateCountUp);

    setLoadLikeleft(false);
  };
  const randomrgb = () => {
    document.getElementById(post.trend2).style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  }
  const randomrgb2 = () => {
    document.getElementById(post.trend3).style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  const handleLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(likerightAll({ post, auth, socket }));
    const x = document.getElementById(post.trend3);
    const countupEls = x.querySelectorAll('.countup');
    countupEls.forEach(animateCountUp);

    setLoadLikeright(false);
  };

  const handleUnLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(unLikeleftAll({ post, auth, socket }));
    setLoadLikeleft(false);
    // var con = document.getElementById("myDIV");
    // con.style.display = "none";
  };
  const handler = async () => {
    if (loadLikeleft) return;
    if (loadLikeright) return;
    setLoadLikeleft(true);
    setLoadLikeright(true);
    await dispatch(unLikerightPost({ post, auth, socket }));
    await dispatch(likeleftPost({ post, auth, socket }));
    setLoadLikeleft(false);
    setLoadLikeright(false);
  };
  // const handlerrr = async () => {
  //   if (loadLikeright) return;
  //   setLoadLikeright(true);
  //   await dispatch(unLikerightPostLikeleftPost({ post, auth, socket }));
  //   setLoadLikeright(false);
  // };

  const handlerr = async () => {
    if (loadLikeleft) return;
    if (loadLikeright) return;
    setLoadLikeleft(true);
    setLoadLikeright(true);
    await dispatch(unLikeleftPost({ post, auth, socket }));
    await dispatch(likerightPost({ post, auth, socket }));

    setLoadLikeleft(false);
    setLoadLikeright(false);
  };

  // const handle = async () => {
  //   if (loadLikeright) return;
  //   setLoadLikeright(true);
  //   await dispatch(unLikerightPost({ post, auth, socket }));
  //   setLoadLikeright(false);

  //   if (loadLikeleft) return;
  //   setLoadLikeleft(true);
  //   await dispatch(likeleftPost({ post, auth, socket }));
  //   setLoadLikeleft(false);
  // };

  const handleUnLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(unLikerightAll({ post, auth, socket }));
    setLoadLikeright(false);
  };

  const handleSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    document.getElementById(post.trend2).addEventListener("open",randomrgb());
    document.getElementById(post.trend3).addEventListener("open",randomrgb2());
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post._id, auth.user.saved]);

  const [readMore, setReadMore] = useState();
  const [readMores, setReadMores] = useState();

  // Run the animation on all elements with a class of ‘countup’
  const runAnimations = () => {
    const countupEls = document.querySelectorAll(".countup");
    countupEls.forEach(animateCountUp);
  };
  return (
    <div className="card_body" id={post._id}>
      <div className="cardpad">
        <div className="title centeralign ">
          <a>{post.title}</a>
        </div>
        {/* {isLikeleft || isLikeright ? (
          <div>
            <div className="buttons-box">
              <div>
                {(post.likelefts.length /
                  (post.likelefts.length + post.likerights.length)) *
                  100}{" "}
                
              </div>
              <a>%</a>
              <div>
                {(post.likerights.length /
                  (post.likelefts.length + post.likerights.length)) *
                  100}{" "}
                
              </div>
              <a>%</a>
              <div>{post.likelefts.length} votes</div>
              <div>{post.likerights.length} votes</div>
            </div>
          </div>
        ) : (
          <></>
        )} */}
      </div>

      <div className="buttons-box">
        {isLikeleft ? (
          <>
            {post.images[0] ? (
              <div className="file_imgs img left clicked">
                <a>{post.content}</a>
                {/* <div id="myDIV">
                  ㅎㅎ<span class="countup">48</span>
                </div> */}
                <div id={post.trend2} className={a1}>
                  <button className="widthfull" onClick={handleUnLikeleft}>
                    <div className="containerBox">
                      <div className="text-box Gbold resultpercent">
                        <a className="countup">
                          {Math.round(
                            (post.likelefts.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                        </a>
                        <a className="par">%</a>
                      </div>
                      <img className=" L blur" src={post.images[0].url} />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="content-textedL left clicked">
                <button
                  className={`widthfull choice ${post.trend2}`}
                  onClick={handleUnLikeleft}
                  id={post.trend2}
                >
                  <a>{post.content}</a>

                  <div className="Gbold resultpercento">
                    <a className="countup">
                      {Math.round(
                        (post.likelefts.length /
                          (post.likelefts.length + post.likerights.length)) *
                          100
                      )}{" "}
                    </a>
                    <a className="par">%</a>
                  </div>
                  <div className="Gmedium">
                    <a>{post.likelefts.length}</a>
                  </div>
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {isLikeright ? (
              <>
                {post.images[0] ? (
                  <div className="file_imgs img left">
                    <a>{post.content}</a>

                    <div id={post.trend2} className={a1}>
                      {/* <button className="widthfull" onClick={handler}> */}
                      <button className="widthfull">
                        <div className="containerBox">
                          <div className="text-box resultpercento">
                            <a className="countup">
                              {Math.round(
                                (post.likelefts.length /
                                  (post.likelefts.length +
                                    post.likerights.length)) *
                                  100
                              )}{" "}
                            </a>
                            <a className="par">%</a>
                          </div>
                          <img className=" L blur" src={post.images[0].url} />
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="content-textedL left">
                    {/* <button onClick={handler}> */}
                    <button className={`widthfull choice ${post.trend2}`}>
                      <a>{post.content}</a>
                      <div>
                        <a className="countup">
                          {Math.round(
                            (post.likelefts.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                        </a>
                        <a className="par">%</a>
                      </div>
                      <div>
                        <a>{post.likelefts.length}</a>
                      </div>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {post.images[0] ? (
                  <div className="file_imgs img left">
                    <a>{post.content}</a>

                    <div className={`contentbox Lefted ${post.trend2}`} id={post.trend2}>
                      <button className="widthfull" onClick={handleLikeleft}>
                        <div className="containerBox">
                          <div className="text-box"></div>
                          <img className=" L" src={post.images[0].url} />
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="content-textedL left">
                    <button
                      id={post.trend2}
                      className={`widthfull ${post.trend2}`}
                      onClick={handleLikeleft}
                    >
                      <a>{post.content}</a>
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
        <div>
          {showComments.map((comment, index) => (
            <CommentDisplayPeek
              key={index}
              comment={comment}
              post={post}
              replyCm={replyComments.filter((item) => item.reply === comment._id)}
            />
          ))}
          {showComments.map((comment, index) => (
            <CommentDisplayPeek2
              key={index}
              comment={comment}
              post={post}
              replyCm={replyComments.filter((item) => item.reply === comment._id)}
            />
          ))}
        </div>
        {isLikeright ? (
          <>
            {post.images2[0] ? (
              <div className="file_imgs img right clicked">
                <a>{post.contentsub}</a>

                <div id={post.trend3} className={a2}>
                  <button className="widthfull" onClick={handleUnLikeright}>
                    <div className="containerBox">
                      <div className="text-box Gbold resultpercent">
                        <a className="countup">
                          {Math.round(
                            (post.likerights.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                        </a>
                        <a className="par">%</a>
                      </div>
                      <img className=" R blur" src={post.images2[0].url} />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="content-textedR right clicked">
                <button
                  id={post.trend3}
                  className={`widthfull ${post.trend3}`}
                  onClick={handleUnLikeright}
                >
                  <a>{post.contentsub}</a>

                  <div className="Gbold resultpercento">
                    <a className="countup">
                      {Math.round(
                        (post.likerights.length /
                          (post.likelefts.length + post.likerights.length)) *
                          100
                      )}{" "}
                    </a>
                    <a className="par">%</a>
                  </div>
                  <div className="Gmedium">
                    <a>{post.likerights.length}</a>
                  </div>
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {isLikeleft ? (
              <>
                {post.images2[0] ? (
                  <div className="file_imgs img right">
                    <a>{post.contentsub}</a>

                    <div id={post.trend3}className={a2}>
                      {/* <button className="widthfull" onClick={handlerr}> */}
                      <button className="widthfull">
                        <div className="containerBox">
                          <div className="text-box resultpercento">
                            <a className="countup">
                              {Math.round(
                                (post.likerights.length /
                                  (post.likelefts.length +
                                    post.likerights.length)) *
                                  100
                              )}{" "}
                            </a>
                            <a className="par">%</a>
                          </div>
                          <img className=" R blur" src={post.images2[0].url} />
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="content-textedR right">
                    {/* <button className="widthfull" onClick={handlerr}> */}
                    <button className={`widthfull ${post.trend3}`} id={post.trend3}>
                      <a>{post.contentsub}</a>

                      <div>
                        <a className="countup">
                          {Math.round(
                            (post.likerights.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                        </a>
                        <a className="par">%</a>
                      </div>
                      <div>
                        <a>{post.likerights.length}</a>
                      </div>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {post.images2[0] ? (
                  <div className="file_imgs img right">
                    <a>{post.contentsub}</a>

                    <div className={`contentbox Righted ${post.trend3}`} id={post.trend3}>
                      <button className="widthfull" onClick={handleLikeright}>
                        <div className="containerBox">
                          <div className="text-box"></div>
                          <img className=" R" src={post.images2[0].url} />
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="content-textedR right">
                    <button
                      className={`widthfull ${post.trend3}`}
                      id={post.trend3}
                      onClick={handleLikeright}
                    >
                      <a>{post.contentsub}</a>
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="cardpad rightalign bodybottom">
        <a>
          {post.likerights.length + post.likelefts.length == 0 ? (
            <a>아직 아무도 투표하지 않았군요 ㅠㅠ</a>
          ) : (
            <a>
              총 {post.likerights.length + post.likelefts.length}명이
              참가했습니다!
            </a>
          )}
        </a>
        <div>
          {post.trend1 ? (
            <Link
              className="lowercase"
              to={`/hashtag/${post.trend1}`}
              key={post.trend1}
            >
              #{post.trend1}
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardBody;

{
  /* {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )} */
}
{
  /* <div>
            {isLikeright ? (
        <button className="widthfull" onClick={handleUnLikeright}>
        <img src={img.url} className="" alt={img.url} />
        </button>
      ) : (
        <button onClick={handleLikeright} >
        <img src={img.url} className="" alt={img.url} />
        </button>
      )}
      
    </div> */
}

// isLikeright ? (
//   <>
//     <div>
//       {(post.likelefts.length /
//         (post.likelefts.length + post.likerights.length)) *
//         100}{" "}
//       votes
//     </div>
//     <div>
//       <button onClick={handle}>
//         <img src={img.url} className="" alt={img.url} />
//       </button>
//     </div>
//     <div>{post.likelefts.length} votes</div>
//     <div>
//       <span>
//         {post.content.length < 60
//           ? post.content
//           : readMore
//           ? post.content + " "
//           : post.content.slice(0, 60) + "  ..."}
//       </span>
//     </div>
//   </>
// ) :
