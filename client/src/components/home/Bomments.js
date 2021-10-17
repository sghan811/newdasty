import React, { useState, useEffect } from "react";
import BommentDisplay from "./bomments/BommentDisplay";

const Bomments = ({ bost }) => {
  const [bomments, setBomments] = useState([]);
  const [showBomments, setShowBomments] = useState([]);
  const [next, setNext] = useState(10);
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
        <BommentDisplay
          key={index}
          bomment={bomment}
          bost={bost}
          replyCm={replyBomments.filter((item) => item.reply === bomment._id)}
        />
      ))}
      {bomments.length - next > 0 ? (
        <div
          onClick={() => setNext(next + 10)}
          className="p-2 border-top"
          style={{ cursor: "pointer" }}
          // style={{ cursor: "pointer", color: "crimson" }}
        >
          Load more...
        </div>
      ) : (
        bomments.length > 2 && (
          <div
            // onClick={() => setNext(2)}
            className="p-2 border-top"
            style={{ cursor: "pointer" }}
            // style={{ cursor: "pointer", color: "crimson" }}
          >
            {/* Hide... */}
          </div>
        )
      )}
    </div>
  );
};

export default Bomments;
