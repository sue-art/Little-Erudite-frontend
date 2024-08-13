import React, { Fragment, useState, useEffect, useContext } from "react";
import Card from "../Cards/Card";
import Loader from "../Loader";
import { fetchBooks } from "../../service/GoogleBooksAPI";
import { BookListContext } from "./BookListContext";
import BookItem from "./BookItem";
import book_list from "../initialBooks_v1";
import SearchBar from "./Search/SearchBar";
import BookListSlider from "./BookListSlider";

const BookSearch = ({}) => {
  const { state, dispatch } = useContext(BookListContext);
  const { books, loading, message } = state; // Access books and loading from the state

  const [parameter, setParameter] = useState("all");

  const BookSliderList = [
    { id: 1, name: "Tree Houses", value: "tree hourse" },
    { ie: 2, name: "Dog Man", value: "Dog man" }, // Corrected typo in value
    { id: 3, name: "Bad Guys", value: "badguys" },
    { id: 4, name: "Magic Tree House", value: "Music" },
    { id: 5, name: "That is not my thing", value: "General" },
  ];

  useEffect(() => {
    setTimeout(() => {
      if (books) {
        dispatch({ type: "loading", payload: false });
      }
    }, 500);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Fragment>
        <SearchBar />
        <div>{message}</div>
        <div className="">
          {books.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {books.map((book) => (
                <BookItem book={book} key={book.id} color="secondary" />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-2 flex-wrap">
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Books not found
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Sorry, we couldn’t find the books you’re looking for.
              </p>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
};

export default BookSearch;
