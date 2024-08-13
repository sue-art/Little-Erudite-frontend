import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuiz } from "./QuizContextProvider";
import QuizItem from "./QuizItem";
import Pagination from "../../layout/Pagination";
import Loader from "../Loader";

const QuizList = () => {
  const { state, dispatch } = useQuiz();
  const { newQuizzes, loading } = state;

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  //Pagination function
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalItems = newQuizzes.length;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastQuiz = currentPage * itemsPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - itemsPerPage;
  const currentQuizzes = newQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const convertToSlug = (title) => {
    if (!title) return "";
    return title
      .toLowerCase()
      .split(" ")
      .map((word) => word.replace(/[^a-z0-9]/g, ""))
      .filter((word) => word.length > 0)
      .join("-");
  };

  useEffect(() => {
    if (!newQuizzes) {
      dispatch({ type: "SET_LOADING", payload: true });
    }
  }, [loading, dispatch, newQuizzes]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Fragment>
        <h2 className="text-2xl font-bold my-5 ">Book Quizzes</h2>
        {isHomePage ? (
          <div className="mb-20 flex items-stretch justify-center flex-wrap">
            <div className="carousel rounded-box">
              {newQuizzes &&
                newQuizzes.map((quiz, index) => (
                  <div className="carousel-item mr-5 space-x-6" key={quiz._id}>
                    <QuizItem
                      quiz={quiz}
                      link={convertToSlug(quiz.title)}
                      key={quiz.id}
                      index={index}
                    />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {currentQuizzes &&
                currentQuizzes.map((quiz, index) => (
                  <div className="quiz-item" key={quiz._id}>
                    <QuizItem
                      quiz={quiz}
                      link={convertToSlug(quiz.title)}
                      key={quiz.id}
                      index={index}
                    />
                  </div>
                ))}
            </div>
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Fragment>
    );
  }
};

export default QuizList;
