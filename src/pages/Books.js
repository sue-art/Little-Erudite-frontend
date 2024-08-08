import React, { Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import GenresList from "../components/Book/genres/GenresList";
import SearchBar from "../components/Book/Search/SearchBar";
import BookList from "../components/Book/BookList";
import SeriesList from "../components/Book/series/SeriesList";
import BooksListContextProvider from "../components/Book/BookListContext";
import BookDetail from "../components/Book/BookDetail";
import SeriesDetail from "../components/Book/series/SeriesDetail";
import GenresGroup from "../components/Book/genres/GenresGroup";
import { QuizContextProvider } from "../components/Quiz/QuizContextProvider";

const Books = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const search_key = search.split("=")[0];
  const search_value = search.split("=")[1];

  return (
    <Fragment>
      <BooksListContextProvider>
        <QuizContextProvider>
          <div className="mt-10">
            <GenresList />
            <SearchBar />
            {search_key === "?series" ? (
              <SeriesDetail />
            ) : id ? (
              <BookDetail book_id={id} />
            ) : (
              <div>
                {!search_key ? (
                  <GenresGroup />
                ) : (
                  <BookList
                    search_key={search_key}
                    search_value={search_value}
                  />
                )}
              </div>
            )}
            <SeriesList carousel="true" />
          </div>
        </QuizContextProvider>
      </BooksListContextProvider>
    </Fragment>
  );
};

export default Books;
