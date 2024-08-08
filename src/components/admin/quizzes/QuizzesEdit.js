import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useQuiz } from "../../Quiz/QuizContextProvider";
import { updateQuiz } from "./QuizzesFetchAPI";

const QuizzesEdit = () => {
  const { state, dispatch } = useQuiz();
  const { quiz } = state;

  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [message, setMessage] = useState("");

  const handleOnSumit = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_QUIZ", payload: currentQuiz });
    setCurrentQuiz(currentQuiz);
    const updatedQuiz = updateQuiz(currentQuiz);
    updatedQuiz.then((data) => {
      setMessage("Quiz Updated Successfully");
    });
  };

  const fetchQuiz = useCallback(() => {
    setCurrentQuiz(quiz);
  }, [quiz]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  return (
    <Fragment>
      <div className="lg:col-span-1 lg:border-r lg:border-gray-200">
        <h1>Edit</h1>

        {currentQuiz && currentQuiz.title ? (
          <>
            <form onSubmit={handleOnSumit}>
              <h2 className="text-lg font-semibold">{currentQuiz.title}</h2>
              <p className="text-sm text-gray-500">{currentQuiz.description}</p>

              <div class="mb-6">
                <img
                  src={currentQuiz.image}
                  alt={currentQuiz.name}
                  width="150px"
                />
                <label
                  for="editImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="text"
                  id="editImage"
                  class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={currentQuiz.image}
                  onChange={(e) => {
                    setCurrentQuiz({ ...currentQuiz, image: e.target.value });
                  }}
                />
              </div>
              <button className="bg-green hover:bg-pink text-white py-2 px-4 rounded">
                Update
              </button>
            </form>
            <div>
              <p>{message ? message : ""} </p>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-lg font-semibold">No Quiz Selected</h2>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default QuizzesEdit;
