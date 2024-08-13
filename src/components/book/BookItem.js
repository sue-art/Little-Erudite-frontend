import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBookById } from "../admin/books/BookFetchAPI";
import IconArrowRight from "../Icons/IconArrowRight";
import { convertTitleToSlug } from "../Features/ConvertAPI";

const BookItem = ({ book, id }) => {
  const [loading, setLoading] = useState(true);
  const [bookItem, setBookItem] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);

  const { _id, title, author, image, description } = book || bookItem;

  const fetchBookData = async () => {
    setLoading(true);
    const bookData = await getBookById(id);
    setBookItem(bookData);
    setLoading(false);
  };

  useEffect(() => {
    if (!book) fetchBookData();
    else setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const slug = convertTitleToSlug(title);

  return (
    <Fragment>
      <Link reloadDocument to={`/books/${slug}`}>
        <div className="max-w-sm rounded-sm p-3 flex flex-col items-center">
          <div className="relative flex flex-col items-center rounded-full">
            <img src={image} alt={title} className="book__bg-img rounded-lg" />

            <div className="absolute bottom-0 right-2 justify-center mb-3">
              <button className="bg-red text-white font-bold py-2 px-3 rounded-full hover:bg-pink transition duration-300">
                <div className="w-5 py-1  pr-1">
                  <IconArrowRight />
                </div>
              </button>
            </div>
          </div>
          <h2 className="py-3 text-sm text-bold">{title}</h2>
        </div>
      </Link>
    </Fragment>
  );
};

export default BookItem;
