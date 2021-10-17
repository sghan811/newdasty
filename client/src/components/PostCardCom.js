import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardBodyCom from "./home/post_card/CardBodyCom";
import CardFooter from "./home/post_card/CardFooter";
import CardFooterCom from "./home/post_card/CardFooterCom";
import CardHeader from "./home/post_card/CardHeader";
import CardHeaderCom from "./home/post_card/CardHeaderCom";
import CardHeaderComuCom from "./home/post_card/CardHeaderComuCom";
import CardNewHeader from "./home/post_card/CardNewHeader";
import CommentsPeek from "./home/CommentsPeek";
import InputComment from "./home/InputComment";
import InputCommentCom from "./home/InputCommentCom";
import BostCard from "./BostCard";
import LoadIcon from "../images/loading.gif";
import LoadMoreBtn from "./LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";
import { BOST_TYPES } from "../redux/actions/bostAction";

const PostCardCom = ({ post, theme }) => {
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
    <div className="card">
      {homeBosts.bosts.find(findCherries) !== undefined ? (
        <>
          <CardHeaderComuCom post={post} bost={match} theme={theme} />{" "}
        </>
      ) : (
        <>
          <CardHeaderCom post={post} />
        </>
      )}
      <CardBodyCom post={post} theme={theme} />
      <CardFooterCom post={post} />
      <CommentsPeek post={post} />
      <InputCommentCom post={post} />
    </div>
  );
};

export default PostCardCom;
