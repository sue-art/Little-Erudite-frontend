import React, { useState } from "react";
import { booksSearch } from "../../../../service/GoogleBooksAPI";

import { addNewBook } from "./FetchAPI";

const GoogleBookSearch = ({ parameter, filter, order }) => {
  const [searchValue, setSearchValue] = useState();
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState();
  const [editBook, setEditBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    series: "",
    description: "",
    image: "",
  });

  const [url, setUrl] = useState();

  // Fetch books based on parameters passed
  const getBooks = (parameter, filter, order, term) => {
    // Perform asynchronous fetch operation
    console.log("url", booksSearch(parameter, filter, order, term));

    const searchUrl = booksSearch(parameter, filter, order, term);

    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        // Update state based on fetch result
        if (data.error) {
          // Handle error cases
          setMessage("Can't get data");

          // Update state accordingly
        } else {
          // Update state with fetched data
          setBooks(data.items);
        }
      });
  };

  const googleSearch = (
    e,
    parameter,
    filter,
    order,
    q_book = document.querySelector("#q_book").value
  ) => {
    if (e.type === "keypress" && e.key !== "Enter") return;
    if (q_book === "") {
      //dispatch({ type: "fetchBooksAndChangeState", payload: book_list }); // Clear books array
      setMessage("Try searching for something first :)");
      return false;
    } else {
      getBooks(parameter, filter, order, q_book);
      return true;
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key !== "Enter") {
      return;
    } else if (e.key === "Enter" && e.target.value !== "") {
    } else {
      e.preventDefault();
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    setUrl(booksSearch(searchValue));

    googleSearch(e, parameter, filter, order);
  };

  const handleEditBook = (book) => {
    setEditBook(book);

    // Create the updated book object
    const updatedBook = {
      ...newBook,
      title: editBook.volumeInfo.title,
      author: editBook.volumeInfo.authors,
      series: searchValue,
      pages: editBook.volumeInfo.pageCount,
      categories: editBook.volumeInfo.categories,
      description: editBook.volumeInfo.description,
      image: editBook.volumeInfo.imageLinks.thumbnail,
    };

    console.log("editBook", updatedBook);

    // Set the new book state
    setNewBook(updatedBook);
  };

  const addBook = () => {
    // Use the updated book object directly in the addNewBook function
    addNewBook(newBook)
      .then((data) => {
        setMessage("A new book added successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {" "}
      <div className="flex items-center justify-center py-2 flex-wrap">
        <form autoComplete="off">
          <input
            className="text-blue-700 border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            label="Search for a book"
            id="q_book"
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={(e) => handleChange(e)}
            fullWidth={true}
            margin="normal"
            value={searchValue}
          />
          <button
            variant="contained"
            value="google"
            className="text-blue-700 border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            color="primary"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Google Book Search
          </button>
        </form>
        {url}
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-200 p-4">
              {" "}
              <table>
                <thead>
                  <tr>
                    <th>Book Cover</th>

                    <th>Title</th>
                    <th>Author</th>
                    <th>Image</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>
                        {book.volumeInfo.imageLinks &&
                        book.volumeInfo.imageLinks.thumbnail ? (
                          <img
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title}
                          />
                        ) : (
                          <span>No Image Available</span>
                        )}
                      </td>
                      <td>{book.volumeInfo.title}</td>
                      <td>{book.volumeInfo.authors}</td>
                      <td> </td>
                      <td>
                        <button onClick={() => handleEditBook(book)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="bg-gray-200 p-4">
              {" "}
              <div id="editBook">
                {editBook && (
                  <div>
                    <h2 className="">Add to Book List</h2>
                    <div>
                      <label
                        for="editTitle"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title:
                      </label>
                      <input
                        type="text"
                        id="editTitle"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newBook.title}
                        onChange={(e) =>
                          setNewBook({ ...newBook, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="editAuthor"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Author:
                      </label>
                      <input
                        type="text"
                        id="editAuthor"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newBook.author}
                        onChange={(e) =>
                          setNewBook({ ...newBook, author: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="editSeries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Series:
                      </label>
                      <input
                        type="text"
                        id="editSeries"
                        value={newBook.series}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setNewBook({ ...newBook, series: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="editPages"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Pages:
                      </label>
                      <input
                        type="text"
                        id="editPages"
                        value={newBook.pages}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setNewBook({ ...newBook, pages: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="editCategories">Categories:</label>
                      <input
                        type="text"
                        id="editCategories"
                        value={newBook.categories}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setNewBook({ ...newBook, categories: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="editGenre">Genre:</label>
                      <input
                        type="text"
                        id="editGenre"
                        value={newBook.genre}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setNewBook({ ...newBook, genre: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="editSubject">Subject:</label>{" "}
                      <input
                        type="text"
                        id="editSubject"
                        value={newBook.subject}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setNewBook({ ...newBook, subject: e.target.value })
                        }
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="editDescription"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        id="editDescription"
                        rows="5"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={newBook.description}
                        onChange={(e) =>
                          setNewBook({
                            ...newBook,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div class="mb-6">
                      <label
                        for="editCharacters"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Characters
                      </label>
                      <textarea
                        id="editCharacters"
                        rows="5"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={editBook.characters}
                        onChange={(e) =>
                          setEditBook({
                            ...editBook,
                            characters: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div class="mb-6">
                      <label
                        for="editBookTalks"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Book Talks
                      </label>
                      <textarea
                        id="editBookTalks"
                        rows="5"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={editBook.booktalks}
                        onChange={(e) =>
                          setEditBook({
                            ...editBook,
                            booktalks: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <p>
                      Image: <img src={editBook.image} alt={editBook.title} />
                    </p>
                    <div>
                      <label htmlFor="editImage">Image:</label>
                      <input
                        type="text"
                        id="editImage"
                        value={newBook.image}
                        onChange={(e) =>
                          setNewBook({ ...newBook, image: e.target.value })
                        }
                      />
                    </div>
                    <button
                      className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                      onClick={addBook}
                    >
                      Save
                    </button>
                    {message && <p>{message}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleBookSearch;
