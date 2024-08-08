import React from "react";
import { Link } from "react-router-dom";
import { toppicCategory } from "./topictalksData";

const TopicTalksCategory = () => {
  const handleClick = (e) => {
    alert("Category Clicked", e.target.value);
  };

  return (
    <div className="mt-20 flex items-center justify-center flex-wrap">
      {toppicCategory.map((topic) => (
        <a
          href="#Fook"
          type="button"
          value={topic.name}
          onClick={(e) => {
            handleClick(e);
          }}
          className="text-white bg-green hover:bg-white hover:text-blue border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        >
          {topic.name}
        </a>
      ))}
    </div>
  );
};

export default TopicTalksCategory;
