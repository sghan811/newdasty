import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BostCard from "../BostCard";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { BOST_TYPES } from "../../redux/actions/bostAction";

const Bosts = () => {
  const { homeBosts, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

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
    <div className="bosts">
      {homeBosts.bosts.map((bost) => (
        <BostCard key={bost._id} bost={bost} theme={theme} />
      ))}

      {load && (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
      )}

      <LoadMoreBtn
        result={homeBosts.result}
        page={homeBosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Bosts;
