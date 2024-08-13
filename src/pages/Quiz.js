import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { QuizContextProvider } from "../components/quiz/QuizContextProvider";
import QuizList from "../components/quiz/QuizList";
import QuizCategory from "../components/quiz/QuizCategory";
import QuizDetail from "../components/quiz/QuizDetail";
import QuizSearch from "../components/quiz/QuizSearch";

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
