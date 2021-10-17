import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
import Icons from "../Icons";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const { auth, socket, theme } = useSelector((state) => state);
  const auther = auth.user.username;
  const [content, setContent] = useState("");

  const [contenty, setContenty] = useState("");

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
    setContenty(res);

    const newComment = {
      content,
      contenty: res,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };
    dispatch(createComment({ post, newComment, auth, socket }));
    if (setOnReply) {
      return setOnReply(false);
    }
  };
  const pets = ["cat", "dog", "bat"];
  var x = pets.includes("cat");

  var y = post.likelefts.includes(auth.username);
  // console.log(x);
  // console.log(y);

  const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];

  function isCherries(fruit) {
    return fruit.name === "cherries";
  }
  function isColor(fruit) {
    return fruit.username === auth.user.username;
  }

  // console.log(inventory.find(isCherries));
  // console.log(post.likelefts.find(isColor));
  var [res, setRes] = useState("");
  var founduser = post.likelefts.find(isColor);
  var foundusers = post.likerights.find(isColor);
  console.log(foundusers);
  // if (founduser == auther || foundusers == auther) {
  //   if (founduser == auther) {
  //     res = post.trend2;
  //   } else {
  //     res = post.trend3;
  //   }
  // } else {
  //   res = "";
  // }
  if (founduser) {
    res = post.trend2;
  } else if (foundusers) {
    res = post.trend3;
  } else {
    res = "";
  }

  // if (foundusers) {
  //   res = foundusers;
  //   if (res.username == auther) {
  //     res = post.trend3;
  //   }
  // } else {
  //   res = "";
  // }

  // console.log(post);
  // console.log(auth.user.username);

  // if (cipher_char === from_char) {
  //   result = result + to_char;
  //   x++;
  // } else {
  //   result = result + clear_char;
  // }

  // function foundit(foundu) {
  //   let result;
  //   if (foundu) {
  //     if (foundu == auth.user.username) {
  //       result = "positive";
  //     } else {
  //       result = "NOT positive";
  //     }
  //   } else {
  //     result = "IDK";
  //   }
  // }

  // console.log(foundit(founduser));

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
      <input
        className="d-none"
        type="text"
        placeholder="첫번째 댓글을 달아보세요!"
        value={contenty}
        onChange={(e) => setContenty(e.target.value)}
      />

      <button type="submit" className="postBtn">
        보내기
      </button>
    </form>
  );
};

export default InputComment;
