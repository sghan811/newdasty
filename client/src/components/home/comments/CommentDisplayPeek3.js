import React, { useEffect, useState } from "react";
import CommentCardPeek from "./CommentCardPeek3";

const CommentDisplayPeek2 = ({ comment, post, replyCm, color }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display">
      <CommentCardPeek
        post={post}
        comment={comment}
        commentId={comment._id}
        color={color}
      >
        <div className="ps-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCardPeek
                  comment={item}
                  key={index}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}
        </div>
      </CommentCardPeek>
    </div>
  );
};

export default CommentDisplayPeek2;