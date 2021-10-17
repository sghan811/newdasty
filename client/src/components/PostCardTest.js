import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardBodyAll from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";
import CardHeader from "./home/post_card/CardHeader";
import CardHeaderComu from "./home/post_card/CardHeaderComu";
import CardNewHeader from "./home/post_card/CardNewHeader";
import CommentsPeek from "./home/CommentsPeek";
import InputComment from "./home/InputComment";
import BostCard from "./BostCard";
import LoadIcon from "../images/loading.gif";
import LoadMoreBtn from "./LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";
import { BOST_TYPES } from "../redux/actions/bostAction";

const PostCardAll = ({ post, theme }) => {
  const { homeBosts, auth } = useSelector((state) => state);
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
  var i = 0;
  i++;
  console.log(i);
  console.log(homeBosts.bosts[x].community);

  var a = 1;
  function increase() {
    var textBox = document.getElementById("text");
    textBox.value = a;
    a++;
  }
  console.log(homeBosts.bosts[0].community);

  console.log(homeBosts.bosts.length);
  var counter = 0;
  while (counter <= homeBosts.bosts.length) {
    if ((homeBosts.bosts[counter].community = post.community)) {
    }
    console.log(post.community);
    counter = counter + 1;
  }
  while (counter <= homeBosts.bosts.length) {
    for (var counter = 0; counter++; ) {
      if ((homeBosts.bosts[counter].community = post.community)) {
        break;
      }
      console.log(counter);
    }

    console.log(post.community);
    counter = counter + 1;
  }
  console.log(post.community);
  for (var i = 0; i < 10; i++) {
    if (i == 5) {
      break;
    }
    console.log(i);
  }
  for (homeBosts.bosts; post; ) {
    if (homeBosts.bosts.community === post.community) {
      break;
    }
    console.log(post.community);
  }
  const array1 = [5, 12, 8, 130, 44];

  const found = homeBosts.bosts.find(
    (element) => element.community == post.community
  );

  console.log(found);

  var inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];
  console.log(inventory);
  console.log(post.community);
  const arr = homeBosts.bosts;

  console.log(homeBosts.bosts);
  function findCherries(bost) {
    return bost.community == post.community;
  }

  console.log(homeBosts.bosts.find(findCherries)); // { name: 'cherries', quantity: 5 }
  const match = homeBosts.bosts.find(findCherries);
  console.log(findCherries);
  console.log(arr.index(`${match}`));

  const letters = [
    {
      letter: "a",
    },
    {
      letter: "b",
    },
    {
      letter: "c",
    },
  ];

  const index = homeBosts.bosts.findIndex((element, index) => {
    if (element.community === `${match}`) {
      return true;
    }
  });
  console.log(index);
  console.log(homeBosts.bosts[index]);
  return (
    <div className="card">
      {/* {homeBosts.bosts.map((bost) => (
        <CardNewHeader
          homeBosts={homeBosts}
          post={post}
          bost={bost}
          theme={theme}
        />
      ))} */}
      {homeBosts.bosts.map((bost) =>
        bost.community === post.community ? (
          <>
            <CardHeaderComu post={post} bost={bost} theme={theme} />
          </>
        ) : (
          <>
            <CardHeader post={post} />
          </>
        )
      )}
      {/* <CardNewHeader
        homeBosts={homeBosts}
        post={post}
        bost={bost}
        theme={theme}
      /> */}
      {homeBosts.bosts.find(findCherries) !== undefined ? (
        <>
          <CardHeaderComu
            post={post}
            bost={homeBosts.bosts.find(findCherries)}
            // bost={homeBosts.bosts[index]}
            theme={theme}
          />{" "}
        </>
      ) : (
        <>
          <CardHeader post={post} />
        </>
      )}
      {homeBosts.bosts.find(findCherries) !== undefined ? (
        <>{homeBosts.bosts.find(findCherries).community}</>
      ) : (
        <>none</>
      )}

      <CardBodyAll post={post} theme={theme} />
      <CardFooter post={post} />
      <CommentsPeek post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCardAll;
