import React, { Fragment } from "react";
import SeriesList from "../components/Book/series/SeriesList";
import GenresList from "../components/Book/genres/GenresList";
import QuizList from "../components/Quiz/QuizList";
import { QuizContextProvider } from "../components/Quiz/QuizContextProvider";
import BookList from "../components/Book/BookList";
import BooksListContextProvider from "../components/Book/BookListContext";
import AuthorList from "../components/Book/authors/AuthorList";
import ReadingRoadmapList from "../components/Roadmap/ReadingRoadmapList";
import Features from "../layout/Features";

function Home() {
  return (
    <Fragment>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <h2 className="text-2xl font-bold">Reading Roadmap</h2>
        <ReadingRoadmapList />
        <h2 className="text-2xl font-bold">Our Service</h2>

        <Features />

        <h2 className="text-2xl font-bold">
          Children's Books That Will Inspire the World
        </h2>
        <BooksListContextProvider>
          <BookList parameter={"home"} />
          <h2 className="text-2xl font-bold">By Categories</h2>
          <GenresList />

          <SeriesList carousel="true" />

          <h2 className="text-2xl font-bold">By Author</h2>
          <AuthorList />
        </BooksListContextProvider>

        <QuizContextProvider>
          <QuizList home={"home"} />
        </QuizContextProvider>
      </div>
    </Fragment>
  );
}

export default Home;
