import React from "react";
import { useSelector } from "react-redux";

import Bosts from "../components/home/Bosts";
import BostStatus from "../components/home/BostStatus";
import CommunityMenu from "../components/home/CommunityMenu";
import RightSideBar from "../components/home/RightSideBar";

import LoadIcon from "../images/loading.gif";

const Community = () => {
  const { homeBosts } = useSelector((state) => state);
  return (
    <div className="home-grid">
      <div className="">
        <BostStatus />
        {/* {homeBosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homeBosts.result === 0 ? (
          <h2 className="text-center">No Community</h2>
        ) : (
          <CommunityMenu />
        )} */}
        {homeBosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homeBosts.result === 0 ? (
          <h2 className="text-center">포스트가 없습니다</h2>
        ) : (
          <Bosts />
        )}
      </div>
    </div>
  );
};

export default Community;
