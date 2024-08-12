import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import BooksListContextProvider from "../components/book/BookListContext";
import GenresList from "../components/book/genres/GenresList";
import SearchBar from "../components/book/Search/SearchBar";
import AuthorDetail from "../components/book/authors/AuthorDetail";
import SeriesList from "../components/book/series/SeriesList";

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
