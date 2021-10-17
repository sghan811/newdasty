import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import LikeleftButton from "../../LikeleftButton";
import LikerightButton from "../../LikerightButton";
import { imageShow, videoShow } from "../../../utils/mediaShow";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  likeleftPost,
  likerightPost,
  savePost,
  unLikeleftPost,
  unLikerightPost,
  unSavePost,
  likeleftCom,
  likerightCom,
  unLikeleftCom,
  unLikerightCom,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import Carousel from "../../Carousel";

const CardBodyCom = ({ post }) => {
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

  useEffect(() => {
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
    await dispatch(likeleftCom({ post, auth, socket }));
    setLoadLikeleft(false);
  };

  const handleUnLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(unLikeleftCom({ post, auth, socket }));
    setLoadLikeleft(false);
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

  const handleLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(likerightCom({ post, auth, socket }));
    setLoadLikeright(false);
  };

  const handleUnLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(unLikerightCom({ post, auth, socket }));
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
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post._id, auth.user.saved]);

  const [readMore, setReadMore] = useState();
  const [readMores, setReadMores] = useState();
  return (
    <div className="card_body">
      <div className="cardpad">
        <div className="title centeralign">
          <a>{post.title}</a>
        </div>
        {/* {isLikeleft || isLikeright ? (
          <div>
            <div className="buttons-box">
              <div>
                {(post.likelefts.length /
                  (post.likelefts.length + post.likerights.length)) *
                  100}{" "}
                %
              </div>
              <div>
                {(post.likerights.length /
                  (post.likelefts.length + post.likerights.length)) *
                  100}{" "}
                %
              </div>
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
              <div className="file_imgs img left">
                <a>{post.content}</a>
                <div className={`contentbox Lefted ${post.trend2}`}>
                  <button className="widthfull" onClick={handleUnLikeleft}>
                    <div className="containerBox">
                      <div className="text-box Gbold underlinetext resultpercent">
                        <a>
                          {Math.round(
                            (post.likelefts.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                          %
                        </a>
                      </div>
                      <img className=" L blur" src={post.images[0].url} />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="content-textedL left">
                <button
                  className={`widthfull choice ${post.trend2}`}
                  onClick={handleUnLikeleft}
                >
                  <a>{post.content}</a>
                  <div className="Gbold resultpercento underlinetext">
                    <a>
                      {Math.round(
                        (post.likelefts.length /
                          (post.likelefts.length + post.likerights.length)) *
                          100
                      )}{" "}
                      %
                    </a>
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
                    <div className={`contentbox Lefted ${post.trend2}`}>
                      {/* <button className="widthfull" onClick={handler}> */}
                      <button className="widthfull">
                        <div className="containerBox">
                          <div className="text-box resultpercent">
                            <a>
                              {Math.round(
                                (post.likelefts.length /
                                  (post.likelefts.length +
                                    post.likerights.length)) *
                                  100
                              )}{" "}
                              %
                            </a>
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
                        <a>
                          {Math.round(
                            (post.likelefts.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                          %
                        </a>
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
                    <div className={`contentbox Lefted ${post.trend2}`}>
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
        {isLikeright ? (
          <>
            {post.images2[0] ? (
              <div className="file_imgs img right">
                <a>{post.contentsub}</a>
                <div className={`contentbox Righted ${post.trend3}`}>
                  <button className="widthfull" onClick={handleUnLikeright}>
                    <div className="containerBox">
                      <div className="text-box Gbold underlinetext resultpercent">
                        <a>
                          {Math.round(
                            (post.likerights.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                          %
                        </a>
                      </div>
                      <img className=" R blur" src={post.images2[0].url} />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="content-textedR right">
                <button
                  className={`widthfull ${post.trend3}`}
                  onClick={handleUnLikeright}
                >
                  <a>{post.contentsub}</a>
                  <div className="Gbold resultpercento underlinetext">
                    <a>
                      {Math.round(
                        (post.likerights.length /
                          (post.likelefts.length + post.likerights.length)) *
                          100
                      )}{" "}
                      %
                    </a>
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
                    <div className={`contentbox Righted ${post.trend3}`}>
                      {/* <button className="widthfull" onClick={handlerr}> */}
                      <button className="widthfull">
                        <div className="containerBox">
                          <div className="text-box resultpercent">
                            <a>
                              {Math.round(
                                (post.likerights.length /
                                  (post.likelefts.length +
                                    post.likerights.length)) *
                                  100
                              )}{" "}
                              %
                            </a>
                          </div>
                          <img className=" R blur" src={post.images2[0].url} />
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="content-textedR right">
                    {/* <button className="widthfull" onClick={handlerr}> */}
                    <button className={`widthfull ${post.trend3}`}>
                      <a>{post.contentsub}</a>
                      <div>
                        <a>
                          {Math.round(
                            (post.likerights.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                          %
                        </a>
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
                    <div className={`contentbox Righted ${post.trend3}`}>
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

export default CardBodyCom;

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
