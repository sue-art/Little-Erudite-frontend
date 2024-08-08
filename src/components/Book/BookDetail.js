import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import NoInfo from "./NoInfo";
import Loader from "../Loader";
import BookTalkCard from "./BookTalkCard";
import AuthorItem from "./authors/AuthorItem";
import Modal from "./Modal";
import QuizDetail from "../../components/Quiz/QuizDetail";
import BookItem from "./BookItem";
import AudiobookPlayer from "../Features/AudiobookPlayer";
import BookVocabulary from "./BookVocabulary";
import { BookListContext } from "./BookListContext";
import { convertTitleToSlug } from "../Features/ConvertAPI";
import {
  addReadingListtoUser,
  addViewedBooktoUser,
} from "../admin/users/UsersFetchAPI";
import { useAuth } from "../../pages/Auth/AuthContext";
import SignIn from "../../pages/Auth/SingIn";

const BookDetail = ({ book_id }) => {
  const { book, loading, message, dispatch } = useContext(BookListContext);
  const { username } = useAuth();
  const [isBookQuiz, setIsBookQuiz] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const bookTitle = book_id;

  const location = useLocation();

  //Modal handlers
  const openModalHandler = (modalName) => {
    setOpenModal(modalName);
  };

  //Modal handlers
  const closeModalHandler = () => {
    setOpenModal(null);
  };

  const getBook = async (bookTitle) => {
    dispatch({ type: "setLoading", payload: true });
    dispatch({ type: "fetchBook", payload: bookTitle });
    if (username) {
      const viewedbook = { title: book.title, image: book.image };
      const data = await addViewedBooktoUser(username, viewedbook);
    }

    dispatch({ type: "setLoading", payload: false });
  };

  const addToBookList = async (e) => {
    if (!username) {
      alert("Please login to add book to your list");
      openModalHandler("signin");
      return dispatch({
        type: "setMessage",
        payload: "Please login to add book to your list",
      });
    } else {
      const newBook = {
        title: book.title,
        image: book.image,
        status: "Want to read",
      };

      const addBook = await addReadingListtoUser(username, newBook);
      if (addBook) {
        dispatch({ type: "setMessage", payload: "Book added to your list" });
      }
    }
  };

  useEffect(() => {
    getBook(bookTitle);
    if (!book) dispatch({ type: "setMessage", payload: "No book found" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, loading, bookTitle, book]);

  if (loading && book === null) {
    return <Loader />;
  } else {
    return (
      <Fragment>
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-3">
          {message} {book === null && <p>{message}</p>}
          {book && (
            <>
              <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {book.title}
                </h1>
                <img
                  src={book.image}
                  alt={book.title}
                  className="mt-5"
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <div className="mt-10">
                  <div className="flex mx-auto grid-cols-3">
                    <div className="col-span-1 mr-5 mb-9">
                      <button className="bg-green text-left text-sm text-white py-4 px-4 rounded">
                        <h2 className="">Authors </h2>
                        {Array.isArray(book.author) === true ? (
                          <Link
                            to={`/authors/${convertTitleToSlug(
                              book.author[0]
                            )}`}
                          >
                            {book.author[0]}
                            <AuthorItem name={book.author[0]} />
                          </Link>
                        ) : book.author ? (
                          <Link
                            to={`/authors/${convertTitleToSlug(book.author)}`}
                          >
                            {book.author}
                            <AuthorItem name={book.author} />
                          </Link>
                        ) : (
                          <span>N/A</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Description and details */}
              <div className="lg:col-span-2 lg:pb-16">
                {message ?? <p>{message}</p>}
                <div className="flex justify-left width-auto flex-wrap bg-green rounded-lg px-3 py-2 pb-0 ">
                  <div className="mr-5 mb-2">
                    <button className="bg-pink hover:bg-pink text-white font-bold py-2 px-4 rounded-full">
                      Age Range - {book.ages}
                    </button>
                  </div>
                  {book.lexile && (
                    <div className="mr-5 mb-2">
                      <button className="bg-yellow hover:bg-pink text-white font-bold py-2 px-4 rounded-full">
                        Lexile Level - {book.lexile}
                      </button>
                    </div>
                  )}
                  {book.Vocabulary && (
                    <div className="mr-5 mb-2">
                      <button
                        className="bg-yellow hover:bg-pink text-white font-bold py-2 px-4 rounded-full"
                        value="Vocabulary Quiz"
                        onClick={() => openModalHandler("vocabulary")}
                      >
                        Vocabulary Quiz
                      </button>
                    </div>
                  )}
                  <Modal
                    isOpen={openModal === "vocabulary"}
                    onClose={closeModalHandler}
                    title="Vocabulary Quiz"
                  >
                    <BookVocabulary slug={book_id} title={book.title} />
                  </Modal>

                  <div className="mr-5 mb-2">
                    <button
                      className="bg-yellow hover:bg-pink text-white font-bold py-2 px-4 rounded-full"
                      value="Book Quiz"
                      onClick={() => openModalHandler("quiz")}
                    >
                      Book Quiz
                    </button>
                  </div>
                  <Modal
                    isOpen={openModal === "quiz"}
                    onClose={closeModalHandler}
                    title="Book Quiz"
                  >
                    <QuizDetail title={book.title} />
                  </Modal>

                  {book.audioscript && (
                    <div className="col-span-1 mr-5">
                      <AudiobookPlayer text={book.audioscript} />
                    </div>
                  )}
                  <div className="mr-5 mb-2">
                    <button
                      className="bg-yellow hover:bg-pink text-white font-bold py-2 px-4 rounded-full"
                      value={book.title}
                      onClick={(e) => addToBookList(e)}
                    >
                      Add to My Reading List
                    </button>
                  </div>
                </div>
                <Modal
                  isOpen={openModal === "signin"}
                  onClose={closeModalHandler}
                  title="Log in"
                >
                  <SignIn />
                </Modal>
                <div className="mt-6 space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Description{" "}
                  </h1>
                  <p>
                    {book.description ? parse(book.description) : <NoInfo />}
                  </p>
                </div>

                {book.characterlist && (
                  <div className="mt-6 space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                      Characters{" "}
                    </h1>
                    <div>
                      {book.characterlist.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index !== book.characterlist.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {book.keywordlist && (
                  <div className="mt-6 space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                      Keywords{" "}
                    </h1>
                    <div>
                      <p>
                        {" "}
                        {book.keywordlist &&
                          book.keywordlist.map((item, index) => (
                            <span key={index}>
                              {item}
                              {index !== book.keywordlist.length - 1 && ", "}
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
                )}
                {book.booktalks && (
                  <div className="mt-6 space-y-2">
                    <h1 className="text-2xl font-bold">Book Talk</h1>
                    <div className="carousel carousel-center max-w-full py-4 space-x-4 rounded-box">
                      {book.booktalks &&
                        book.booktalks.map((question, index) => (
                          <div key={question} className="carousel-item">
                            <BookTalkCard
                              question={question}
                              name={index}
                              isModalOpen={openModal}
                              onOpenModal={openModalHandler}
                              onCloseModal={closeModalHandler}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {book.amazon && (
                  <div className="mt-6 space-y-6">
                    <h1 className="text-2xl mb-5 font-bold tracking-tight text-gray-900 sm:text-3xl">
                      Buy this book
                    </h1>
                    {book.amazon ? ( // Check if the book has an Amazon link
                      <a
                        href={book.amazon.link}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green text-white rounded-full text-blue-500 hover:bg-blue-500 hover:text-white mt-5 px-4 py-2"
                      >
                        Buy on Amazon - {book.amazon.price}
                      </a>
                    ) : (
                      <p>No Amazon link</p>
                    )}
                  </div>
                )}
                {book.relatedbooks && (
                  <div className="mt-10 space-y-6">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      More Books{" "}
                    </h1>
                    <div className="inline-flex">
                      {book.relatedbooks &&
                        book.relatedbooks.map((item, index) => (
                          <div key={index} className="flex-1">
                            <BookItem id={item} />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Fragment>
    );
  }
};

export default BookDetail;
