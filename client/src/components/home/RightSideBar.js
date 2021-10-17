import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import SearchRightSide from "../../components/header/SearchRightSide";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";

import { getSuggestions } from "../../redux/actions/suggestionsAction";
import UserCardSuggest from "../UserCardSuggest";
import BostCard from "../BostCard";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { BOST_TYPES } from "../../redux/actions/bostAction";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { homeBosts, theme } = useSelector((state) => state);

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `bosts?limit=${homeBosts.page * 9}`,
      auth.token
    );
    dispatch({
      type: BOST_TYPES.GET_BOSTS,
      payload: { ...res.data, page: homeBosts.page + 1 },
    });
    setLoad(false);
  };

  return (
    <div className="right-sticky">
      <div className="right-side-bar">
        <div className="">
          <UserCard user={auth.user} />
        </div>
        {/* <div>
        <div>
          <Link to="/community">Explore communities</Link>
        </div>
        <div>
          {homeBosts.bosts.map((bost) => (
            <Link to={`/bost/${bost._id}`} key={bost._id}>
              {bost.community}
            </Link>
          ))}
        </div>
      </div> */}
        <SearchRightSide />
        <div className="d-flex justify-content-between align-items-center ">
          <a>새로운 친구들을 만나 볼까요?</a>
          {!suggestions.loading && (
            <div className=" d-flex justify-content-center align-items-center">
              <i
                className="fas fa-redo "
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(getSuggestions(auth.token))}
              />
            </div>
          )}
        </div>

        {suggestions.loading ? (
          <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
        ) : (
          <div className="suggestions">
            {suggestions.users.map((user) => (
              <div key={user._id} className="" style={{ borderRadius: "5px" }}>
                <UserCardSuggest key={user._id} user={user}>
                  <FollowBtn key={user._id} user={user} />
                </UserCardSuggest>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
