import React, { Fragment, useState, useContext, useEffect } from "react";
import { AdminBookContext } from "./AdminBookContextProvider";
import { getAllBooks, deleteBook } from "./BookFetchAPI";

const BookList = () => {
  const { state, dispatch } = useContext(AdminBookContext);
  const { books, editBook, message, loading } = state;

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(pageSize);

  const totalPages = Math.ceil(books.length / pageSize);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleEditBook = (book) => {
    dispatch({ type: "RESET_EDIT_BOOK" });
    dispatch({ type: "EDIT_BOOK", payload: book });
    dispatch({ type: "SET_LOADING", payload: false });
  };
  const handleDeleteBook = async (book) => {
    const result = await deleteBook(book._id);
    if (result === "success") {
      dispatch({ type: "DELETE_BOOK", payload: book });
      dispatch({ type: "SET_MESSAGE", payload: "Book deleted successfully" });
    }
    dispatch({ type: "DELETE_BOOK", payload: book });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBooks();
        dispatch({ type: "SET_BOOKS", payload: data });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [loading, editBook, dispatch]);

  if (loading) return <div>Loading...</div>;
  return (
    <Fragment>
      <div className="lg:col-span-1 lg:border-r lg:border-gray-200">
        <h1>Book List</h1>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`bg-blue hover:bg-red text-white font-bold py-2 px-4 rounded-full ${
              currentPage === pageNumber ? "bg-red" : ""
            }`}
            onClick={() => {
              setCurrentPage(pageNumber);
              setStartIndex((pageNumber - 1) * pageSize);
              setEndIndex(pageNumber * pageSize);
            }}
          >
            {pageNumber}
          </button>
        ))}
        <table>
          <thead>
            <tr>
              <th>Book Cover</th>

              <th>Title/Author</th>
              <th>Actions</th>
              {/* Add more table headers for additional book details */}
            </tr>
          </thead>
          <tbody>
            {books.slice(startIndex, endIndex).map((book) => (
              <tr key={book.id}>
                <td>
                  <img src={book.image} alt={book.name} width="150px" />
                </td>
                <td>
                  <h2>title</h2>
                  <p>{book.title}</p>
                  <h2>Author</h2>
                  <p>{book.author}</p>
                </td>

                <td>
                  <button
                    className="bg-green hover:bg-pink text-white py-2 px-4 rounded"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red hover:bg-pink text-white py-2 px-4 rounded"
                    onClick={() => handleDeleteBook(book)}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message}
      </div>
    </Fragment>
  );
};

export default BookList;
