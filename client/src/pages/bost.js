import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBost } from "../redux/actions/bostAction";
import LoadIcon from "../images/loading.gif";
import BostCardOne from "../components/BostCardOne";

const Bost = () => {
  const { id } = useParams();
  const [bost, setBost] = useState([]);
  const { auth, detailBost } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBost({ detailBost, id, auth }));
    if (detailBost.length > 0) {
      const newArr = detailBost.filter((bost) => bost._id === id);
      setBost(newArr);
    }
  }, [detailBost, dispatch, id, auth]);

  return (
    <div className="bosts">
      {bost.length === 0 && (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto my-4" />
      )}

      {bost.map((item) => (
        <BostCardOne bost={item} key={item._id} />
      ))}
    </div>
  );
};

export default Bost;
