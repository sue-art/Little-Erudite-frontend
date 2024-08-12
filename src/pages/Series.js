import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import SeriesList from "../components/book/series/SeriesList";
import SeriesDetail from "../components/book/series/SeriesDetail";
import BooksListContextProvider from "../components/book/BookListContext";
import GenresList from "../components/book/genres/GenresList";
import SearchBar from "../components/book/Search/SearchBar";
const Series = () => {
  const { id } = useParams();

  return (
    <Fragment>
      <BooksListContextProvider>
        <GenresList />
        <SearchBar />
        {id && <SeriesDetail />}
        <SeriesList carousel={true} />
      </BooksListContextProvider>
    </Fragment>
  );
};

export default Series;
