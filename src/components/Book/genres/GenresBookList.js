import React, { Fragment, useEffect, useState } from "react";
import { getBooksByGenre } from "../../admin/books/BookFetchAPI";
import Loader from "../../Loader";
import { Link } from "react-router-dom";

const GenresBookList = ({ name }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const FetchData = async (name) => {
    try {
      const data = await getBooksByGenre(name);
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    FetchData(name);
  }, [name]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <div className="object-cover rounded-lg overflow-hidden">
        <div className="p-3 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-1">
          {books.length > 0 &&
            books.slice(0, 6).map((book, index) => (
              <div key={book.id || index} className="flex items-center">
                <Link to={`/books/${convertToSlug(book.title)}`}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-13 object-cover rounded-lg"
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default GenresBookList;
