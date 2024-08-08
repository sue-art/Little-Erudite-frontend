import React, { Fragment } from "react";
import TopicTalksList from "../components/topictalks/TopicTalksList";
import TopicTalksCategory from "../components/topictalks/TopicTalksCategory";

const TopicTalks = () => {
  return (
    <Fragment>
      <div className="container mt-20">
        <TopicTalksCategory />

        <h1 className="text-2xl font-bold">Topic Talks</h1>
        <TopicTalksList />
      </div>
    </Fragment>
  );
};

export default TopicTalks;
