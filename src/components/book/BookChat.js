import React, { useState } from "react";

const BookChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          text: input,
          sender: "user",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl h-3/4 bg-white border border-gray-300 rounded-lg p-4 overflow-y-scroll mb-4 shadow-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <div>{message.text}</div>
              <div className="text-xs text-right mt-1">{message.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default BookChat;
