import React, { Fragment, useState, useEffect } from "react";
import AdminBookListContextProvider from "./AdminBookListContextProvider";
import BookSeriseList from "./BookSeriseList";
import BookList from "./BookList";
const Booksdashboard = () => {
  useEffect(() => {
    // Your code to fetch bookserises goes here
    // Example:
    // fetchBookserises()
    //   .then((data) => setBookserises(data))
    //   .catch((error) => console.log(error));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "" });
  const [editBook, setEditBook] = useState(null);

  // Fetch books from API or database
  useEffect(() => {
    // Your code to fetch books goes here
    // Example:
    // fetchBooks()
    //   .then((data) => setBooks(data))
    //   .catch((error) => console.log(error));
  }, []);

  // Add a new book
  const addBook = () => {
    // Your code to add a new book goes here
    // Example:
    // addNewBook(newBook)
    //   .then((data) => {
    //     setBooks([...books, data]);
    //     setNewBook({ title: '', author: '', genre: '' });
    //   })
    //   .catch((error) => console.log(error));
  };

  // Edit a book
  /*
  const editBook = (book) => {
    // Your code to edit a book goes here
    // Example:
    // setEditBook(book);
  };
  */

  // Update a book
  const updateBook = () => {
    // Your code to update a book goes here
    // Example:
    // updateExistingBook(editBook)
    //   .then((data) => {
    //     const updatedBooks = books.map((book) =>
    //       book.id === data.id ? data : book
    //     );
    //     setBooks(updatedBooks);
    //     setEditBook(null);
    //   })
    //   .catch((error) => console.log(error));
  };

  // Search books
  const searchBooks = () => {
    // Your code to search books goes here
    // Example:
    // searchBooksByTerm(searchTerm)
    //   .then((data) => setBooks(data))
    //   .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <AdminBookListContextProvider>
        {" "}
        <h1>Admin Book List</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books"
        />
        <button onClick={searchBooks}>Search</button>
        <BookSeriseList />
        <h2>Add Book</h2>
        <input
          type="text"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          placeholder="Author"
        />
        <input
          type="text"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          placeholder="Genre"
        />
        <button onClick={addBook}>Add</button>
        {editBook && (
          <>
            <h2>Edit Book</h2>
            <input
              type="text"
              value={editBook.title}
              onChange={(e) =>
                setEditBook({ ...editBook, title: e.target.value })
              }
              placeholder="Title"
            />
            <input
              type="text"
              value={editBook.author}
              onChange={(e) =>
                setEditBook({ ...editBook, author: e.target.value })
              }
              placeholder="Author"
            />
            <input
              type="text"
              value={editBook.genre}
              onChange={(e) =>
                setEditBook({ ...editBook, genre: e.target.value })
              }
              placeholder="Genre"
            />
            <button onClick={updateBook}>Update</button>
          </>
        )}
        <BookList />
      </AdminBookListContextProvider>
    </Fragment>
  );
};

export default Booksdashboard;
