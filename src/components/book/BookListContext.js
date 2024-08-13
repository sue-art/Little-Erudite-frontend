import React, { createContext, useState, useReducer, useEffect } from "react";
import { booksSearch } from "../../service/GoogleBooksAPI";
import { getAllBooks } from "../admin/books/BookFetchAPI";
import { convertTitleToSlug } from "../Features/ConvertAPI";
export const initialState = {
  books: "",
  book: "",
  seriesItem: "",
  searchValue: "",
  filteredBooks: "",
  loading: true,
};

// Create the BookListContext
export const BookListContext = createContext(initialState);

// Reducer function to update the state based on actions
export const bookListReducer = (state, action) => {
  switch (action.type) {
    /* Get all books */
    case "fetchBooksAndChangeState":
      return {
        ...state,
        filteredBooks: action.payload,
      };
    case "fetchSeriesAndChangeState":
      return {
        ...state,
        seriesItem: action.payload,
      };
    case "setBooks":
      return {
        ...state,
        books: action.payload,
      };

    case "setSearchValue":
      return {
        ...state,
        searchValue: action.payload,
      };
    case "fetchBook":
      const fetchBook =
        state.books &&
        state.books.filter((item) => item.slug && item.slug === action.payload);
      return {
        ...state,
        book: fetchBook[0],
      };
    case "searchFiltered":
      const filteredBooks = state.books?.filter((item) => {
        const searchTerm = action.payload.toUpperCase();
        const regex = new RegExp(action.payload, "i"); // 'i' flag for case-insensitive

        if (item.title) {
          return item.title.toUpperCase().includes(searchTerm);
        }

        if (item.topics) {
          return item.topics.some((topic) => regex.test(topic));
        }

        return false;
      });

      return {
        ...state,
        filteredBooks: filteredBooks, // Use a separate property for filtered books
      };
    case "seriesFilterd":
      const seriesFilterdBooks =
        state.books &&
        state.books.filter((item) => {
          if (
            item.series &&
            item.series.toUpperCase().includes(action.payload.toUpperCase())
          ) {
            return item;
          }
          return null; // This line can be omitted, as filter expects a boolean.
        });

      return {
        ...state,
        filteredBooks: seriesFilterdBooks, // Use a separate property for filtered books
      };

    case "genresFilterd":
      const genresFilteredBooks =
        state.books &&
        state.books.filter((item) => {
          if (item.topics) {
            const regex = new RegExp(action.payload, "i"); // 'i' flag for case-insensitive
            return item.topics.some((topic) => regex.test(topic));
          }
          return false;
        });

      return {
        ...state,
        filteredBooks: genresFilteredBooks, // Use a separate property for filtered books
      };

    case "search":
      return {
        ...state,
        books: state.books.filter((item) =>
          item.volumeInfo.title
            .toUpperCase()
            .includes(action.payload.toUpperCase())
        ),
      };
    case "setMessage":
      return {
        ...state,
        message: action.payload,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
const BooksListContextProvider = ({ children }) => {
  const initialLocalState =
    JSON.parse(localStorage.getItem("BookListContext")) || initialState;
  const [data, dispatch] = useReducer(bookListReducer, initialLocalState);
  const { books, filteredBooks, book, seriesItem, loading } = data;
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const Book_List = await getAllBooks();
      const updatedBookList = Book_List.map((book) => ({
        ...book,
        slug: convertTitleToSlug(book.title),
      }));

      dispatch({ type: "setBooks", payload: updatedBookList });
    } catch (error) {
      console.error("Error fetching books:", error);
      setMessage("Error fetching books. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("BookListContext", JSON.stringify(data));
  }, [data]);

  // Fetch books based on parameters passed
  const getBooks = (parameter, filter, order, term) => {
    // Perform asynchronous fetch operation
    console.log("url", booksSearch(parameter, filter, order, term));

    fetch(booksSearch(parameter, filter, order, term))
      .then((res) => res.json())
      .then((data) => {
        // Update state based on fetch result
        if (data.error) {
          // Handle error cases
          setMessage("Can't get data");

          // Update state accordingly
        } else {
          // Update state with fetched data
          dispatch({ type: "loading", payload: true });
          dispatch({ type: "fetchBooksAndChangeState", payload: data.items });
          dispatch({ type: "loading", payload: false });
        }
      });
  };

  return (
    <BookListContext.Provider
      value={{
        data,
        books,
        book,
        filteredBooks,
        book,
        seriesItem,
        loading,
        dispatch,
        fetchData,
        message,
        setMessage,
      }}
    >
      {children}
    </BookListContext.Provider>
  );
};

export default BooksListContextProvider;
