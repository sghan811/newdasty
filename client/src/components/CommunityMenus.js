import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "./UserCard";
import FollowBtn from "./FollowBtn";
import LoadIcon from "./../images/loading.gif";

import { getSuggestions } from "./../redux/actions/suggestionsAction";
import UserCardSuggest from "./UserCardSuggest";
import BostCard from "./BostCard";
import LoadMoreBtn from "./LoadMoreBtn";
import { getDataAPI } from "./../utils/fetchData";
import { BOST_TYPES } from "./../redux/actions/bostAction";
import { getAllBosts, ALL_TYPES } from "../redux/actions/allbostAction";
import { IoPeopleCircleOutline } from "react-icons/io5";
import Avatar from "./Avatar";
const CommunityMenus = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { allbost, theme } = useSelector((state) => state);

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`bosts?limit=${allbost.page * 9}`, auth.token);
    dispatch({
      type: BOST_TYPES.GET_BOSTS,
      payload: { ...res.data, page: allbost.page + 1 },
    });
    setLoad(false);
  };
  useEffect(() => {
    if (!allbost.firstLoad) {
      dispatch(getAllBosts(auth.token));
    }
  }, [dispatch, auth.token, allbost.firstLoad]);
  return (
    <div className="d-flex">
      {allbost.bosts.map((bost) => (
        <div className="communitymenus">
          <Link className="default" to={`/bost/${bost._id}`} key={bost._id}>
            {bost.images[0] ? (
              <>
                <Avatar src={bost.images[0].url} />{" "}
              </>
            ) : (
              <IoPeopleCircleOutline />
            )}

            {bost.community}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CommunityMenus;
