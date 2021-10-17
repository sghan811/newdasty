import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Searchmobile from "../components/header/Searchmobile";
import Menu from "../components/header/Menu";
import { getPosts } from "../redux/actions/postAction";
import { getSuggestions } from "../redux/actions/suggestionsAction";
import LoadIcon from "../images/loading.gif";
import RightSideBar from "../components/home/RightSideBar";
import UserCard from "../components/UserCard";
import FollowBtn from "../components/FollowBtn";
import { getDataAPI } from "../utils/fetchData";
import { BOST_TYPES } from "../redux/actions/bostAction";
import UserCardSuggest from "../components/UserCardSuggest";
import { VscRefresh } from "react-icons/vsc";

const Searchpage = () => {
  const { auth, suggestions } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleRefreshHome = () => {
    window.scrollTo({ top: 0 });
    dispatch(getPosts(auth.token));
    dispatch(getSuggestions(auth.token));
  };

  return (
    <div className="searchpage">
      <nav>
        <div className="container-fluid">
          <Searchmobile />
          <div className="suggestbox">
            <div className="d-flex justify-content-between align-items-center foryou">
              <a>
                새로운 친구들을 <br /> 만나볼까요?
              </a>
              {!suggestions.loading && (
                <div className=" d-flex justify-content-center align-items-center">
                  <button
                    className="refreshbtn"
                    onClick={() => dispatch(getSuggestions(auth.token))}
                  >
                    <VscRefresh />
                  </button>
                </div>
              )}
            </div>

            {suggestions.loading ? (
              <img
                src={LoadIcon}
                alt="Loading..."
                className="d-block mx-auto"
              />
            ) : (
              <div className="suggestions">
                {suggestions.users.map((user) => (
                  <div
                    key={user._id}
                    className=""
                    style={{ borderRadius: "5px" }}
                  >
                    <UserCardSuggest key={user._id} user={user}>
                      <FollowBtn key={user._id} user={user} />
                    </UserCardSuggest>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Searchpage;
