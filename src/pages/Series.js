import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import SeriesList from "../components/Book/series/SeriesList";
import SeriesDetail from "../components/Book/series/SeriesDetail";
import BooksListContextProvider from "../components/Book/BookListContext";
import GenresList from "../components/Book/genres/GenresList";
import SearchBar from "../components/Book/Search/SearchBar";
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
