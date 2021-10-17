import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../PostCard";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";
import { getAllPosts, ALL_TYPES } from "../../redux/actions/postAction";
const HashPosts = () => {
  const { homePosts, all, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!all.firstLoad) {
      dispatch(getAllPosts(auth.token));
    }
  }, [dispatch, auth.token, all.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`posts?limit=${all.page * 9}`, auth.token);
    dispatch({
      type: ALL_TYPES.GET_POSTS,
      payload: { ...res.data, page: all.page + 1 },
    });
    setLoad(false);
  };
  var newURL = "" + window.location.pathname;
  var newUR = newURL.slice(9);
  var unicodekorean = decodeURI(newUR);
  return (
    <div className="posts">
      <div className="hashtagetitle cardpad">
        <a>#{unicodekorean}</a>
      </div>
      {all.posts.map((post) =>
        post.trend1 == unicodekorean ? (
          <div className="posts">
            <PostCard key={post._id} post={post} theme={theme} />
          </div>
        ) : (
          <></>
        )
      )}
      {load && (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
      )}
      {/* <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      /> */}
    </div>
  );
};

export default HashPosts;
