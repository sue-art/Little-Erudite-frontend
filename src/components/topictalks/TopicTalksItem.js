import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../Quiz/quiz.css";

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

              <div className="mt-auto flex justify-end">
                <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Take a quiz
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`card-back p-5 rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none ${getColorClass(
              id
            )}`}
          >
            {/* Back of the card */}
            <div className="p-5 flex flex-col h-full">
              <h2 className="text-white">{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopicTalksItem;
