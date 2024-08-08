import React, { useEffect, useState } from "react";
import { getBookList, deleteBook } from "./FetchAPI";
import Modal from "../Modal";

const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [showModal, setShowModal] = useState(false); // Add state for showing/hiding the modal

  const fetchBookList = async () => {
    let responseData = await getBookList();
    setTimeout(() => {
      setBookList(responseData);
    }, 1000);
  };

  const handleEditBook = (book) => {
    setEditBook(book);
    setShowModal(true); // Show the modal when editing a book
  };

  const handleDeleteBook = (book) => {
    deleteBook(book._id)
      .then(() => {
        const updatedBooks = bookList.filter((b) => b.id !== book.id);
        setBookList(updatedBooks);
      })
      .catch((error) => console.log(error));
  };

  const handleModalClose = () => {
    setShowModal(false); // Hide the modal when closing
  };

  useEffect(() => {
    // Fetch book list data from the server
    fetchBookList();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <img src={book.image} alt={book.name} width="150px" />
              </td>
              <td>
                <button onClick={() => handleEditBook(book)}>Edit</button>
                <button onClick={() => handleDeleteBook(book)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && ( // Render the modal component when showModal is true
        <Modal onClose={handleModalClose}>
          <h2>Edit Book</h2>
          <form>
            <label>
              Title:
              <input type="text" value={editBook.title} />
            </label>
            <label>
              Author:
              <input type="text" value={editBook.author} />
            </label>
            <label>
              Description:
              <input type="text" value={editBook.description} />
            </label>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default BookList;
