import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { imageShow, videoShow } from "../utils/mediaShow";
import { BroadcastOperator } from "socket.io";

const PostThumb = ({ posts, result }) => {
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
      {posts &&
        posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <div className="post_thumb_display">
              {post.images.length || post.images2.length > 0 ? (
                <>
                  <div className="thumbnail">
                    <div className="post-title-box">
                      <div className="post-title">
                        <div className="post-name">{post.title}</div>
                        <div className="post-community Gbold">
                          {post.community}
                        </div>
                      </div>
                    </div>
                    <div className="choice-bounding">
                      <div className={`${post.trend2} choice1`}>
                        <div className="boundleft bound">
                          <div>
                            <a>{post.content}</a>
                          </div>
                          <div>
                            <img src={post.images[0].url} />
                          </div>
                        </div>
                      </div>
                      <div className={`${post.trend3} choice2`}>
                        <div className="boundright bound">
                          <div>
                            <a>{post.contentsub}</a>
                          </div>
                          <div>
                            <img src={post.images2[0].url} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="thumbnail">
                  <div className="post-title">
                    <div className="post-name">{post.title}</div>
                    <div className="post-community Gbold">{post.community}</div>
                  </div>
                  <div className="choice-bounding">
                    <div className={`${post.trend2} choice1`}>
                      <div className="boundleft bound">
                        <a>{post.content}</a>
                      </div>
                    </div>
                    <div className={`${post.trend3} choice2`}>
                      <div className="boundright bound">
                        <a>{post.contentsub}</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <div className="post_thumb_menu">
                <i className="far fa-thumbs-up">{post.likes.length}</i>
                <i className="far fa-thumbs-up">{post.likelefts.length}</i>
                <i className="far fa-thumbs-up">{post.likerights.length}</i>
                <i className="far fa-comments">{post.comments.length}</i>
              </div> */}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default PostThumb;
