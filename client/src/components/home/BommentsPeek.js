import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BommentDisplayPeek from "./bomments/BommentDisplayPeek";

const BommentsPeek = ({ bost }) => {
  const [bomments, setBomments] = useState([]);
  const [showBomments, setShowBomments] = useState([]);
  const [next, setNext] = useState(2);
  const [replyBomments, setReplyBomments] = useState([]);

  useEffect(() => {
    const newCm = bost.bomments.filter((cm) => !cm.reply);
    setBomments(newCm);
    setShowBomments(newCm.slice(newCm.length - next));
  }, [bost.bomments, next]);

  useEffect(() => {
    const newReply = bost.bomments.filter((cm) => cm.reply);
    setReplyBomments(newReply);
  }, [bost.bomments]);

  return (
    <div className="comments">
      {showBomments.map((bomment, index) => (
        <BommentDisplayPeek
          key={index}
          bomment={bomment}
          bost={bost}
          replyCm={replyBomments.filter((item) => item.reply === bomment._id)}
        />
      ))}
      {bost.bomments.length == 0 ? (
        <Link to={`/bost/${bost._id}`} className="comments-num default">
          {bost.bomments.length} bomment
        </Link>
      ) : bost.bomments.length == 1 ? (
        <Link to={`/bost/${bost._id}`} className="comments-num default">
          {bost.bomments.length} bomment
        </Link>
      ) : (
        <Link to={`/bost/${bost._id}`} className="comments-num default">
          {bost.bomments.length} bomments
        </Link>
      )}
    </div>
  );
};

export default BommentsPeek;
