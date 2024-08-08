import React, { useState } from "react";

function BookListChatBot() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [category, setCategory] = useState("Dog man");
  const [suggestedBooks, setSuggestedBooks] = useState([]);

  const book_list = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);

    let msgs = chats;
    let bookList = [];
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("http://localhost:8000/booklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);

        setChats(msgs);
        bookList.push(JSON.parse(data.output.content));
        setSuggestedBooks(bookList);
        console.log("msgs", msgs);
        setIsTyping(false);
        //scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="chatbot">
        <h2> Ask us anything </h2>
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

        <form action="" onSubmit={(e) => book_list(e, message)}>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>

        <section>
          {suggestedBooks && suggestedBooks.length
            ? suggestedBooks[0].map((book, index) => (
                <p key={index}>
                  {book.title} by {book.author} - {book.ageRange}
                </p>
              ))
            : ""}
        </section>
      </div>
    </div>
  );
}

export default BookListChatBot;
