import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import QuizCategory from "../components/Quiz/QuizCategory";
import QuizList from "../components/Quiz/QuizList";
import { QuizContextProvider } from "../components/Quiz/QuizContextProvider";
import QuizDetail from "../components/Quiz/QuizDetail";
import QuizSearch from "../components/Quiz/QuizSearch";

export default function Quiz() {
  const { id } = useParams();

  function convertToSearchTerm(slug) {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <Fragment>
      <QuizContextProvider>
        <QuizCategory />
        <QuizSearch />
        {id ? (
          <div className="mb-10">
            <QuizDetail quizTitle={convertToSearchTerm(id)} />
          </div>
        ) : (
          <QuizList />
        )}
      </QuizContextProvider>
    </Fragment>
  );
}
