import React, { useState, useEffect, useContext } from "react";
import { getBookDescription } from "./BookFetchAPI";
import { AdminBookContext } from "./AdminBookContextProvider";

function BookChatbot({ book }) {
  console.log("bookTitle", book.title);
  console.log("author", book.author);
  console.log("description", book.description);
  const { dispatch } = useContext(AdminBookContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const [newBook, setNewBook] = useState([]);

  const fetchData = async () => {
    setIsTyping(true);
    const bookChat = await getBookDescription({
      title: book.title,
      author: book.author[0],
      description: book.description,
    });
    const bookData = await JSON.parse(bookChat);
    setNewBook(bookData);
    setIsTyping(false);
  };

  const handleOnSubmit = (e, message) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
    dispatch({ type: "ADD_NEW_BOOK", payload: newBook });
    setLoading(false);
  };

  const addMoreInfo = () => {
    dispatch({ type: "UPDATE_BOOKTALKS", payload: newBook.booktalks });
    dispatch({ type: "UPDATE_KEYWORDLIST", payload: newBook.keywordlist });
    dispatch({ type: "UPDATE_CHARACTERLIST", payload: newBook.characterlist });
    //dispatch({ type: "EDIT_BOOK", payload: newBook });
  };

  useEffect(() => {}, []);
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="chatbot">
        <section>
          {chats && chats.length
            ? chats.map((chat, index) => (
                <p
                  key={index}
                  className={chat.role === "user" ? "user_msg" : "Hello"}
                >
                  <span>
                    <b>{chat.role.toUpperCase()}</b>
                  </span>
                  <span>:</span>
                  <span>{chat.content}</span>
                </p>
              ))
            : ""}
        </section>

        <div className={isTyping ? "" : "hide"}>
          <p>
            <i>{isTyping ? "Typing" : ""}</i>
          </p>
        </div>

        <form action="" onSubmit={(e) => handleOnSubmit(e, message)}>
          <section>Showing books for category: {book.title}</section>
          <button
            class="bg-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Get Book Talks Qestions More
          </button>
        </form>
        <section>
          <h1>Book information</h1>
          {newBook.title ? <p>title: {newBook.title}</p> : ""}
          {newBook.author ? <p>author: {newBook.author}</p> : ""}
          {newBook.description ? <p>discription: {newBook.description}</p> : ""}
          {newBook.booktalks
            ? newBook.booktalks.map((question, index) => (
                <p key={index}>{question}</p>
              ))
            : ""}
          {newBook.characters ? <p>characters: {newBook.characters}</p> : ""}

          {newBook.characterlist
            ? newBook.characterlist.map((list, index) => (
                <p key={index}>{list}</p>
              ))
            : ""}
          {newBook.keywordlist
            ? newBook.keywordlist.map((list, index) => (
                <p key={index}>{list}</p>
              ))
            : ""}
        </section>

        <button
          className="bg-green hover:bg-pink text-white py-2 px-4 mr-2 rounded"
          onClick={addMoreInfo}
        >
          Add to Book Form
        </button>
      </div>
    </div>
  );
}

export default BookChatbot;
