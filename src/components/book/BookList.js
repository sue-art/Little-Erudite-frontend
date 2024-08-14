import React, { Fragment, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Loader";
import { BookListContext } from "./BookListContext";
import BookFlipItem from "./BookFlipItem";
import BookItem from "./BookItem";
import Pagination from "../../layout/Pagination";

const BookList = ({ parameter }) => {
  const { data, dispatch } = useContext(BookListContext);
  const { books, filteredBooks, fetchData, loading } = data;

  /* Check page type */
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topics = searchParams.get("topics");
  const search = searchParams.get("search");
  const series = searchParams.get("series");

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;
  const totalItems = filteredBooks.length;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastQuiz = currentPage * itemsPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - itemsPerPage;
  const currentBookList = filteredBooks.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );

  const fetchSeachData = async (search) => {
    if (books.length === 0) {
      fetchData();
    }
    dispatch({ type: "setSearchValue", payload: search });
    dispatch({ type: "searchFiltered", payload: search });
  };

  const fetchGenreData = async (name) => {
    if (books.length === 0) {
      fetchData();
    }
    if (name === "all") {
      dispatch({ type: "fetchBooksAndChangeState", payload: books });
    } else {
      dispatch({ type: "genresFilterd", payload: name });
    }
  };

  useEffect(() => {
    if (search) {
      fetchSeachData(search);
    }
    if (topics) {
      fetchGenreData(topics);
    }
    dispatch({ type: "setLoading", payload: false });
  }, [topics, search, series, loading]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Fragment>
        {parameter === "home" ? (
          <div className="grid mt-5 mb-12 grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-8">
            {books &&
              books.slice(0, 16).map((book) => (
                <div key={book._id} className="flex justify-center">
                  <BookFlipItem book={book} />
                </div>
              ))}
          </div>
        ) : (
          <Fragment>
            {search && (
              <h2 className="text-2xl mt-10 font-bold tracking-tight text-gray-900">
                Search results for {search}
              </h2>
            )}
            {topics && (
              <h2 className="text-2xl mt-10 font-bold tracking-tight text-gray-900">
                Books on {topics}
              </h2>
            )}
            <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7 xl:gap-x-8">
              {currentBookList &&
                currentBookList.map((book) => (
                  <BookItem book={book} key={book._id}></BookItem>
                ))}
            </div>
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
};

export default BookList;
