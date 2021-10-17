import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentCom } from "../../redux/actions/commentAction";
import Icons from "../Icons";

const InputCommentCom = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) {
        return setOnReply(false);
      }
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };
    dispatch(createCommentCom({ post, newComment, auth, socket }));
    if (setOnReply) {
      return setOnReply(false);
    }
  };

  return (
    <form className="comment_input cardpad" onSubmit={handleSubmit}>
      {children}
      {post.comments.length == 0 ? (
        <input
          type="text"
          placeholder="첫번째 댓글을 달아보세요!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder="댓글 입력하기"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}

      <button type="submit" className="postBtn">
        보내기
      </button>
    </form>
  );
};

export default InputCommentCom;
