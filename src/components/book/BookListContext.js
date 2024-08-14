import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { booksSearch } from "../../service/GoogleBooksAPI";
import { getAllBooks } from "../admin/books/BookFetchAPI";
import { convertTitleToSlug } from "../Features/ConvertAPI";

// Lazy load components
const ErrorBoundary = lazy(() => import("../ErrorBoundary"));

export const initialState = {
  books: "",
  book: "",
  seriesItem: "",
  searchValue: "",
  filteredBooks: "",
  loading: true,
};

export const BookListContext = createContext(initialState);

export const bookListReducer = (state, action) => {
  switch (action.type) {
    case "fetchBooksAndChangeState":
      return { ...state, filteredBooks: action.payload };
    case "fetchSeriesAndChangeState":
      return { ...state, seriesItem: action.payload };
    case "setBooks":
      return { ...state, books: action.payload };
    case "setSearchValue":
      return { ...state, searchValue: action.payload };
    case "fetchBook":
      const fetchBook =
        state.books && state.books.find((item) => item.slug === action.payload);
      return { ...state, book: fetchBook };
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

    case "setMessage":
      return { ...state, message: action.payload };
    case "loading":
      return { ...state, loading: action.payload };
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
      dispatch({ type: "fetchBooksAndChangeState", payload: updatedBookList });
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

  const getBooks = useMemo(
    () => (parameter, filter, order, term) => {
      fetch(booksSearch(parameter, filter, order, term))
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage("Can't get data");
          } else {
            dispatch({ type: "loading", payload: true });
            dispatch({ type: "fetchBooksAndChangeState", payload: data.items });
            dispatch({ type: "loading", payload: false });
          }
        });
    },
    []
  );

  const memoizedSearchFilter = useMemo(() => {
    return (searchTerm) => {
      const filteredBooks = books?.filter((item) => {
        const regex = new RegExp(searchTerm, "i");
        return (
          (item.title && regex.test(item.title)) ||
          (item.topics && item.topics.some((topic) => regex.test(topic)))
        );
      });
      dispatch({ type: "searchFiltered", payload: filteredBooks });
    };
  }, [books]);

  const memoizedSeriesFilter = useMemo(() => {
    return (series) => {
      const seriesFilteredBooks = books?.filter(
        (item) =>
          item.series &&
          item.series.toUpperCase().includes(series.toUpperCase())
      );
      dispatch({ type: "seriesFiltered", payload: seriesFilteredBooks });
    };
  }, [books]);

  const memoizedGenresFilter = useMemo(() => {
    return (genre) => {
      const genresFilteredBooks = books?.filter(
        (item) =>
          item.topics &&
          item.topics.some((topic) => new RegExp(genre, "i").test(topic))
      );
      dispatch({ type: "genresFiltered", payload: genresFilteredBooks });
    };
  }, [books]);

  const contextValue = useMemo(
    () => ({
      data,
      books,
      book,
      filteredBooks,
      seriesItem,
      loading,
      dispatch,
      fetchData,
      message,
      setMessage,
      getBooks,
      memoizedSearchFilter,
      memoizedSeriesFilter,
      memoizedGenresFilter,
    }),
    [
      data,
      books,
      book,
      filteredBooks,
      seriesItem,
      loading,
      message,
      getBooks,
      memoizedSearchFilter,
      memoizedSeriesFilter,
      memoizedGenresFilter,
    ]
  );

  return (
    <BookListContext.Provider value={contextValue}>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    </BookListContext.Provider>
  );
};

export default BooksListContextProvider;
