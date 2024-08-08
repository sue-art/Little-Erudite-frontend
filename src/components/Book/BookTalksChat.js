import React, { useState, Fragment } from "react";
import Avatar from "../Avata/Avata";
import IconSpeaker from "../Icons/IconSpeaker";
import IconMicrophone from "../Icons/IconMicrophone";
import { textToSpeech } from "../Features/TextToSpeech";

const BookTalksChat = ({ question, answer, name }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  //const [input, setInput] = useState("");
  const [countdown, setCountdown] = useState(null);

  /*
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
  };*/

  const startCountdown = () => {
    setIsFlashing(true);
    let count = 3;

    const countdownInterval = setInterval(() => {
      setCountdown(count);
      count -= 1;

      if (count < 0) {
        clearInterval(countdownInterval);
        setIsFlashing(false);
        setCountdown(null);
        handleSpeech();
      }
    }, 1000);
  };

  // Function to handle text-to-speech
  const speakText = (assistantAnswer) => {
    const speech = new SpeechSynthesisUtterance(assistantAnswer);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.name === "Microsoft Catherine - English (Australia)"
    ); // Replace "Desired Voice" with the name of the voice you want to use
    speech.voice = selectedVoice || voices[0]; // Use the selected voice if found, otherwise use the default voice

    speechSynthesis.speak(speech);
  };

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);

    let msgs = [...chats];
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/chatbot/booktalks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chats: chats,
            question: question,
            answer: msgs[msgs.length - 1].content || "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      msgs.push(data.output);
      setChats(msgs);
      console.log(data.output);
      console.log("msgs", msgs);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsTyping(false);
      console.log("message", msgs[msgs.length - 1].content);
      speakText(JSON.stringify(msgs[msgs.length - 1].content));
    }
  };

  // Function to handle speech recognition
  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setMessage(speechResult);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Fragment>
      <div className="inline-flex">
        <div className="w-13" style={{ width: "130px", height: "auto" }}>
          <Avatar name={name} size={"medium"} />
        </div>
        <h2 className="text-bold ml-5">{question}</h2>
        <button
          className="play-audio-button ml-3 mt-5 rounded-full p-3 text-white font-semibold"
          onClick={(e) => textToSpeech(question)}
        >
          {" "}
          <div className="w-6">
            <IconSpeaker />
          </div>
        </button>
      </div>
      <div className="chatbot">
        <section>
          {chats && chats.length
            ? chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.role === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div className="flex gap-2.5">
                    <div className="mr-2">
                      <Avatar name={"Sam"} size={"small"} />
                      <p className="items-center text-sm font-semiboldtext-white">
                        {chat.role === "user" ? "You" : "Assistant"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      chat.role === "user"
                        ? "bg-pink text-white"
                        : "bg-red text-black"
                    }`}
                  >
                    <h2 className="text-sm">{chat.content}</h2>
                  </div>
                </div>
              ))
            : ""}
        </section>

        <div className={isTyping ? "" : "hide"}>
          <p>
            <i>{isTyping ? "Typing" : ""}</i>
          </p>
        </div>

        <form action="" onSubmit={(e) => chat(e, message)}>
          <div className="my-6">
            <textarea
              id="editAnswer"
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Talk your thoughts here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex items-center justify-center mb-5">
              <button
                type="button"
                onClick={() => {
                  setIsFlashing(true);
                  startCountdown();
                  setTimeout(() => {
                    setIsFlashing(false);
                    handleSpeech();
                  }, 3000);
                }}
                className={`mt-2 flex items-center text-white py-2 rounded ${
                  isFlashing ? "flashing" : ""
                }`}
              >
                {isListening ? (
                  <div className="inline-flex">
                    <div className="w-6">
                      <IconSpeaker />
                    </div>
                    <span className="ml-2 text-sm"> Listening...</span>
                  </div>
                ) : (
                  <div className="inline-flex">
                    <div className="w-6">
                      <IconMicrophone />
                    </div>
                    <span className="ml-2 text-sm">
                      {countdown !== null ? countdown : "Speak"}
                    </span>
                  </div>
                )}
              </button>
              <button className="absolute bottom-7 right-10 bg-red hover:bg-pink text-white py-2 px-4 rounded-full">
                Answer
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default BookTalksChat;
