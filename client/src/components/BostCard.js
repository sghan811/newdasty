import React from "react";
import CommunityCard from "./home/community_card/CommunityCard";
import CardBody from "./home/bost_card/CardBody";
import CardFooter from "./home/bost_card/CardFooter";
import CardHeader from "./home/bost_card/CardHeader";

import BommentsPeek from "./home/BommentsPeek";
import InputBomment from "./home/InputBomment";

const BostCard = ({ bost, theme }) => {
  return (
    <div className="card">
      <CommunityCard bost={bost} />
    </div>
  );
};

export default BostCard;
