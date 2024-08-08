import React, { Fragment, useState, useContext, useEffect } from "react";
import { AdminBookContext } from "./AdminBookContextProvider";
import BookChatbot from "./BookChatbot";
import { createQuiz } from "../quizzes/QuizzesFetchAPI";

import {
  updateBook,
  getBookDescription,
  generateAuthorInfo,
  generateQuizQuestions,
} from "./BookFetchAPI";

import { createAuthor } from "../authors/AuthorFetchAPI";

const AuthorComponent = ({ author }) => {
  const [message, setMessage] = useState("");

  const setAuthorInfo = (newAuthor) => {
    createAuthor(author)
      .then((data) => {
        setMessage("A author information added successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>{author.name}</h1>
      <p>{author.description}</p>
      <button
        className="bg-red hover:bg-pink text-white py-2 px-4 rounded"
        onClick={(e) => setAuthorInfo(author)}
      >
        Add Author Information
      </button>{" "}
      {message ? <p>{message}</p> : ""}
    </div>
  );
};

const BookEdit = () => {
  const { state, dispatch } = useContext(AdminBookContext);
  const { editBook, loading } = state;

  const [editQuiz, setEditQuiz] = useState([]);
  const [editAuthor, setEditAuthor] = useState([]);
  const [newBook, setNewBook] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const [isQuizTyping, setIsQuizTyping] = useState(false);

  // Create an array with 5 elements
  const inputs = Array.from({ length: 5 });

  const fetchData = async () => {
    setIsTyping(true);
    try {
      console.log("Edit book:", editBook.author[0], editBook.title);
      const data = await generateAuthorInfo(editBook.author[0], editBook.title);

      const authorData = await JSON.parse(data);
      setEditAuthor(...editAuthor, authorData);

      console.log("Author data:", authorData);
    } catch (error) {
      console.error("Error fetching author data:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const getAutorInfor = async (e) => {
    fetchData();
  };

  const getBookDetails = async (e) => {
    setIsTyping(true);
    try {
      const opendata = await getBookDescription(
        editBook.author,
        editBook.title
      );
      const bookDetailData = await JSON.parse(opendata);
      setNewBook(...newBook, bookDetailData);
      dispatch({ type: "ADD_NEW_BOOK", payload: bookDetailData });
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setIsTyping(false);
    }
  };

  const getQuizQuestions = async (e) => {
    setIsQuizTyping(true);
    try {
      const quizQuestions = await generateQuizQuestions(
        editBook.author,
        editBook.titlet
      );
      const quizQuestionsData = await JSON.parse(quizQuestions);

      setEditQuiz({
        ...editQuiz,
        bookId: editBook._id,
        image: editBook.image,
        title: editBook.title,
        description: quizQuestionsData.description,
        questions: quizQuestionsData.questions,
      });
      console.log("Quiz questions:", editBook.image, editBook.title);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    } finally {
      setIsQuizTyping(false);
    }
  };

  const setcreateQuizzes = async () => {
    try {
      createQuiz(editQuiz).then((data) => {
        console.log("Quiz created successfully:", data);
      });
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleOnSumit = async (e) => {
    e.preventDefault();

    const book = editBook;
    const id = editBook._id;
    const updatedBook = await updateBook(id, book);
    console.log("Updated book:", updatedBook);
  };

  const setEditBook = (book) => {
    dispatch({ type: "EDIT_BOOK", payload: book });
  };

  // Handler to update the array when the Characters list textarea changes
  const handleCharactersListChange = (e) => {
    const value = e.target.value;
    const CharactersdArray = value.split(",").map((keyword) => keyword.trim());
    setEditBook({ ...editBook, characterlist: CharactersdArray });
  };

  // Handler to update the array when the textarea changes
  const handleKeywordsChange = (e) => {
    const value = e.target.value;
    const keywordArray = value.split(",").map((keyword) => keyword.trim());
    setEditBook({ ...editBook, keywordlist: keywordArray });
  };
  const handleRoadmaplistChange = (e) => {
    const value = e.target.value;
    const roadmapArray = value.split(",").map((roadmap) => roadmap.trim());
    setEditBook({ ...editBook, roadmaplist: roadmapArray });
  };

  const handleTopicsChange = (e) => {
    const value = e.target.value;
    const topicsArray = value.split(",").map((topic) => topic.trim());
    setEditBook({ ...editBook, topics: topicsArray });
  };

  useEffect(() => {}, [loading, isTyping, isQuizTyping, editBook]);

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      {" "}
      <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1>Edit</h1>
        {editBook && (
          <div>
            <h2>Edit Book</h2>
            <form onSubmit={handleOnSumit}>
              <div>
                <label
                  for="editTitle"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="editTitle"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                  value={editBook.title}
                  onChange={(e) =>
                    setEditBook({ ...editBook, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  for="editAuthor"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                  <button
                    className="bg-red hover:bg-pink text-white py-2 px-4 rounded"
                    onClick={(e) =>
                      getAutorInfor(editBook.author, editBook.title)
                    }
                  >
                    Add Author Information
                  </button>
                  <div className={isTyping ? "" : "hide"}>
                    <p>
                      <i>{isTyping ? "Typing" : ""}</i>
                    </p>
                  </div>
                </label>
                <input
                  type="text"
                  id="editAuthor"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editBook.author}
                  onChange={(e) =>
                    setEditBook({ ...editBook, author: e.target.value })
                  }
                />

                {editAuthor && <AuthorComponent author={editAuthor} />}
              </div>
              <div>
                <label
                  for="editSeries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Series:
                </label>
                <input
                  type="text"
                  id="editSeries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editBook.series}
                  onChange={(e) =>
                    setEditBook({ ...editBook, series: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  for="editSeries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age Range{" "}
                </label>
                <input
                  type="text"
                  id="editSeries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editBook.ages ? editBook.ages : ""}
                  onChange={(e) =>
                    setEditBook({ ...editBook, ages: e.target.value })
                  }
                />
              </div>

              <div class="mb-6">
                <label
                  for="editRoadmap"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Roadmap list{" "}
                </label>
                <textarea
                  id="editRoadmap"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  value={
                    editBook.roadmaplist ? editBook.roadmaplist.join(", ") : " "
                  }
                  onChange={handleRoadmaplistChange}
                ></textarea>
              </div>
              <div class="mb-6">
                <label
                  for="editTopics"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Topics{" "}
                </label>
                <textarea
                  id="editTopics"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  value={editBook.topics ? editBook.topics.join(", ") : " "}
                  onChange={handleTopicsChange}
                ></textarea>
              </div>
              <div>
                <label
                  for="editSeries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pages:
                </label>
                <input
                  type="text"
                  id="editPages"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editBook.pages}
                  onChange={(e) =>
                    setEditBook({ ...editBook, pages: e.target.value })
                  }
                />
              </div>
              <div class="mb-6">
                <img src={editBook.image} alt={editBook.name} width="150px" />
                <label
                  for="editImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="text"
                  id="editImage"
                  class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editBook.image}
                  onChange={(e) =>
                    setEditBook({ ...editBook, image: e.target.value })
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
                  value={editBook.description}
                  onChange={(e) =>
                    setEditBook({
                      ...editBook,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div class="mb-6">
                <label
                  for="editAudioScript"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Audio Script
                </label>
                <textarea
                  id="editAudioScript"
                  rows="5"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  value={editBook.audioscript}
                  onChange={(e) =>
                    setEditBook({
                      ...editBook,
                      audioscript: e.target.value,
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
                  rows="2"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  value={
                    editBook.characterlist
                      ? editBook.characterlist.join(", ")
                      : ""
                  }
                  onChange={handleCharactersListChange}
                ></textarea>
              </div>
              <div class="mb-6">
                <label
                  for="editKeywords"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Keywords{" "}
                </label>
                <textarea
                  id="editKeywords"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  value={
                    editBook.keywordlist ? editBook.keywordlist.join(", ") : " "
                  }
                  onChange={handleKeywordsChange}
                ></textarea>
              </div>
              <div class="mb-6">
                <label
                  for="editBookTalks"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Book Talk
                </label>
                {editBook.booktalks
                  ? inputs.map((_, index) => (
                      <input
                        type="text"
                        id={`editBookTalks${index}`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={editBook.booktalks[index]}
                        onChange={(e) => {
                          // Create a new array with the updated question
                          const updatedBooktalks = editBook.booktalks.map(
                            (item, itemIndex) =>
                              itemIndex === index ? e.target.value : item
                          );
                          setEditBook({
                            ...editBook,
                            booktalks: updatedBooktalks,
                          });
                        }}
                      />
                    ))
                  : // If there are no booktalks, create 5 empty inputs
                    inputs.map((_, index) => (
                      <input
                        type="text"
                        id={`editBookTalks${index}`}
                        value=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                          // Create a new array with the updated question
                          const updatedBooktalks = [];
                          updatedBooktalks[index] = e.target.value;
                          setEditBook({
                            ...editBook,
                            booktalks: updatedBooktalks,
                          });
                        }}
                      />
                    ))}
              </div>
              <div class="mb-6">
                <label
                  for="editBookTalks"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Other Books{" "}
                </label>
              </div>
              {editBook.relatedbooks
                ? editBook.relatedbooks.slice(0, 2).map((book, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="text"
                        id={`editRelatedBooks${index}`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={book}
                        onChange={(e) => {
                          // Create a new array with the updated question
                          const updatedRelatedBooks = editBook.relatedbooks.map(
                            (item, itemIndex) =>
                              itemIndex === index ? e.target.value : item
                          );
                          // Update the state with the new array
                          setEditBook({
                            ...editBook,
                            relatedbooks: updatedRelatedBooks,
                          });
                        }}
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        onClick={() => {
                          // Create a new array without the deleted book
                          const updatedRelatedBooks =
                            editBook.relatedbooks.filter(
                              (item, itemIndex) => itemIndex !== index
                            );
                          // Update the state with the new array
                          setEditBook({
                            ...editBook,
                            relatedbooks: updatedRelatedBooks,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="text"
                        id={`editRelatedBooks${index}`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                          const updatedRelatedBooks = [];
                          updatedRelatedBooks[index] = e.target.value;
                          setEditBook({
                            ...editBook,
                            relatedbooks: updatedRelatedBooks,
                          });
                        }}
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        onClick={() => {
                          // Create a new array without the deleted book
                          const updatedRelatedBooks =
                            editBook.relatedbooks.filter(
                              (item, itemIndex) => itemIndex !== index
                            );
                          // Update the state with the new array
                          setEditBook({
                            ...editBook,
                            relatedbooks: updatedRelatedBooks,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              <div className="mt-3">
                <label
                  for="editSeries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amazon{" "}
                </label>
                <input
                  type="text"
                  id="editAmazonlink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editBook.amazon ? editBook.amazon.link : ""}
                  onChange={(e) =>
                    setEditBook({
                      ...editBook,
                      amazon: {
                        ...editBook.amazon,
                        link: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="text"
                  id="editAmazonprice"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editBook.amazon ? editBook.amazon.price : ""}
                  onChange={(e) =>
                    setEditBook({
                      ...editBook,
                      amazon: {
                        ...editBook.amazon,
                        price: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <button className="bg-red hover:bg-pink text-white py-2 px-4 rounded">
                Save
              </button>
            </form>
            <button
              className="mt-6 bg-red hover:bg-pink text-white py-2 px-4 rounded"
              onClick={(e) => getBookDetails(editBook.author, editBook.title)}
            >
              Get more book information
            </button>

            <section>
              <h1>Book information</h1>
              {newBook.title ? <p>title: {newBook.title}</p> : ""}
              {newBook.author ? <p>author: {newBook.author}</p> : ""}
              {newBook.description ? (
                <p>discription: {newBook.description}</p>
              ) : (
                ""
              )}
              {newBook.ages ? <p>ages: {newBook.ages}</p> : ""}
              {newBook.pages ? <p>pages: {newBook.pages}</p> : ""}
              {newBook.booktalksquestions
                ? newBook.booktalksquestions.map((question, index) => (
                    <p key={index}>{question}</p>
                  ))
                : ""}
              {newBook.characters ? (
                <p>characters: {newBook.characters}</p>
              ) : (
                ""
              )}

              {newBook.characterlist
                ? newBook.characterlist.map((list, index) => (
                    <p key={index}>{list}</p>
                  ))
                : ""}
              {newBook.amazon ? <p>Amazon: {newBook.amazon.link}</p> : ""}
              {newBook.amazon ? <p>Price: {newBook.amazon.price}</p> : ""}
            </section>

            <BookChatbot book={editBook} />

            <div className="mt-5">
              <label
                for="editAuthor"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quiz
              </label>
              <button
                className="bg-red hover:bg-pink text-white py-2 px-4 rounded"
                onClick={(e) =>
                  getQuizQuestions(editBook.author, editBook.title)
                }
              >
                Generate Quiz
              </button>
              <div className={isQuizTyping ? "" : "hide"}>
                <p>
                  <i>{isQuizTyping ? "Typing" : ""}</i>
                </p>
              </div>
              <button
                className="bg-red hover:bg-pink text-white py-2 px-4 rounded"
                onClick={setcreateQuizzes}
              >
                Save Quiz Information
              </button>
              {editQuiz && (
                <div>
                  <p> {editQuiz.discription} </p>

                  <button
                    className="bg-red hover:bg-pink text-white py-2 px-4 rounded"
                    onClick={setcreateQuizzes}
                  >
                    Save Quiz Information
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BookEdit;
