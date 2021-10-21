import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardBodyAll from "./home/post_card/CardBodyAll";
import CardFooter from "./home/post_card/CardFooter";
import CardFooterAll from "./home/post_card/CardFooterAll";
import CardHeader from "./home/post_card/CardHeader";
import CardHeaderAll from "./home/post_card/CardHeaderAll";
import CardHeaderComuAll from "./home/post_card/CardHeaderComuAll";
import CardNewHeader from "./home/post_card/CardNewHeader";
import CommentsPeek from "./home/CommentsPeek";
import InputComment from "./home/InputComment";
import InputCommentAll from "./home/InputCommentAll";
import BostCard from "./BostCard";
import LoadIcon from "../images/loading.gif";
import LoadMoreBtn from "./LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";
import { BOST_TYPES } from "../redux/actions/bostAction";

const PostCardAll = ({ post, theme }) => {
  const { homeBosts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `bosts?limit=${homeBosts.page * 9}`,
      auth.token
    );
    dispatch({
      type: BOST_TYPES.GET_BOSTS,
      payload: { ...res.data, page: homeBosts.page + 1 },
    });
    setLoad(false);
  };

  const found = homeBosts.bosts.find(
    (element) => element.community == post.community
  );
  function findCherries(bost) {
    return bost.community == post.community;
  }

  const match = homeBosts.bosts.find(findCherries);

  const index = homeBosts.bosts.findIndex((element, index) => {
    if (element.community === `${match}`) {
      return true;
    }
  });
  return (
    <div className="card" id={post._id}>
      {homeBosts.bosts.find(findCherries) !== undefined ? (
        <>
          <CardHeaderComuAll post={post} bost={match} theme={theme} />{" "}
        </>
      ) : (
        <>
          <CardHeaderAll post={post} />
        </>
      )}
      <CardBodyAll post={post} theme={theme} />
      <CardFooterAll post={post} />
      <CommentsPeek post={post} />
      <InputCommentAll post={post} />
    </div>
  );
};

export default PostCardAll;
