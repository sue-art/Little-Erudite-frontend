import React, { Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import GenresList from "../components/book/genres/GenresList";
import SearchBar from "../components/book/Search/SearchBar";
import BookList from "../components/book/BookList";
import SeriesList from "../components/book/series/SeriesList";
import BooksListContextProvider from "../components/book/BookListContext";
import BookDetail from "../components/book/BookDetail";
import SeriesDetail from "../components/book/series/SeriesDetail";
import GenresGroup from "../components/book/genres/GenresGroup";
import { QuizContextProvider } from "../components/quiz/QuizContextProvider";

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
