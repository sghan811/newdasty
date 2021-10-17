import React from "react";

const Commucard = ({ post, theme, bost }) => {
  return (
    <div className="card">
      {bost.community}
      {post.community}
    </div>
  );
};

export default Commucard;
