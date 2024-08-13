import React, { Fragment, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { QuizContext } from "./QuizContextProvider";

const QuizSearch = () => {
  const { dispatch } = useContext(QuizContext);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    dispatch({ type: "QuizCategoryFiltered", payload: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (searchValue !== "") {
        Navigate("/quizzes");
      }

      dispatch({ type: "SET_SEARCH_QUERY", payload: searchValue });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SEARCH_QUERY", payload: searchValue });
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center py-2 flex-wrap">
        <form autoComplete="off">
          <input
            className="text-blue-700 border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            label="Search for a book"
            id="q_book"
            placeholder="Search..."
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={(e) => handleChange(e)}
            margin="normal"
            value={searchValue}
          />
          <button
            variant="contained"
            value="book_list"
            className="text-blue-700 hover:text-white hover:bg-green border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            color="primary"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Search
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default QuizSearch;
