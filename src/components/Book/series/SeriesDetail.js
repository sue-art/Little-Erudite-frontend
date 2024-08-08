import React, { Fragment, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { getAllBooks, getBooksBySeries } from "../../admin/books/BookFetchAPI";
import { getSeriesByName } from "../../admin/series/SeriesFetchAPI";
import { getAuthorByName } from "../../admin/authors/AuthorFetchAPI";
import { BookListContext } from "../BookListContext";
import BookItem from "../BookItem";
import { textToSpeech } from "../../Features/TextToSpeech";

import IconSpeaker from "../../Icons/IconSpeaker";
import Loader from "../../Loader";

const SeriesDetail = () => {
  const { data, dispatch } = useContext(BookListContext);
  const { books, filteredBooks, loading } = data;
  const [author, setAuthor] = useState([]);

  const [seriesItem, setSeriesItem] = useState({});
  const { search } = useLocation();

  const search_value = search.split("=")[1];

  const slugToTitle = (slug) => {
    // Check if slug is not a string
    if (typeof slug !== "string") {
      console.warn("slugToTitle was called with a non-string argument");
      return ""; // Return an empty string or handle as needed
    }

    return (
      slug
        // Replace hyphens with spaces
        .replace(/-/g, " ")
        // Split the string into words
        .split(" ")
        // Map through each word
        .map((word) => {
          // If the word is "Dr" add a dot
          if (word.toLowerCase() === "dr") {
            return "Dr.";
          }
          // Capitalize the first letter of each word
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ")
    );
  };

  const name = slugToTitle(search_value.toLowerCase());

  const fetchSeriesData = async (name) => {
    const seriesFetchData = await getSeriesByName(name);
    console.log("seriesFetchData", seriesFetchData);
    if (seriesFetchData) {
      setSeriesItem(seriesFetchData);
      fetchAuthorData(seriesFetchData.name);
    }
  };

  const fetchAllBooks = async () => {
    const booklist = await getAllBooks();
    dispatch({ type: "setBooks", payload: booklist });
  };

  const fetchBookData = async (name) => {
    const filteredlist = await getBooksBySeries(name); // Pass the name parameter
    dispatch({ type: "fetchBooksAndChangeState", payload: filteredlist });
    dispatch({ type: "loading", payload: false });
  };

  const fetchAuthorData = async (authorName) => {
    console.log("Am I here");
    const authorData = await getAuthorByName(authorName);
    if (authorData.error) console.log("Error fetching author data");
    setAuthor(authorData);
  };

  useEffect(() => {
    dispatch({ type: "loading", payload: true });
    if (name) {
      fetchSeriesData(name);
      fetchBookData(name);
    }
    if (books.length === 0) {
      fetchAllBooks();
    }
    console.log("author", name);
    window.scrollTo(0, 0);
  }, [name, books.length, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
          {seriesItem && (
            <div className="mt-6">
              <h1 className="text-3xl font-bold">{seriesItem.name}</h1>

              <img
                src={seriesItem.image}
                width="300px"
                alt={seriesItem.name}
                className=""
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div
                className="book-details__left-bg"
                style={{
                  backgroundImage: `url(${seriesItem.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              {/* Description and details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Authors</h2>
                <p>{seriesItem.author}</p>
                {author.description && <p>{author.description}</p>}
              </div>

              {seriesItem.description && (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2
                      className="text-sm font-medium text-gray-900"
                      style={{ marginRight: "1rem" }}
                    >
                      Description
                    </h2>
                    <button
                      className="bg-green rounded-full p-2"
                      onClick={() => textToSpeech(seriesItem.description)}
                      style={{ marginRight: "1rem" }}
                    >
                      <div className="w-6 text-white">
                        <IconSpeaker />
                      </div>
                    </button>
                  </div>
                  <p>{seriesItem.description}</p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="lg:col-span-2 200 lg:pr-8">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredBooks.map((book) => (
                <BookItem key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SeriesDetail;
