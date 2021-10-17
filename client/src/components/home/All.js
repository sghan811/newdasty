import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCardAll from "../PostCardAll";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { getAllPosts, ALL_TYPES } from "../../redux/actions/postAction";

const Posts = (posts) => {
  const { homePosts, all, auth, theme, homeBosts } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!all.firstLoad) {
      dispatch(getAllPosts(auth.token));
    }
  }, [dispatch, auth.token, all.firstLoad]);
  const limit = 9;

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`post_all?limit=${all.page * 9}`, auth.token);
    dispatch({ type: ALL_TYPES.UPDATE_POSTS, payload: res.data });
    setLoad(false);
  };
  window.onscroll = function (ev) {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      handleLoadMore();
    }
  };
  return (
    <div className="posts">
      {posts.posts.map((post) => (
        <PostCardAll key={post._id} post={post} theme={theme} />
      ))}
      {load && (
        <>
          <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
        </>
      )}
      {/* {all.page * 9 >= all.posts.length - 1 ? (
        <>You've all caught up</>
      ) : (
        <>
          {" "}
          <LoadMoreBtn
            result={all.result}
            page={all.page}
            load={load}
            handleLoadMore={handleLoadMore}
          />
        </>
      )} */}
    </div>
  );
};

export default Posts;
