import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { imageShow, videoShow } from "../utils/mediaShow";

const BostThumb = ({ bosts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0) {
    return <h2 className="text-center color-c1">포스트가 없습니다</h2>;
  }

  const imageShow = (src) => {
    return (
      <img
        src={src}
        alt={src}
        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
      />
    );
  };

  const videoShow = (src) => {
    return (
      <video
        controls
        src={src}
        alt={src}
        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
      />
    );
  };
  return (
    <div className="post_thumb">
      {bosts &&
        bosts.map((bost) => (
          <Link to={`/bost/${bost._id}`} key={bost._id}>
            <div className="post_thumb_display">
              {bost.images.length > 0 ? (
                <>
                  {bost.images[0].url.match(/video/i)
                    ? videoShow(bost.images[0].url, theme)
                    : imageShow(bost.images[0].url, theme)}
                </>
              ) : (
                <>
                  {bost.content} VS {bost.contentsub}
                </>
              )}

              <div className="post_thumb_menu">
                <i className="far fa-thumbs-up">{bost.likes.length}</i>
                <i className="far fa-thumbs-up">{bost.likelefts.length}</i>
                <i className="far fa-thumbs-up">{bost.likerights.length}</i>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BostThumb;
