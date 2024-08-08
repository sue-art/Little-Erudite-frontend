import React, { Fragment, useState, useEffect } from "react";
import Chatbot from "../../../ChatAI/Chatbot";
import { getBookSeriesList, editBookSeriesList } from "./FetchAPI";

//import { updateBook } from "../../../api/bookApi"; // Import the function to update book data
const BookSeriseList = () => {
  const [editBook, setEditBook] = useState(null);
  const [message, setMessage] = useState("");
  const [newBooks, setNewBooks] = useState(["_id", "name", "author", "image"]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    let responseData = await getBookSeriesList();
    setTimeout(() => {
      setNewBooks(responseData);
    }, 1000);
  };

  // Add a new book series
  const addBook = () => {
    editBookSeriesList(editBook._id, editBook)
      .then((data) => {
        setMessage("Book series updated successfully");
      })
      .catch((error) => console.log(error));

    /*
    addBookSeriesList(editBook)
      .then((data) => {
        setMessage("Book series added successfully");
        setNewBooks([...newBooks, data]);
      })
      .catch((error) => console.log(error));
      */
  };

  // Edit a book series
  const handleEditBook = (serise) => {
    setEditBook(serise);
  };

  // Delete a book series
  const deleteBook = (serise) => {
    // Your code to delete a book goes here
    // Example:
    // deleteExistingBook(book)
    //   .then((data) => {
    //     setBooks(books.filter((book) => book.id !== data.id));
    //   })
    //   .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newBooks.map((serise) => (
              <tr key={serise.id}>
                <td>{serise.name}</td>
                <td>{serise.author}</td>
                <td>
                  <img src={serise.image} alt={serise.name} width="150px" />
                </td>
                <td>
                  <button onClick={() => handleEditBook(serise)}>Edit</button>
                  <button onClick={() => deleteBook(serise)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div id="editBook">
          {editBook && (
            <div>
              <h2 className="">Edit Book Series</h2>

              <div>
                <label htmlFor="editName">ID:</label>
                <input
                  type="text"
                  id="editId"
                  value={editBook._id}
                  onChange={(e) =>
                    setEditBook({ ...editBook, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="editName">Name:</label>
                <input
                  type="text"
                  id="editName"
                  value={editBook.name}
                  onChange={(e) =>
                    setEditBook({ ...editBook, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="editAuthor">Author:</label>
                <input
                  type="text"
                  id="editAuthor"
                  value={editBook.author}
                  onChange={(e) =>
                    setEditBook({ ...editBook, author: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="editDescription">Description:</label>
                <input
                  type="text"
                  id="editDescription"
                  value={editBook.description}
                  onChange={(e) =>
                    setEditBook({ ...editBook, description: e.target.value })
                  }
                />
              </div>
              <p>
                Image:{" "}
                <img src={editBook.image} alt={editBook.name} width="150px" />
              </p>
              <button
                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={addBook}
              >
                Save
              </button>
              {message && <p>{message}</p>}
            </div>
          )}

          <Chatbot />
        </div>
      </div>
    </Fragment>
  );
};

export default BookSeriseList;
