import React from "react";
import CardBody from "./home/post_card/CardBodyAll";
import CardFooter from "./home/post_card/CardFooterAll";
import CardHeader from "./home/post_card/CardHeaderAll";
import Comments from "./home/Comments";
import InputComment from "./home/InputCommentAll";

const PostCardOne = ({ post, theme }) => {
  return (
    <div className="card">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter post={post} />

      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCardOne;
