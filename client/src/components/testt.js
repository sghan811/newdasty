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
  unLikePost,
  unLikeleftPost,
  unLikerightPost,
  unSavePost,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import Carousel from "../../Carousel";

const CardBody = ({ post }) => {
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
    await dispatch(likeleftPost({ post, auth, socket }));
    setLoadLikeleft(false);
  };

  const handleUnLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(unLikeleftPost({ post, auth, socket }));
    setLoadLikeleft(false);
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
    await dispatch(likerightPost({ post, auth, socket }));
    setLoadLikeright(false);
  };

  const handleUnLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(unLikerightPost({ post, auth, socket }));
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
  const hashtage = post.community;
  const hashtagelow = hashtage.toLowerCase();
  console.log(post);
  return (
    <div className="card_body ">
      <div
        className="card_body-content"
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
        }}
      ></div>

      <div className="cardpad">
        <div className="title">
          <a>{post.title}</a>
        </div>
      </div>
      {isLikeleft || isLikeright ? (
        <div>
          <div className="cardpad">
            총 {post.likerights.length + post.likelefts.length}명이 참가했습니다!
          </div>
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
      )}
      {post.images.length == 0 && (
        <>
          <div className="buttons-box">
            <div>
              {isLikeleft ? (
                <div className="content-textedL">
                  <button onClick={handleUnLikeleft}>
                    <a>{post.content}</a>
                  </button>
                </div>
              ) : (
                <>
                  <div className="content-textedL">
                    <button onClick={handleLikeleft}>
                      <a>{post.content}</a>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div>
              {isLikeright ? (
                <div className="content-textedR">
                  <button onClick={handleUnLikeright}>
                    <a>{post.contentsub}</a>
                  </button>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="content-textedR">
                    <button onClick={handleLikeright}>
                      <a>{post.content}</a>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <div className="buttons-box">
        {isLikeleft ? (
          <>
            <div className="file_imgs img">
              <div className="contentbox left">
                <button onClick={handleUnLikeleft}>
                  {post.images[0] ? (
                    <>
                      <img
                        src={post.images[0].url}
                        alt={post.images[0].url}
                      ></img>
                    </>
                  ) : (
                    <></>
                  )}
                </button>
              </div>
              <div className="contentsub">
                <span>
                  {post.content.length < 20
                    ? post.content
                    : readMores
                    ? post.content + ""
                    : post.content.slice(0, 20) + " ..."}
                </span>
              </div>
              {post.contentsub.length > 20 && (
                <span
                  className="readMore"
                  onClick={() => setReadMores(!readMores)}
                >
                  {readMores ? "Hide Contents" : "Read More"}
                </span>
              )}
            </div>
            <div className="file_imgs img">
              <div className="contentbox right">
                <button onClick={(handleUnLikeleft, handleLikeright)}>
                  {post.images2[0] ? (
                    <>
                      <img
                        src={post.images2[0].url}
                        alt={post.images2[0].url}
                      ></img>
                    </>
                  ) : (
                    <></>
                  )}
                </button>
              </div>
              <div className="contentsub">
                <span>
                  {post.contentsub.length < 20
                    ? post.contentsub
                    : readMores
                    ? post.contentsub + ""
                    : post.contentsub.slice(0, 20) + " ..."}
                </span>
              </div>
              {post.contentsub.length > 20 && (
                <span
                  className="readMore"
                  onClick={() => setReadMores(!readMores)}
                >
                  {readMores ? "Hide Contents" : "Read More"}
                </span>
              )}
            </div>
          </>
        ) : isLikeright ? (
          <>
            <div className="file_imgs img">
              <div className="contentbox left">
                <button onClick={(handleLikeleft, handleUnLikeright)}>
                  {post.images[0] ? (
                    <>
                      <img
                        src={post.images[0].url}
                        alt={post.images[0].url}
                      ></img>
                    </>
                  ) : (
                    <></>
                  )}
                </button>
              </div>
              <div className="contentsub">
                <span>
                  {post.content.length < 20
                    ? post.content
                    : readMores
                    ? post.content + ""
                    : post.content.slice(0, 20) + " ..."}
                </span>
              </div>
              {post.contentsub.length > 20 && (
                <span
                  className="readMore"
                  onClick={() => setReadMores(!readMores)}
                >
                  {readMores ? "Hide Contents" : "Read More"}
                </span>
              )}
            </div>
            <div className="file_imgs img">
              <div className="contentbox right">
                <button onClick={handleUnLikeright}>
                  {post.images2[0] ? (
                    <>
                      <img
                        src={post.images2[0].url}
                        alt={post.images2[0].url}
                      ></img>
                    </>
                  ) : (
                    <></>
                  )}
                </button>
              </div>
              <div className="contentsub">
                <span>
                  {post.contentsub.length < 20
                    ? post.contentsub
                    : readMores
                    ? post.contentsub + ""
                    : post.contentsub.slice(0, 20) + " ..."}
                </span>
              </div>
              {post.contentsub.length > 20 && (
                <span
                  className="readMore"
                  onClick={() => setReadMores(!readMores)}
                >
                  {readMores ? "Hide Contents" : "Read More"}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="file_imgs img">
              <div className="contentbox left">
                {post.images ? (
                  <button onClick={handleLikeleft}>
                    <img
                    // src={post.images[0].url}
                    // alt={post.images[0].url}
                    ></img>
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="contentsub">
                <span>
                  {post.content.length < 20
                    ? post.content
                    : readMores
                    ? post.content + ""
                    : post.content.slice(0, 20) + " ..."}
                </span>
              </div>
              {post.contentsub.length > 20 && (
                <span
                  className="readMore"
                  onClick={() => setReadMores(!readMores)}
                >
                  {readMores ? "Hide Contents" : "Read More"}
                </span>
              )}
            </div>
            <div className="file_imgs img">
              <div className="contentbox right">
                <button onClick={handleLikeright}>
                  <img
                  // src={post.images2[0].url}
                  // alt={post.images2[0].url}
                  ></img>
                </button>
              </div>
              <div className="contentsub">
                <span>
                  {post.contentsub.length < 20
                    ? post.contentsub
                    : readMores
                    ? post.contentsub + ""
                    : post.contentsub.slice(0, 20) + " ..."}
                </span>
              </div>
              {post.contentsub.length > 20 && (
                <span
                  className="readMore"
                  onClick={() => setReadMores(!readMores)}
                >
                  {readMores ? "Hide Contents" : "Read More"}
                </span>
              )}
            </div>
          </>
        )}
      </div>
      <div className="cardpad right">
        <Link
          className=""
          to={`/community/${post.community}`}
          key={post.community}
        >
          #{hashtagelow}
        </Link>
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
        <button onClick={handleUnLikeright}>
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

//dddd
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
  unLikePost,
  unLikeleftPost,
  unLikerightPost,
  unSavePost,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import Carousel from "../../Carousel";
import { BiGame } from "react-icons/bi";

const CardBody = ({ post }) => {
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
    await dispatch(likeleftPost({ post, auth, socket }));
    setLoadLikeleft(false);
  };

  const handleUnLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(unLikeleftPost({ post, auth, socket }));
    setLoadLikeleft(false);
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
    await dispatch(likerightPost({ post, auth, socket }));
    setLoadLikeright(false);
  };

  const handleUnLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(unLikerightPost({ post, auth, socket }));
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
  const hashtage = post.community;
  const hashtagelow = hashtage.toLowerCase();
  console.log(post);
  return (
    <div className="card_body ">
      <div className="cardpad">
        <div className="title">
          <a>{post.title}</a>
        </div>
        {isLikeleft || isLikeright ? (
          <div>
            <div className="cardpad">
              총 {post.likerights.length + post.likelefts.length}명이 참가했습니다!
            </div>
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
        )}
      </div>
      <div className="buttons-box">
        {post.images[0] ? (
          <div className="file_imgs img">
            <div className="contentsub">
              <span>
                {post.content.length < 20
                  ? post.content
                  : readMores
                  ? post.content + ""
                  : post.content.slice(0, 20) + " ..."}
              </span>
            </div>
            <div className="contentbox left">
              <img src={post.images[0].url} alt={post.images[0].url}></img>
            </div>
          </div>
        ) : (
          <div className="content-textedL">
            {isLikeleft ? (
              <button onClick={handleUnLikeleft}>
                <span>
                  {post.content.length < 20
                    ? post.content
                    : readMores
                    ? post.content + ""
                    : post.content.slice(0, 20) + " ..."}
                </span>
              </button>
            ) : (
              <>
                <button onClick={handleLikeleft}>
                  <span>
                    {post.content.length < 20
                      ? post.content
                      : readMores
                      ? post.content + ""
                      : post.content.slice(0, 20) + " ..."}
                  </span>
                </button>
              </>
            )}
          </div>
        )}
        {post.images2[0] ? (
          <div className="file_imgs img">
            <div className="contentsub">
              <span>
                {post.contentsub.length < 20
                  ? post.contentsub
                  : readMores
                  ? post.contentsub + ""
                  : post.contentsub.slice(0, 20) + " ..."}
              </span>
            </div>
            <div className="contentbox right">
              <img src={post.images2[0].url} alt={post.images2[0].url}></img>
            </div>
          </div>
        ) : (
          <div className="content-textedR">
            {isLikeright ? (
              <button onClick={handleUnLikeright}>
                <span>
                  {post.contentsub.length < 20
                    ? post.contentsub
                    : readMores
                    ? post.contentsub + ""
                    : post.contentsub.slice(0, 20) + " ..."}
                </span>
              </button>
            ) : (
              <>
                <button onClick={handleLikeright}>
                  <span>
                    {post.contentsub.length < 20
                      ? post.contentsub
                      : readMores
                      ? post.contentsub + ""
                      : post.contentsub.slice(0, 20) + " ..."}
                  </span>
                </button>
              </>
            )}
          </div>
        )}
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
        <button onClick={handleUnLikeright}>
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



Random BiGameimport React, { useState, useEffect } from "react";
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
  unLikePost,
  unLikeleftPost,
  unLikerightPost,
  unLikerightPostLikeleftPost,
  unSavePost,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import Carousel from "../../Carousel";

const CardBody = ({ post }) => {
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
    await dispatch(likeleftPost({ post, auth, socket }));
    setLoadLikeleft(false);
  };

  const handleUnLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(unLikeleftPost({ post, auth, socket }));
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
    await dispatch(likerightPost({ post, auth, socket }));
    setLoadLikeright(false);
  };

  const handleUnLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(unLikerightPost({ post, auth, socket }));
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

  function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
  }
  function random_item2(items2) {
    return items2[Math.floor(Math.random() * items2.length)];
  }

  var items = [
    "fec8d8",
    "ffdfd3",
    "cdf1af",
    "fdf1ed",
    "fde2e6",
    "dcf2de",
    "bde8e7",
  ];
  var items2 = [
    "fec8d8",
    "ffdfd3",
    "cdf1af",
    "fdf1ed",
    "fde2e6",
    "dcf2de",
    "bde8e7",
  ];
  var random = random_item(items);
  var random2 = random_item2(items2);

  console.log(random);
  const [readMore, setReadMore] = useState();
  const [readMores, setReadMores] = useState();
  const hashtage = post.community;
  const hashtagelow = hashtage.toLowerCase();
const date = moment(post.createdAt).fromNow().replace('minutes', '분')
  return (
    <div className="card_body">
      <div className="cardpad">
        <a className="text-muted posted-date">
          {moment(post.createdAt).fromNow()}
          <a>{random}</a>
        </a>
      </div>
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
                <div className={`contentbox Lefted ${random}`}>
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
                <button onClick={handleUnLikeleft}>
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
                    <div className={`contentbox Lefted ${random}`}>
                      <button className="widthfull" onClick={handler}>
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
                    <button onClick={handler}>
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
                    <div className={`contentbox Lefted ${random}`}>
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
                    <button className="widthfull" onClick={handleLikeleft}>
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
                <div className={`contentbox Righted ${random}`}>
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
                <button className="widthfull" onClick={handleUnLikeright}>
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
                    <div className={`contentbox Righted ${random}`}>
                      <button className="widthfull" onClick={handlerr}>
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
                    <button className="widthfull" onClick={handlerr}>
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
                    <div className={`contentbox Righted ${random}`}>
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
                    <button className="widthfull" onClick={handleLikeright}>
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
        <a>총 {post.likerights.length + post.likelefts.length}명이 참가했습니다!</a>
        <div>
          {post.community ? (
            <Link
              className=""
              to={`/community/${post.community}`}
              key={post.community}
            >
              #{hashtagelow}
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




// Info.js design
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Avatar from "../Avatar";
// import EditProfile from "./EditProfile";
// import FollowBtn from "../FollowBtn";
// import MessageBtn from "../MessageBtn";
// import Following from "./Following";
// import Followers from "./Followers";
// import ChangePassword from "./ChangePassword";
// import Setting from "./Setting";
// import { GLOBALTYPES } from "../../redux/actions/globalTypes";
// import { logout } from "../../redux/actions/authAction";

// const Info = ({ id, auth, profile, dispatch }) => {
//   const [userData, setUserData] = useState([]);
//   const [onEdit, setOnEdit] = useState(false);
//   const [changePassword, setChangePassword] = useState(false);

//   const [showFollowers, setShowFollowers] = useState(false);
//   const [showFollowing, setShowFollowing] = useState(false);

//   const [showSetting, setShowSetting] = useState(false);

//   useEffect(() => {
//     if (id === auth.user._id) {
//       setUserData([auth.user]);
//     } else {
//       const newData = profile.users.filter((user) => user._id === id);
//       setUserData(newData);
//     }
//   }, [id, auth, dispatch, profile.users]);

//   useEffect(() => {
//     if (showFollowers || showFollowing || onEdit || showSetting) {
//       dispatch({ type: GLOBALTYPES.MODAL, payload: true });
//     } else {
//       dispatch({ type: GLOBALTYPES.MODAL, payload: false });
//     }
//   }, [showFollowers, showFollowing, onEdit, showSetting, dispatch]);

//   return (
//     <div className="info">
//       {userData.map((user) => (
//         <div>
//           <div>
//             <div className="profile_username"></div>
//             <div className="profile_head">
//               <div className="profile_img">
//                 <Avatar src={user.avatar} size="profile-avatar" />
//               </div>
//               <div className="profile_img_foot">
//                 <div className="profile_img_foot_followers">
//                   <span
//                     className="mr-4 followers_button"
//                     onClick={() => setShowFollowers(true)}
//                   >
//                     {user.followers.length} Followers
//                   </span>
//                 </div>
//                 <div className="profile_img_foot_following">
//                   <div className="">
//                     <span className="" onClick={() => setShowFollowing(true)}>
//                       {user.following.length} Following
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div key={user._id} className="info_container">
//             <div className="pad"></div>
//             <div className="info_content">
//               <div className="info_content_title">
//                 <div className="onetoone">
//                   <div className="leftalign">
//                     <a>
//                       {user.fullname} <span className="">{user.mobile}</span>
//                     </a>
//                   </div>
//                   <div className="rightalign">
//                     {user._id === auth.user._id ? (
//                       <>
//                         <span className="" onClick={() => setShowSetting(true)}>
//                           Setting
//                         </span>
//                       </>
//                     ) : (
//                       <></>
//                     )}
//                   </div>
//                 </div>
//                 <p className="m-0">{user.address}</p>
//                 <a>{user.email}</a>
//                 <a
//                   style={{ textDecoration: "none" }}
//                   href={user.website}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   {user.website}
//                 </a>
//                 <p>{user.story}</p>

//                 <div className="buttons">
//                   {user._id === auth.user._id ? (
//                     // <button onClick={() => setOnEdit(true)}>
//                     //   Edit Profile
//                     // </button>
//                     <></>
//                   ) : (
//                     <FollowBtn user={user} />
//                   )}
//                   {user._id === auth.user._id ? (
//                     // <button onClick={() => setChangePassword(true)}>
//                     //   change password
//                     // </button>
//                     <></>
//                   ) : (
//                     <MessageBtn user={user} />
//                   )}
//                   {user._id === auth.user._id ? (
//                     // <button>
//                     //   <Link
//                     //     className="dropdown-item"
//                     //     to="/"
//                     //     onClick={() => dispatch(logout())}
//                     //   >
//                     //     Logout
//                     //   </Link>
//                     // </button>
//                     <></>
//                   ) : (
//                     <></>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {onEdit && <EditProfile setOnEdit={setOnEdit} />}
//             {changePassword && (
//               <ChangePassword setChangePassword={setChangePassword} />
//             )}
//             {showFollowers && (
//               <Followers
//                 users={user.followers}
//                 setShowFollowers={setShowFollowers}
//               />
//             )}
//             {showFollowing && (
//               <Following
//                 users={user.following}
//                 setShowFollowing={setShowFollowing}
//               />
//             )}
//             {showSetting && (
//               <Setting
//                 auth={auth}
//                 profile={profile}
//                 dispatch={dispatch}
//                 id={id}
//                 setShowSetting={setShowSetting}
//               />
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Info;


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import MessageBtn from "../MessageBtn";
import Following from "./Following";
import Followers from "./Followers";
import ChangePassword from "./ChangePassword";
import Setting from "./Setting";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { logout } from "../../redux/actions/authAction";

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [showSetting, setShowSetting] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit || showSetting) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, showSetting, dispatch]);

  return (
    <div className="">
      {userData.map((user) => (
        <div>
          <div>
            <div className="profile_username"></div>
            <div className="profile_head">
              <div className="profile_img">
                <Avatar src={user.avatar} size="profile-avatar" />
              </div>
              <div className="profile_img_foot">
                <div className="profile_img_foot_followers">
                  <span
                    className="mr-4 followers_button"
                    onClick={() => setShowFollowers(true)}
                  >
                    {user.followers.length} Followers
                  </span>
                </div>
                <div className="profile_img_foot_following">
                  <div className="">
                    <span className="" onClick={() => setShowFollowing(true)}>
                      {user.following.length} Following
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div key={user._id} className="info_container">
            <div className="pad"></div>
            <div className="info_content">
              <div className="info_content_title">
                <div className="onetoone">
                  <div className="leftalign">
                    <a>
                      {user.fullname} <span className="">{user.mobile}</span>
                    </a>
                  </div>
                  <div className="rightalign">
                    {user._id === auth.user._id ? (
                      <>
                        <span className="" onClick={() => setShowSetting(true)}>
                          Setting
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <p className="m-0">{user.address}</p>
                <a>{user.email}</a>
                <a
                  style={{ textDecoration: "none" }}
                  href={user.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.website}
                </a>
                <p>{user.story}</p>

                <div className="buttons">
                  {user._id === auth.user._id ? (
                    // <button onClick={() => setOnEdit(true)}>
                    //   Edit Profile
                    // </button>
                    <></>
                  ) : (
                    <FollowBtn user={user} />
                  )}
                  {user._id === auth.user._id ? (
                    // <button onClick={() => setChangePassword(true)}>
                    //   change password
                    // </button>
                    <></>
                  ) : (
                    <MessageBtn user={user} />
                  )}
                  {user._id === auth.user._id ? (
                    // <button>
                    //   <Link
                    //     className="dropdown-item"
                    //     to="/"
                    //     onClick={() => dispatch(logout())}
                    //   >
                    //     Logout
                    //   </Link>
                    // </button>
                    <></>
                  ) : (
                    <></>
                  )}
                </div>
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
            {showSetting && (
              <Setting
                auth={auth}
                profile={profile}
                dispatch={dispatch}
                id={id}
                setShowSetting={setShowSetting}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;



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
  likeleftAll,
  likerightAll,
  unLikeleftAll,
  unLikerightAll,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import Carousel from "../../Carousel";

const CardBody = ({ post }) => {
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

  var bDisplay = true;
  function DoDisplay() {
    var con = document.getElementById("myDIV");
    if ((con.style.display = "none")) {
    } else {
      con.style.display = "none";
    }
  }

  const handleLikeleft = async () => {
    var con = document.getElementById("myDIV");
    con.style.display = "block";
    const countupEls = document.querySelectorAll(".countup");
    countupEls.forEach(animateCountUp);
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(likeleftAll({ post, auth, socket }));
    setLoadLikeleft(false);
  };

  const handleLikeright = async () => {
    const countupEls = document.querySelectorAll(".countup");
    countupEls.forEach(animateCountUp);
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(likerightAll({ post, auth, socket }));
    setLoadLikeright(false);
  };

  const handleUnLikeleft = async () => {
    var con = document.getElementById("myDIV");
    con.style.display = "none";
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(unLikeleftAll({ post, auth, socket }));
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
    <div className="card_body">
      <div className="cardpad">
        <div className="title centeralign">
          <a>{post.title}</a>
          <a href="javascript:doDisplay();">내용보기</a>
          <button onClick={DoDisplay}>보기</button>
          <div id="myDIV">
            ㅎㅎ<span class="countup">48</span>
          </div>
          <span class="countup">48</span>
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
              <div className="file_imgs img left">
                <a>{post.content}</a>

                <div className={`contentbox Lefted ${post.trend2}`}>
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
                        <a>%</a>
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

                  <div className="Gbold resultpercento">
                    <a className="countup">
                      {Math.round(
                        (post.likelefts.length /
                          (post.likelefts.length + post.likerights.length)) *
                          100
                      )}{" "}
                    </a>
                    <a>%</a>
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
                          <div className="text-box resultpercento">
                            <a className="countup">
                              {Math.round(
                                (post.likelefts.length /
                                  (post.likelefts.length +
                                    post.likerights.length)) *
                                  100
                              )}{" "}
                            </a>
                            <a>%</a>
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
                        <a>%</a>
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
                      <div className="text-box Gbold resultpercent">
                        <a className="countup">
                          {Math.round(
                            (post.likerights.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                        </a>
                        <a>%</a>
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

                  <div className="Gbold resultpercento">
                    <a className="countup">
                      {Math.round(
                        (post.likerights.length /
                          (post.likelefts.length + post.likerights.length)) *
                          100
                      )}{" "}
                    </a>
                    <a>%</a>
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
                          <div className="text-box resultpercento">
                            <a className="countup">
                              {Math.round(
                                (post.likerights.length /
                                  (post.likelefts.length +
                                    post.likerights.length)) *
                                  100
                              )}{" "}
                            </a>
                            <a>%</a>
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
                        <a className="countup">
                          {Math.round(
                            (post.likerights.length /
                              (post.likelefts.length +
                                post.likerights.length)) *
                              100
                          )}{" "}
                        </a>
                        <a>%</a>
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
