import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
import { BiMinus, BiTrash, BiImageAdd } from "react-icons/bi";
import { imageShowModal, videoShowModal } from "../utils/mediaShowModal";
import { getBost } from "../redux/actions/bostAction";

const CommuStatusModal = () => {
  const { id } = useParams();
  const [bost, setBost] = useState([]);
  const { auth, theme, status2, socket, detailBost } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBost({ detailBost, id, auth }));
    if (detailBost.length > 0) {
      const newArr = detailBost.filter((bost) => bost._id === id);
      setBost(newArr);
    }
  }, [detailBost, dispatch, id, auth]);
  function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
  }
  function random_item2(items2) {
    return items2[Math.floor(Math.random() * items2.length)];
  }

  var items = ["fec8d8", "ffdfd3", "cdf1af", "fdf1ed"];
  var items2 = ["fde2e6", "dcf2de", "bde8e7"];
  var timestamp = new Date().getTime();
  var r = timestamp + "r";
  var l = timestamp + "l"
  var random = random_item(r);
  var random2 = random_item2(l);

  var newURL = "" + window.location.pathname;
  var newUR = newURL.slice(6);

  const found = detailBost.find((element) => element._id == newUR);

  const [content, setContent] = useState("");
  const [contentsub, setContentsub] = useState("");
  const [community, setCommunity] = useState(found.community);
  const [title, settitle] = useState("");
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");
  const [trend1, settrend1] = useState("");

  const [trend2, settrend2] = useState(random);
  const [trend3, settrend3] = useState(random2);

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) {
        return (err = "File does not exist.");
      }
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Image size must be less than 5 mb.");
      }
      return newImages.push(file);
    });
    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setImages([...images, ...newImages]);
  };
  const handleChangeImages2 = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) {
        return (err = "File does not exist.");
      }
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Image size must be less than 5 mb.");
      }
      return newImages.push(file);
    });
    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setImages2([...images2, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const deleteImages2 = (index) => {
    const newArr = [...images2];
    newArr.splice(index, 1);
    setImages2(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };
  const handleCapture2 = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL2 = refCanvas.current.toDataURL();
    setImages2([...images2, { camera: URL2 }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (images.length === 0) {
    //   return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: "Add image(s)." },
    //   });
    // }

    if (status2.onEdit) {
      dispatch(
        updatePost({
          content,
          contentsub,
          community,
          images,
          images2,
          trend1,
          trend2,
          trend3,
          title,
          auth,
          status2,
        })
      );
    } else {
      dispatch(
        createPost({
          content,
          contentsub,
          community,
          images,
          images2,
          trend1,
          trend2,
          trend3,
          title,
          auth,
          socket,
        })
      );
    }

    setContent("");
    setContentsub("");
    setCommunity("");
    settitle("");
    setImages([]);
    setImages2([]);
    settrend1("");
    settrend2("");
    settrend3("");
    if (tracks) {
      tracks.stop();
    }
    dispatch({
      type: GLOBALTYPES.STATUS2,
      payload: false,
    });
  };

  useEffect(() => {
    if (status2.onEdit) {
      setContent(status2.content);
      setContentsub(status2.contentsub);
      setCommunity(status2.community);
      setImages(status2.images);
      setImages2(status2.images2);
      settitle(status2.title);
      settrend1(status2.trend1);
      settrend2(status2.trend2);
      settrend3(status2.trend3);
    }
  }, [status2]);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <a className="m-0 default">나의 밸런스게임 만들기!</a>

          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS2, payload: false })
            }
          >
            <BiMinus />
          </span>
        </div>
        <div className="status_body">
          <div>
            <a className="">/* 포스팅 후에는 수정이 불가능 합니다 */</a>
          </div>
          <div className="d-flex">
            <a>{}</a>
            <div>
              <textarea
                className="hashtag-textarea"
                onChange={(e) => setCommunity(e.target.value)}
                value={community}
                name="community"
                disabled
                placeholder="커뮤니티"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
            </div>
          </div>
          <div className="d-none">
            <div>#</div>
            <a>{}</a>
            <div>
              <textarea
                className="hashtag-textarea"
                onChange={(e) => settrend2(e.target.value)}
                value={trend2}
                name="trend2"
                placeholder="trend2"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
            </div>
          </div>
          <div className="d-none">
            <div>#</div>
            <a>{}</a>
            <div>
              <textarea
                className="hashtag-textarea"
                onChange={(e) => settrend3(e.target.value)}
                value={trend3}
                name="trend3"
                placeholder="trend3"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
            </div>
          </div>
          <div>
            <textarea
              onChange={(e) => settitle(e.target.value)}
              value={title}
              name="title"
              placeholder="포스트 제목"
              style={{
                filter: theme ? "invert(1)" : "invert(0)",
                color: theme ? "white" : "#111",
                background: theme ? "rgb(0,0,0,0.3)" : "",
              }}
            />
          </div>
          <div className="status_body-block">
            <div className="status_body-box">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                name="content"
                placeholder="선택지 내용"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
              {images.map((img, index) => (
                <div key={index}>
                  {index == 0 ? (
                    <>
                      <span onClick={() => deleteImages(0)}>
                        <div>
                          {img.type.match(/video/i)
                            ? videoShowModal(URL.createObjectURL(img, theme))
                            : imageShowModal(URL.createObjectURL(img, theme))}
                        </div>
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              {/* <div className="file_img">
                <img
                  src={images}
                  className="img-show-modal"
                  alt="uploaded pics"
                />
                <span onClick={() => deleteImages(0)}>
                  <BiTrash />
                </span>
              </div> */}
              {/* {images.map((img, index) => (
                <div key={index} className="file_img">
                  {index == 0 ? (
                    <>
                      <div>
                        {img.type.match(/image/i)
                          ? imageShowModal(URL.createObjectURL(img, theme))
                          : imageShowModal(URL.createObjectURL(img, theme))}
                      </div>
                      <div>
                        <span onClick={() => deleteImages(0)}>
                          <BiTrash />
                        </span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))} */}
              {images[0] ? (
                <></>
              ) : (
                <div className="input_images">
                  {stream ? (
                    <i className="fas fa-camera" onClick={handleCapture} />
                  ) : (
                    <>
                      <div className="file_upload">
                        <BiImageAdd />
                        <input
                          onChange={handleChangeImages}
                          type="file"
                          name="file"
                          id="file"
                          multiple
                          accept="image/*,video/*"
                        />
                        {/* {images ? <a>{images[0].name}</a> : <></>} */}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="status_body-box">
              <textarea
                onChange={(e) => setContentsub(e.target.value)}
                value={contentsub}
                name="contentsub"
                placeholder="선택지 내용"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
              {images2.map((img, index) => (
                <div key={index}>
                  {index == 0 ? (
                    <>
                      <span onClick={() => deleteImages2(0)}>
                        <div>
                          {img.type.match(/video/i)
                            ? videoShowModal(URL.createObjectURL(img, theme))
                            : imageShowModal(URL.createObjectURL(img, theme))}
                        </div>
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              {/* {images2.map((img, index) => (
                <div key={index} className="file_img">
                  {index == 0 ? (
                    <>
                      <div>
                        {img.type.match(/image/i)
                          ? imageShowModal(URL.createObjectURL(img, theme))
                          : imageShowModal(URL.createObjectURL(img, theme))}
                      </div>
                      <div>
                        <span onClick={() => deleteImages2(0)}>
                          <BiTrash />
                        </span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))} */}
              {/* <div className="file_img">
                <img
                  src={images2}
                  className="img-show-modal"
                  alt="uploaded pics"
                />
                <span onClick={() => deleteImages2(0)}>
                  <BiTrash />
                </span>
              </div> */}
              {/* {images.map((img, index) => (
            <div key={index} className="file_img">
              {img.camera ? (
                imageShowModal(img.camera, theme)
              ) : img.url ? (
                <>
                  {img.url.match(/video/i)
                    ? videoShowModal(img.url)
                    : imageShowModal(img.url)}
                </>
              ) : (
                <>
                  {img.type.match(/video/i)
                    ? videoShowModal(URL.createObjectURL(img, theme))
                    : imageShowModal(URL.createObjectURL(img, theme))}
                </>
              )}
              <span onClick={() => deleteImages(index)}>&times;</span>
            </div>
          ))} */}
              {images2[0] ? (
                <></>
              ) : (
                <div className="input_images">
                  {stream ? (
                    <i className="fas fa-camera" onClick={handleCapture2} />
                  ) : (
                    <>
                      <div className="file_upload">
                        <BiImageAdd />
                        <input
                          onChange={handleChangeImages2}
                          type="file"
                          name="file"
                          id="file"
                          multiple
                          accept="image/*,video/*"
                        />
                        {/* {images ? <a>{images[0].name}</a> : <></>} */}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* <div className="show_images">
            {images.map((img, index) => (
              <div key={index} className="file_img">
                {img.camera ? (
                  imageShowModal(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShowModal(img.url)
                      : imageShowModal(img.url)}
                  </>
                ) : img[0] ? (
                  <>yes</>
                ) : img[1] ? (
                  <>no</>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShowModal(URL.createObjectURL(img, theme))
                      : imageShowModal(URL.createObjectURL(img, theme))}
                  </>
                )}
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div> */}
            {/* {stream && (
            <div className="stream position-relative">
              <video
                width="100%"
                height="100%"
                ref={videoRef}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                autoPlay
                muted
              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas style={{ display: "none" }} ref={refCanvas} />
            </div>
          )} */}
            {/* <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />
                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    onChange={handleChangeImages}
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                  />
                </div>
              </>
            )}
          </div> */}
          </div>
          <div className="community-hashtag">
            <div>#</div>
            <a>{}</a>
            <div>
              <textarea
                className="hashtag-textarea"
                onChange={(e) => settrend1(e.target.value)}
                value={trend1}
                name="trend"
                placeholder="해쉬태그"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
            </div>
          </div>
        </div>
        <div className="status_footer">
          <button type="submit" className="create-button">
            포스팅 하기
          </button>
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default CommuStatusModal;
