import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import LikeleftButton from "../../LikeleftButton";
import LikerightButton from "../../LikerightButton";
import { imageShow, videoShow } from "../../../utils/mediaShow";
import { useSelector, useDispatch } from "react-redux";
import {
  likeBost,
  likeleftBost,
  likerightBost,
  saveBost,
  unLikeBost,
  unLikeleftBost,
  unLikerightBost,
  unSaveBost,
} from "../../../redux/actions/bostAction";
import ShareModal from "../../ShareModal";
import Carousel from "../../Carousel";

const CardBody = ({ bost }) => {
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
    if (bost.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
    if (bost.likelefts.find((likeleft) => likeleft._id === auth.user._id)) {
      setIsLikeleft(true);
    } else {
      setIsLikeleft(false);
    }
    if (bost.likerights.find((likeright) => likeright._id === auth.user._id)) {
      setIsLikeright(true);
    } else {
      setIsLikeright(false);
    }
  }, [bost.likes, bost.likelefts, bost.likerights, auth.user._id]);
  const handleLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(likeleftBost({ bost, auth, socket }));
    setLoadLikeleft(false);
  };

  const handleUnLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(unLikeleftBost({ bost, auth, socket }));
    setLoadLikeleft(false);
  };

  // const handle = async () => {
  //   if (loadLikeright) return;
  //   setLoadLikeright(true);
  //   await dispatch(unLikerightBost({ bost, auth, socket }));
  //   setLoadLikeright(false);

  //   if (loadLikeleft) return;
  //   setLoadLikeleft(true);
  //   await dispatch(likeleftBost({ bost, auth, socket }));
  //   setLoadLikeleft(false);
  // };

  const handleLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(likerightBost({ bost, auth, socket }));
    setLoadLikeright(false);
  };

  const handleUnLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(unLikerightBost({ bost, auth, socket }));
    setLoadLikeright(false);
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
  const [readMore, setReadMore] = useState();
  const [readMores, setReadMores] = useState();
  return (
    <div className="card_body">
      <div
        className="card_body-content"
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
        }}
      ></div>
      <div className="cardpad">
        <div>
          Total votes of {bost.likerights.length + bost.likelefts.length}
        </div>
        <div>
          <Link
            className="default"
            to={`/community/${bost.community}`}
            key={bost.community}
          >
            # {bost.community}
          </Link>
        </div>
      </div>
      {isLikeleft || isLikeright ? (
        <div className="buttons-box">
          <div>
            {(bost.likelefts.length /
              (bost.likelefts.length + bost.likerights.length)) *
              100}{" "}
            %
          </div>
          <div>
            {(bost.likerights.length /
              (bost.likelefts.length + bost.likerights.length)) *
              100}{" "}
            %
          </div>
          <div>{bost.likelefts.length} votes</div>
          <div>{bost.likerights.length} votes</div>
        </div>
      ) : (
        <></>
      )}
      {bost.images.length == 0 && (
        <>
          <div className="buttons-box">
            <div>
              {isLikeleft ? (
                <div className="content-texted">
                  <button onClick={handleUnLikeleft}>
                    <a>{bost.content}</a>
                  </button>
                </div>
              ) : (
                <>
                  <div className="content-texted">
                    <button onClick={handleLikeleft}>
                      <a>{bost.content}</a>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div>
              {isLikeright ? (
                <div className="content-texted">
                  <button onClick={handleUnLikeright}>
                    <a>{bost.contentsub}</a>
                  </button>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="content-texted">
                    <button onClick={handleLikeright}>
                      <a>{bost.content}</a>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <div className="buttons-box">
        {bost.images.map((img, index) => (
          <div key={index} className="file_imgs">
            {index == 0 && (
              <>
                {isLikeleft ? (
                  <>
                    <div className="contentbox">
                      <button onClick={handleUnLikeleft}>
                        <img src={img.url} className="" alt={img.url} />
                      </button>
                    </div>
                    <div className="contentsub">
                      <span>
                        {bost.content.length < 20
                          ? bost.content
                          : readMores
                          ? bost.content + " "
                          : bost.content.slice(0, 20) + "  ..."}
                      </span>
                    </div>
                    {bost.contentsub.length > 20 && (
                      <span
                        className="readMore"
                        onClick={() => setReadMores(!readMores)}
                      >
                        {readMores ? "Hide Contents" : "Read More"}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="contentbox">
                      <button onClick={handleLikeleft}>
                        <img src={img.url} className="" alt={img.url} />
                      </button>
                    </div>
                    <div className="contentsub">
                      <span>
                        {bost.content.length < 20
                          ? bost.content
                          : readMores
                          ? bost.content + " "
                          : bost.content.slice(0, 20) + "  ..."}
                      </span>
                    </div>
                    {bost.contentsub.length > 20 && (
                      <span
                        className="readMore"
                        onClick={() => setReadMores(!readMores)}
                      >
                        {readMores ? "Hide Contents" : "Read More"}
                      </span>
                    )}
                  </>
                )}
              </>
            )}

            {index == 1 && (
              <>
                {isLikeright ? (
                  <>
                    <div className="contentbox right">
                      <button onClick={handleUnLikeright}>
                        <img src={img.url} className="" alt={img.url} />
                      </button>
                    </div>
                    <div className="contentsub">
                      <span>
                        {bost.contentsub.length < 20
                          ? bost.contentsub
                          : readMore
                          ? bost.contentsub + " "
                          : bost.contentsub.slice(0, 20) + "  ..."}
                      </span>
                    </div>
                    {bost.content.length > 20 && (
                      <span
                        className="readMore"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Hide Content" : "Read More"}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="contentbox right">
                      <button onClick={handleLikeright}>
                        <img src={img.url} className="" alt={img.url} />
                      </button>
                    </div>
                    <div className="contentsub">
                      <span>
                        {bost.contentsub.length < 20
                          ? bost.contentsub
                          : readMore
                          ? bost.contentsub + " "
                          : bost.contentsub.slice(0, 20) + "  ..."}
                      </span>
                    </div>
                    {bost.content.length > 20 && (
                      <span
                        className="readMore"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Hide Content" : "Read More"}
                      </span>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <a className="text-muted posted-date">
          {moment(bost.createdAt).fromNow()}
        </a>
      </div>
    </div>
  );
};

export default CardBody;

{
  /* {bost.images.length > 0 && (
        <Carousel images={bost.images} id={bost._id} />
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
//       {(bost.likelefts.length /
//         (bost.likelefts.length + bost.likerights.length)) *
//         100}{" "}
//       votes
//     </div>
//     <div>
//       <button onClick={handle}>
//         <img src={img.url} className="" alt={img.url} />
//       </button>
//     </div>
//     <div>{bost.likelefts.length} votes</div>
//     <div>
//       <span>
//         {bost.content.length < 60
//           ? bost.content
//           : readMore
//           ? bost.content + " "
//           : bost.content.slice(0, 60) + "  ..."}
//       </span>
//     </div>
//   </>
// ) :
