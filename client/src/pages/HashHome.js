import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import HashPosts from "../components/home/HashPosts";
import Status from "../components/home/Status";
import RightSideBar from "../components/home/RightSideBar";
import { getAllPosts, ALL_TYPES } from "../redux/actions/postAction";
import { getDataAPI } from "../utils/fetchData";
import LoadIcon from "../images/loading.gif";

const HashHome = () => {
  const { homePosts, all } = useSelector((state) => state);
  const [load, setLoad] = useState(false);

  return (
    <div className="home-grid">
      <div className="">
        <Status />
        {load ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : (
          <HashPosts />
        )}
      </div>

      <div className="">
        <RightSideBar />
      </div>
    </div>
  );
};

export default HashHome;
