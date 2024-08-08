import React, { Fragment } from "react";
import { toppicCategory } from "./topictalksData";
import { CardItems } from "./topictalksData";
import TopicTalksItem from "./TopicTalksItem";

const TopicTalksList = () => {
  const categoryList = toppicCategory.map((item) => (
    <div id={item.name} key={item.id} color={item.color}>
      <h1 className="text-2xl my-5">{item.name}</h1>
      <div className="mb-20 flex items-stretch justify-center flex-wrap">
        <div className="carousel rounded-box">
          {CardItems.filter((cardItem) => cardItem.category === item.name).map(
            (card) => (
              <div key={card.id} className="carousel-item">
                <TopicTalksItem topic={card} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  ));
  return (
    <Fragment>
      <div className="card-sections">{categoryList}</div>
    </Fragment>
  );
};

export default TopicTalksList;
