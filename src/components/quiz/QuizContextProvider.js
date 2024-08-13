import React, { useEffect, createContext, useReducer, useContext } from "react";
import { getAllQuizzes } from "../admin/quizzes/QuizzesFetchAPI";
import { convertTitleToSlug } from "../Features/ConvertAPI";

// Initial state of the quiz context
const initialState = {
  quizzes: [],
  quiz: "",
  newQuizzes: [],
  loading: true,
  searchQuery: "",
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUIZZES":
      return {
        ...state,
        quizzes: action.payload,
      };

    case "SET_NEW_QUIZZES":
      return {
        ...state,
        newQuizzes: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "GET_QUIZ_BY_TITLE":
      const quizData = state.quizzes.filter((item) =>
        item.slug.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        quiz: quizData[0],
      };

    case "CLEAR_QUIZ":
      return {
        ...state,
        quizzes: [],
        newQuizzes: [],
      };

    case "UPDATE_QUIZ":
      return {
        ...state,
        quiz: action.payload,
        newQuizzes: state.newQuizzes.map((q) =>
          q._id === action.payload._id ? action.payload : q
        ),
      };

    case "DELETE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.filter((quiz) => quiz._id !== action.payload),
        newQuizzes: state.newQuizzes.filter(
          (quiz) => quiz._id !== action.payload
        ),
      };

    case "SET_SEARCH_QUERY":
      if (action.payload === "All") {
        return {
          ...state,
          searchQuery: action.payload,
          newQuizzes: state.quizzes,
        };
      } else {
        const newQuizzes = state.quizzes.filter((quiz) =>
          quiz.title.toLowerCase().includes(action.payload.toLowerCase())
        );

        return {
          ...state,
          newQuizzes: newQuizzes,
        };
      }

    default:
      return state;
  }
};

// Create context
export const QuizContext = createContext(initialState);

// Context provider
export const QuizContextProvider = ({ children }) => {
  const initialLocalState =
    JSON.parse(localStorage.getItem("QuizContext")) || initialState;
  const [state, dispatch] = useReducer(quizReducer, initialLocalState);

  const fetchQuizzesData = async () => {
    //clenaState();
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await getAllQuizzes();
      const updateQuizList = data.map((quiz) => ({
        ...quiz,
        slug: convertTitleToSlug(quiz.title),
      }));

      dispatch({ type: "SET_QUIZZES", payload: updateQuizList });
      dispatch({ type: "SET_NEW_QUIZZES", payload: updateQuizList });
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const clenaState = () => {
    dispatch({ type: "CLEAR_QUIZ" });
  };

  useEffect(() => {
    // clenaState();
    fetchQuizzesData();
    if (state.quizzes.length === 0 || state.quizzes === undefined) {
      //fetchQuizzesData();
    }
  }, []);

  useEffect(() => {
    // localStorage.clear();
    localStorage.setItem("QuizContext", JSON.stringify(state));
  }, [state]);

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
