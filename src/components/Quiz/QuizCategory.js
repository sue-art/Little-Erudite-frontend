import React, { Fragment, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { QuizContext } from "./QuizContextProvider";

const quizCategories = [
  {
    name: "All",
    value: "all",
  },
  { name: "Roald Dahl", value: "roald-dahl" },

  {
    name: "Dog Man",
    value: "dog-man",
  },
  { name: "The Bad Guys", value: "the-bad-guys" },
  { name: "Cat Kid", value: "cat-kid" },
  { name: "Storey Treehouse", value: "storey-treehouse" },
];

const QuizCategory = () => {
  const { dispatch } = useContext(QuizContext);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div className="mt-20 flex items-center justify-center flex-wrap">
        {quizCategories.map((item) => (
          <Link to={`/quizzes/`} key={item.name}>
            <button
              type="button"
              value={item.name}
              onClick={(e) => {
                handleClick(e);
              }}
              className="text-white bg-green hover:bg-white hover:text-blue border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default QuizCategory;
