import React, { useEffect, useState } from "react";
import BommentCardPeek from "./BommentCardPeek";

const BommentDisplayPeek = ({ bomment, bost, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display">
      <BommentCardPeek bost={bost} bomment={bomment} bommentId={bomment._id}>
        <div className="ps-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <BommentCardPeek
                  bomment={item}
                  key={index}
                  bost={bost}
                  bommentId={bomment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <div
              onClick={() => setNext(next + 10)}
              style={{ cursor: "pointer" }}
              // style={{ cursor: "pointer", color: "crimson" }}
            >
              Load more...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                onClick={() => setNext(1)}
                style={{ cursor: "pointer" }}
                // style={{ cursor: "pointer", color: "crimson" }}
              >
                Hide...
              </div>
            )
          )}
        </div>
      </BommentCardPeek>
    </div>
  );
};

export default BommentDisplayPeek;
