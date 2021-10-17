import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBomment } from "../../redux/actions/bommentAction";
import Icons from "../Icons";

const InputBomment = ({ children, bost, onReply, setOnReply }) => {
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

    const newBomment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.bommentId,
      tag: onReply && onReply.user,
    };
    dispatch(createBomment({ bost, newBomment, auth, socket }));
    if (setOnReply) {
      return setOnReply(false);
    }
  };

  return (
    <form className="comment_input" onSubmit={handleSubmit}>
      {children}
      {bost.bomments.length == 0 ? (
        <input
          type="text"
          placeholder="Write the first bomment!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder="Add bomments"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}

      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default InputBomment;
