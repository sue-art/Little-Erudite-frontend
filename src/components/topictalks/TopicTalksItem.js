import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../quiz/quiz.css";

const TopicTalksItem = ({ topic }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { id, title, image } = topic;

  const getColorClass = (index) => {
    const colors = [
      "bg-green",
      "bg-pink",
      "bg-yellow",
      "bg-red",
      "bg-blue",
      "bg-purple",
    ];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };

  return (
    <Fragment>
      <div
        className={`quiz-card `}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
          <div
            className={`card-front rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none ${getColorClass(
              id
            )}`}
          >
            {/* Front of the card */}
            <div className="p-5 flex flex-col h-full">
              <Link className="flex-grow">
                <h2 className="mt-5 text-white">{title}</h2>

                <center>
                  <img
                    src={image}
                    alt={title}
                    className="my-5 object-cover object-center"
                  />
                </center>
              </Link>

              <div className="mt-auto flex justify-end"></div>
            </div>
          </div>
          <div
            className={`card-back p-5 rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none ${getColorClass(
              id
            )}`}
          >
            {/* Back of the card */}
            <div className="p-5 flex flex-col h-full">
              <h2 className="text-white text-2xl">{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopicTalksItem;
