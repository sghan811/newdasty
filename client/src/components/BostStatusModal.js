import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createBost, updateBost } from "../redux/actions/bostAction";
import Icons from "./Icons";
import { BiMinus, BiTrash, BiImageAdd } from "react-icons/bi";
import {
  imageShowModalCommuBg,
  imageShowModalCommuPf,
  videoShowModal,
} from "../utils/mediaShowModal";

const BostStatusModal = () => {
  const { auth, theme, status1, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [contentsub, setContentsub] = useState("");
  const [community, setCommunity] = useState("");
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

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

    if (status1.onEdit) {
      dispatch(
        updateBost({
          content,
          contentsub,
          community,
          images,
          images2,
          auth,
          status1,
        })
      );
    } else {
      dispatch(
        createBost({
          content,
          contentsub,
          community,
          images,
          images2,
          auth,
          socket,
        })
      );
    }

    setContent("");
    setContentsub("");
    setCommunity("");
    setImages([]);
    setImages2([]);
    if (tracks) {
      tracks.stop();
    }
    dispatch({
      type: GLOBALTYPES.STATUS1,
      payload: false,
    });
  };

  useEffect(() => {
    if (status1.onEdit) {
      setContent(status1.content);
      setContentsub(status1.contentsub);
      setCommunity(status1.community);
      setImages(status1.images);
      setImages2(status1.images2);
    }
  }, [status1]);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS1, payload: false })
            }
          >
            <BiMinus />
          </span>
        </div>
        <div className="status_body">
          {images2.map((img, index) => (
            <div key={index} className="file_img">
              {index == 0 ? (
                <>
                  <span onClick={() => deleteImages2(0)}>
                    커뮤니티 배너 미리보기
                    <div>
                      {img.type.match(/video/i)
                        ? videoShowModal(URL.createObjectURL(img, theme))
                        : imageShowModalCommuBg(
                            URL.createObjectURL(img, theme)
                          )}
                    </div>
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
          {images2[0] ? (
            <></>
          ) : (
            <div className="input_images">
              {stream ? (
                <i className="fas fa-camera" onClick={handleCapture} />
              ) : (
                <>
                  <div className="file_upload">
                    커뮤니티 베너 추가하기
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

          {images.map((img, index) => (
            <div key={index}>
              {index == 0 ? (
                <>
                  <span onClick={() => deleteImages(0)}>
                    커뮤니티 프로필 미리보기
                    <div>
                      {img.type.match(/video/i)
                        ? videoShowModal(URL.createObjectURL(img, theme))
                        : imageShowModalCommuPf(
                            URL.createObjectURL(img, theme)
                          )}
                    </div>
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
          {images[0] ? (
            <></>
          ) : (
            <div className="input_images">
              <div className="file_upload">
                커뮤니티 프로필 추가하기
                <BiImageAdd />
                <input
                  onChange={handleChangeImages}
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/*,video/*"
                />
                {/* {images ? <a>{images[1].name}</a> : <></>} */}
              </div>
            </div>
          )}

          <div>
            <textarea
              onChange={(e) => setCommunity(e.target.value)}
              value={community}
              name="community"
              placeholder="커뮤니티 이름"
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
                placeholder="커뮤니티 소개글"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
            </div>
            <div className="status_body-box">
              <textarea
                onChange={(e) => setContentsub(e.target.value)}
                value={contentsub}
                name="contentsub"
                placeholder="커뮤니티 규칙"
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  color: theme ? "white" : "#111",
                  background: theme ? "rgb(0,0,0,0.3)" : "",
                }}
              />
            </div>
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
        </div>
        <div className="status_footer">
          <button type="submit" className="create-button">
            커뮤니티 만들기
          </button>
        </div>
      </form>
    </div>
  );
};

export default BostStatusModal;
