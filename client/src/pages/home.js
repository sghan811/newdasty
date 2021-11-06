import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Posts from "../components/home/Posts";
import All from "../components/home/All";
import Status from "../components/home/Status";
import CommunityMenus from "../components/CommunityMenus";
import RightSideBar from "../components/home/RightSideBar";

import LoadIcon from "../images/loading.gif";

import { useDispatch } from "react-redux";
import {
  getDiscoverPosts,
  DISCOVER_TYPES,
} from "../redux/actions/discoverAction";
import { getAllPosts, ALL_TYPES } from "../redux/actions/postAction";
import { getPosts } from "../redux/actions/postAction";
import { getSuggestions } from "../redux/actions/suggestionsAction";

import { getDataAPI } from "../utils/fetchData";
import PostThumb from "../components/PostThumb";
import LoadMoreBtn from "../components/LoadMoreBtn";

const Home = () => {
  const { homePosts } = useSelector((state) => state);
  const { auth, discover } = useSelector((state) => state);
  const { all } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [followingTab, setFollowingTab] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!all.firstLoad) {
      dispatch(getAllPosts(auth.token));
    }
  }, [dispatch, auth.token, all.firstLoad]);

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?num=${discover.page * 8}`,
      auth.token
    );
    dispatch({ type: DISCOVER_TYPES.UPDATE_POSTS, payload: res.data });
    setLoad(false);
  };
  const handleRefreshHome = () => {
    window.scrollTo({ top: 0 });
    dispatch(getAllPosts(auth.token));
  };
  const handleRefreshHomeFollow = () => {
    window.scrollTo({ top: 0 });
    dispatch(getPosts(auth.token));
  };

  return (
    <div className="home-grid">
      <div className="">
        <Status />
        <div className="home-select">
          <div className="for-you-box">
            <div className="for-you rightalign" onClick={handleRefreshHome}>
              <button
                className={followingTab ? "" : "active"}
                onClick={() => setFollowingTab(false)}
              >
                {/* ENG */}
                {/* For you */}
                당신을 위한 밸겜
              </button>
            </div>
          </div>
          <div className="only-follow-box">
            <div
              className="only-follow leftalign"
              onClick={handleRefreshHomeFollow}
            >
              <button
                className={followingTab ? "active" : ""}
                onClick={() => setFollowingTab(true)}
              >
                {/* ENG */}
                {/* Following */}
                팔로잉들의 밸겜
              </button>
            </div>
          </div>
        </div>
        {all.loading && homePosts.posts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : all.result === 0 ? (
          <h2 className="text-center">No Community</h2>
        ) : (
          <CommunityMenus />
        )}
        {all.loading && homePosts.posts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : all.result === 0 ? (
          <h2 className="text-center">포스트가 없습니다</h2>
        ) : (
          <>
            {followingTab ? (
              <>
                {homePosts.posts.length == 0 ? (
                  <div className="nofollowpage">
                    <a className="nofollowpagesad default">
                      팔로잉한 사람이 아직 없습니다 ㅠㅠ
                    </a>
                    <br />
                    <Link className="nofollowpagego" to="/search">
                      팔로우하러 가볼까요?
                    </Link>
                  </div>
                ) : (
                  <Posts
                    posts={homePosts.posts}
                    auth={auth}
                    dispatch={dispatch}
                  />
                )}
              </>
            ) : (
              <All posts={all.posts} auth={auth} dispatch={dispatch} />
            )}
          </>
        )}
      </div>

      {/* {all.loading ? (
        <img className="d-block mx-auto my-4" src={LoadIcon} alt="Loading" />
      ) : (
        <>
          {followingTab ? (
            <FollowingPosts auth={auth} dispatch={dispatch} />
          ) : (
            <Posts posts={all.posts} auth={auth} dispatch={dispatch} />
          )}
        </>
      )} */}

      <div className="">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
