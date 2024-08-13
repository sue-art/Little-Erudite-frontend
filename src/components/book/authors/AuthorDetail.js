import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthorByName } from "../../admin/authors/AuthorFetchAPI";
import { getBooksByAuthor } from "../../admin/books/BookFetchAPI";

import Loader from "../../Loader";
import BookItem from "../BookItem";

const AuthorDetail = () => {
  const id = useParams().id;
  const [author, setAuthor] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthor = async (id) => {
    const formattedName = id
      .replace(/[-_.]|dr\b/gi, (match) => {
        if (match.toLowerCase() === "dr") {
          return "dr.";
        }
        return " ";
      })
      .toLowerCase();

    try {
      const data = await getAuthorByName(formattedName);
      setAuthor(data);
      const booksData = await getBooksByAuthor(formattedName);
      setBooks(booksData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAuthor(id);
  }, [loading, id]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mt-5">
      <h1 className="text-3xl mb-3">About Author</h1>
      <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl mt-1">{author.name}</h1>
          <div>{author.description}</div>
        </div>

        <div className="lg:col-span-2 200 lg:pr-8">
          {books.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {books.map((book) => (
                <BookItem key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
