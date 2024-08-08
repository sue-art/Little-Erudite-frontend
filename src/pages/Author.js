import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import BooksListContextProvider from "../components/Book/BookListContext";
import GenresList from "../components/Book/genres/GenresList";
import SearchBar from "../components/Book/Search/SearchBar";
import AuthorDetail from "../components/Book/authors/AuthorDetail";
import SeriesList from "../components/Book/series/SeriesList";

const Author = () => {
  const { id } = useParams();

  return (
    <Fragment>
      <BooksListContextProvider>
        <div className="mt-20">
          <GenresList />
          <SearchBar />
          {id && <AuthorDetail />}
          <SeriesList carousel="true" />
        </div>
      </BooksListContextProvider>
    </Fragment>
  );
};

export default Author;
