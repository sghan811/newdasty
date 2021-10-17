import React, { useEffect, useState } from "react";
import BommentCard from "./BommentCard";

const BommentDisplay = ({ bomment, bost, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);
  const randomrgb = () => {
    const b = document.querySelectorAll('.comment_display');
    for ( var i = 0; i < b.length; i++ ) {
      b[i].style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);;
    }
  }
  useEffect(() => {
    randomrgb();
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display">
      <BommentCard bost={bost} bomment={bomment} bommentId={bomment._id}>
        <div className="ps-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <BommentCard
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
      </BommentCard>
    </div>
  );
};

export default BommentDisplay;
