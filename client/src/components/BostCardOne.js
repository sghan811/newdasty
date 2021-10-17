import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardBody from "./home/bost_card/CardBody";
import { Link } from "react-router-dom";
import CardFooter from "./home/bost_card/CardFooter";

import CardHeader from "./home/bost_card/CardHeader";
import Bomments from "./home/Bomments";
import InputBomment from "./home/InputBomment";
import { getDataAPI } from "../utils/fetchData";
import { PROFILE_TYPES } from "../redux/actions/profileAction";
import CommuCard from "./CommuCard";
import LoadIcon from "../images/loading.gif";
import LoadMoreBtn from "./LoadMoreBtn";
import { POST_TYPES } from "../redux/actions/postAction";
import PostCardAll from "./PostCardAll";
import { getAllPosts, ALL_TYPES } from "../redux/actions/postAction";
import CommuStatus from "./home/CommuStatus";

const BostCardOne = ({ bost }) => {
  const { all, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!all.firstLoad) {
      dispatch(getAllPosts(auth.token));
    }
  }, [dispatch, auth.token, all.firstLoad]);

  // const handleLoadMore = async () => {
  //   setLoad(true);
  //   const res = await getDataAPI(`posts?limit=${all.page * 9}`, auth.token);
  //   dispatch({
  //     type: POST_TYPES.GET_POSTS,
  //     payload: { ...res.data, page: all.page + 1 },
  //   });
  //   setLoad(false);
  // };
  const year = bost.createdAt.slice(0, 4);
  const month = bost.createdAt.slice(5, 7);
  const day = bost.createdAt.slice(8, 10);
  return (
    <div>
      <div className="community-intro">
        <div className="community-background">
          {bost.images2[0] ? (
            <img src={bost.images2[0].url} />
          ) : (
            <img src={bost.images[1].url} />
          )}
        </div>
        <div className="community-profile">
          <div className="community-profile-img">
            {bost.images[0] ? <img src={bost.images[0].url} /> : <></>}
          </div>
          <div className="community-name">
            <a>{bost.community}</a>
          </div>
          <div className="community-status">
            <a>
              <a className="comma-welcome">,</a> 커뮤니티에 오신 것을
              환영합니다.
            </a>
          </div>
        </div>
      </div>
      <div className="community-grid">
        <div>
          <div className="commu-status-modal">
            <CommuStatus bost={bost.community} />
          </div>
          <div className="community-post-box">
            {all.posts.map((post) =>
              bost.community == post.community ? (
                <div className="posts">
                  <PostCardAll
                    key={post._id}
                    post={post}
                    theme={theme}
                    bost={bost}
                  />
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
        <div className="community-all">
          <div className="community-description">
            <div className="description">
              <a>{bost.content}</a>
            </div>
            <div className="Created">
              <a>
                {bost.community} {year}년 {month}월 {day}일에 새워졌습니다.
              </a>
            </div>
          </div>
          <div className="TrendRecent">
            <div className="Trend">
              <div className="community-trend">🔥트렌드</div>
            </div>
            <div className="Recent">
              <div className="community-recent">⏱최신글</div>
            </div>
          </div>
          <div className="community-rule">
            {bost.contentsub} ! 1. 관련 없는 글은 올리지 않는다. 2. 이상한 글도
            올리지 않는다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BostCardOne;

{
  /* <CardHeader bost={bost} />
      <CardBody bost={bost} theme={theme} />
      <CardFooter bost={bost} />
      <Bomments bost={bost} />
      <InputBomment bost={bost} /> */
}
{
  /* <CardHeader bost={bost} />
      <CardBody bost={bost} theme={theme} />
      <CardFooter bost={bost} />

      <Bomments bost={bost} />
      <InputBomment bost={bost} /> */
}

// Previous Hogun
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import CardBody from "./home/bost_card/CardBody";
// import { Link } from "react-router-dom";
// import CardFooter from "./home/bost_card/CardFooter";
// import CardHeader from "./home/bost_card/CardHeader";
// import Bomments from "./home/Bomments";
// import InputBomment from "./home/InputBomment";
// import { getDataAPI } from "../utils/fetchData";
// import { PROFILE_TYPES } from "../redux/actions/profileAction";
// import CommuCard from "./CommuCard";
// import LoadIcon from "../images/loading.gif";
// import LoadMoreBtn from "./LoadMoreBtn";
// import { POST_TYPES } from "../redux/actions/postAction";
// import PostCard from "./PostCard";

// const BostCardOne = ({ bost }) => {
//   const { all, auth, theme } = useSelector((state) => state);
//   const dispatch = useDispatch();

//   const [load, setLoad] = useState(false);

//   const handleLoadMore = async () => {
//     setLoad(true);
//     const res = await getDataAPI(`posts?limit=${all.page * 9}`, auth.token);
//     dispatch({
//       type: POST_TYPES.GET_POSTS,
//       payload: { ...res.data, page: all.page + 1 },
//     });
//     setLoad(false);
//   };
//   return (
//     <div className="card">
//       Welcome to {bost.community} community
//       {all.posts.map((post) =>
//         bost.community == post.community ? (
//           <div className="posts">
//             <PostCard key={post._id} post={post} theme={theme} bost={bost} />
//           </div>
//         ) : (
//           <></>
//         )
//       )}
//     </div>
//   );
// };

// export default BostCardOne;
