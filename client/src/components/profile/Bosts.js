import React, { useState, useEffect } from "react";
import BostThumb from "../BostThumb";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";

const Bosts = ({ auth, profile, dispatch, id }) => {
  const [bosts, setBosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    profile.bosts.forEach((data) => {
      if (data._id === id) {
        setBosts(data.bosts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.bosts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `user_bosts/${id}?limit=${page * 9}`,
      auth.token
    );
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };
  return (
    <div>
      <BostThumb bosts={bosts} result={result} />

      {load && (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
      )}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Bosts;
