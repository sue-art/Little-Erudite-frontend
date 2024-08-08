import React, { useState, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        console.log(data.output);
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

        <form action="" onSubmit={(e) => chat(e, message)}>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
