import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useQuiz } from "./QuizContextProvider";
import Loading from "../Loader";

const QuizDetail = () => {
  const { state, dispatch } = useQuiz();
  const { quiz } = state;
  const [loading, setLoading] = useState(true);
  const id = useParams().id;

  // Get the current location
  const location = useLocation();
  const path = location.pathname;
  const isBookpage = path.includes("books");

  // Define state with the quiz
  const [score, setScore] = useState(0);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [totalNumber, setTotalNumber] = useState(10);
  const [isToggled, setIsToggled] = useState(false);

  const onOptionClick = (option) => {
    setIsToggled(!isToggled);
    setSelectedOption(option);
    setSelectedAnswer(option);
  };

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setIsSubmitted(false);
      setTimeLeft(30);
    } else {
      setIsQuizEnd(true);
    }
  }, [currentQuestionIndex, quiz]);

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    if (selectedAnswer === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(nextQuestion, 3000);
  }, [nextQuestion, selectedAnswer, currentQuestion]);

  const fetchQuizsData = useCallback(
    (id) => {
      dispatch({ type: "GET_QUIZ_BY_TITLE", payload: id });
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    fetchQuizsData(id);
  }, [fetchQuizsData, id]);

  useEffect(() => {
    if (quiz && quiz.questions.length > 0) {
      setCurrentQuestion(quiz.questions[currentQuestionIndex]);
      setTotalNumber(quiz.questions.length);
    }
  }, [id, quiz, currentQuestionIndex]);

  // Effect on when isSubmitted changes
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, handleSubmit]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Fragment>
      <div className="mx-auto max-w-1xl py-2 lg:max-w-1xl">
        <div className="relative w-full mx-auto max-w-2xl max-h-full">
          {quiz && (
            <>
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p>{quiz.description}</p>
            </>
          )}
          {quiz && !isBookpage && (
            <img src={quiz.image} alt={quiz.title} className="mt-2 w-auto" />
          )}
          <div className="my-5 bg-green rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none p-5">
            <p>
              Question {currentQuestionIndex + 1} out of {totalNumber}
            </p>
            {quiz && (
              <div className="mt-4 space-y-4">
                <p className="text-lg font-medium">
                  {currentQuestion
                    ? currentQuestion.question
                    : "No question available  "}
                </p>
                <div className="space-y-4">
                  {quiz &&
                    currentQuestion &&
                    currentQuestion.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <button
                          type="button"
                          className={`${
                            selectedOption === option ? "bg-yellow" : ""
                          } w-full h-full flex flex-wrap items-center text-base rounded-lg bg-gray-50 hover:bg-yellow p-2`}
                          onClick={() => onOptionClick(option)} // Call onOptionChange when the button is clicked
                        >
                          <input
                            type="radio"
                            id={option}
                            name="quiz-answer"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => setSelectedAnswer(option)}
                            disabled={isSubmitted}
                            className={`form-check-input p-3 ${
                              selectedOption === option ? "w-6 h-6" : "w-4 h-4"
                            }`}
                          />
                          <label
                            htmlFor={option}
                            className={`text-sm font-medium ml-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                              isSubmitted && option === currentQuestion.answer
                                ? "text-green-600 font-bold"
                                : ""
                            }`}
                          >
                            {option}
                          </label>
                          {isSubmitted && option === currentQuestion.answer && (
                            <p>- correct</p>
                          )}
                          {isSubmitted &&
                            selectedAnswer === option &&
                            option !== currentQuestion.answer && <p>- worng</p>}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="w-full flex justify-end relative">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!selectedAnswer || isSubmitted}
                className="mb-10 text-green border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full font-medium px-5 py-2.5 text-center me-3 mb-3"
              >
                {isSubmitted ? "Submitted" : "Submit"}
              </button>
            </div>
            <div className="flex w-full h-10">
              {isSubmitted &&
                (selectedAnswer === currentQuestion.answer ? (
                  <p className="bg-green text-white h-10 p-2 rounded-md">
                    Correct! Well done!
                  </p>
                ) : (
                  <p className="bg-red text-white h-10 p-2 rounded-md">
                    Incorrect. The correct answer is
                    {currentQuestion.options.find(
                      (a) => a === currentQuestion.answer
                    ).text || currentQuestion.answer}
                  </p>
                ))}
            </div>
            <p className="mt-5 ">
              Question {currentQuestionIndex + 1} of {totalNumber} | Your Score:{" "}
              {score}
            </p>

            {isQuizEnd && (
              <div>
                <h2 className="text-3xl my-5">
                  Your total score is {score} out of {totalNumber}
                </h2>

                <Link
                  to={`/quizzes/${id}`}
                  className=" mb-10 mt-0 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setCurrentQuestionIndex(0)}
                >
                  Try again
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
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default QuizDetail;
