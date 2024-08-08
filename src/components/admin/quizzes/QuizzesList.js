import React, { Fragment, useState } from "react";
import Pagination from "../../../layout/Pagination";
import { useQuiz } from "../../Quiz/QuizContextProvider";
import { deleteQuiz } from "./QuizzesFetchAPI";

const Quizzeslist = () => {
  const { state, dispatch } = useQuiz();
  const { quizzes } = state;
  const [message, setMessage] = useState("");
  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = quizzes.length;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastQuiz = currentPage * itemsPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - itemsPerPage;
  const currentQuizList = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const handleEditQuiz = (slug) => {
    console.log("slug", slug);
    dispatch({ type: "GET_QUIZ_BY_TITLE", payload: slug });
  };

  const handleDeleteQuiz = (id) => {
    const deletedQuiz = deleteQuiz(id);
    deletedQuiz.then((data) => {
      setMessage("Quiz Delted Successfully");
    });
    dispatch({ type: "DELETE_QUIZ", payload: id });
  };

  return (
    <Fragment>
      <div className="lg:col-span-1 lg:border-r lg:border-gray-200">
        {currentQuizList.map((quiz) => (
          <div
            key={quiz._id}
            className="flex justify-between items-center py-6 border-b"
          >
            <p>{message ? message : ""}</p>
            <div>
              <h2 className="text-lg font-semibold">{quiz.title}</h2>
              <p className="text-sm text-gray-500">{quiz.description}</p>
            </div>
            <div>
              <button
                className="bg-green hover:bg-pink text-white py-2 px-4 rounded"
                onClick={() => handleEditQuiz(quiz.slug)}
              >
                Edit
              </button>
              <button
                className="bg-red hover:bg-pink text-white py-2 px-4 rounded"
                onClick={() => handleDeleteQuiz(quiz._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />{" "}
      </div>
    </Fragment>
  );
};

export default Quizzeslist;
