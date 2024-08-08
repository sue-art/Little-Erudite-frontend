import React, { createContext, useReducer } from "react";

// Define the initial state
const initialState = {
  books: [],
  editBook: {
    _id: 123,
    title: "",
    author: [],
    series: "",
    ages: "",
    pages: "",
    lexile: "",
    description: "",
    audioscript: "",
    booktalks: [],
    roadmaplist: [],
    topics: [],
    characterlist: [],
    keywordlist: [],
    image: "",
    relatedbooks: [],
    amazon: { price: "", link: "" },
    booktopia: { price: "", link: "" },
  },

  newBook: [],
  newAuthor: [],
  booktalks: [],
  suggestedInformation: [],
  message: "",
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "EDIT_BOOK":
      return {
        ...state,
        editBook: action.payload,
      };
    case "RESET_EDIT_BOOK":
      return {
        ...state,
        editBook: initialState.editBook,
      };
    case "SET_ID":
      console.log("action.payload", action.payload);
      return {
        ...state,
        editBook: { ...state.editBook, _id: action.payload },
      };
    case "ADD_NEW_BOOK":
      return {
        ...state,
        newBook: [...state.newBook, action.payload],
      };
    case "SET_NEW_AUTHOR":
      return {
        ...state,
        newAuthor: [...state.newAuthor, action.payload],
      };

    case "SET_TITLE":
      return {
        ...state,
        editBook: { ...state.editBook, title: action.payload },
      };
    case "SET_AUTHOR":
      return {
        ...state,
        editBook: { ...state.editBook, author: action.payload },
      };
    case "UPDATE_SERIES":
      return {
        ...state,
        editBook: { ...state.editBook, series: action.payload },
      };
    case "UPDATE_AGES":
      return {
        ...state,
        editBook: { ...state.editBook, ages: action.payload },
      };
    case "SET_IMAGE":
      return {
        ...state,
        editBook: { ...state.editBook, image: action.payload },
      };
    case "UPDATE_BOOKTALKS":
      return {
        ...state,
        editBook: { ...state.editBook, booktalks: action.payload },
      };
    case "UPDATE_KEYWORDLIST":
      return {
        ...state,
        editBook: { ...state.editBook, keywordlist: action.payload },
      };
    case "UPDATE_CHARACTERLIST":
      return {
        ...state,
        editBook: { ...state.editBook, characterlist: action.payload },
      };
    case "ADD_BOOKTALKS":
      return {
        ...state,
        booktalks: action.payload,
      };
    case "ADD_RELATED_BOOKS":
      return {
        ...state,
        editBook: { ...state.editBook, relatedbooks: action.payload },
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

// Create the context
export const AdminBookContext = createContext();

// Create the context provider component
const AdminBookContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminBookContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminBookContext.Provider>
  );
};

export default AdminBookContextProvider;
