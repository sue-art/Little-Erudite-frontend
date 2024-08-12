import React, { Fragment } from "react";
import SeriesList from "../components/book/series/SeriesList";
import GenresList from "../components/book/genres/GenresList";
import QuizList from "../components/quiz/QuizList";
import { QuizContextProvider } from "../components/quiz/QuizContextProvider";
import BookList from "../components/book/BookList";
import BooksListContextProvider from "../components/book/BookListContext";
import AuthorList from "../components/book/authors/AuthorList";
import ReadingRoadmapList from "../components/roadmap/ReadingRoadmapList";
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
