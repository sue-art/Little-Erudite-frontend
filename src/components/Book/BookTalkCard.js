import React, { Fragment, useState, useEffect } from "react";
import Avatar from "../Avata/Avata";
import IconSpeaker from "../Icons/IconSpeaker";
import IconChatBubble from "../Icons/IconChatBubble";
import BookTalksChat from "./BookTalksChat";
import Modal from "./Modal";
import { textToSpeech } from "../Features/TextToSpeech";

const BookTalkCard = ({
  question,
  name,
  isModalOpen,
  onOpenModal,
  onCloseModal,
}) => {
  const getAvatarName = (name) => {
    if (name === 1) {
      return "Sam";
    } else if (name == 2) {
      return "Dave";
    } else if (name == 3) {
      return "Sarah";
    } else if (name == 4) {
      return "John";
    } else {
      return "Mark";
    }
  };

  const [avataName, setAvataName] = useState(getAvatarName(name));

  const cardStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
    width: "220px",
  };

  const [timer, setTimer] = useState(10); // Set initial timer value to 10 seconds
  const [showModal, setShowModal] = useState(false); // Add state for controlling the modal visibility
  const [answer, setAnswer] = useState(""); // Add state for storing the answer [1/2
  const [loading, setLoading] = useState(true); // Add state for loading state [2/2
  const [isPlaying, setIsPlaying] = useState(false);

  const truncateText = (text, maxLength) => {
    // if text is shorter than the maxLength, return the text
    if (text.length <= maxLength) {
      return text;
    }

    // cut the text to the maximum length and add "..."
    return text.slice(0, maxLength) + "...";
  };

  // Function to handle opening the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div
        style={{ width: "230px", height: "320px" }}
        className="bg-pink px-3 py-6 w-18 flex flex-col items-center rounded-lg shadow-md"
      >
        <div style={{ width: "110px", height: "130px" }}>
          <Avatar name={avataName} size={"medium"} />
        </div>
        <p className="text-md items-center px-2">
          {truncateText(question, 80)}
        </p>
        <div className="mt-auto w-full flex bottom-0 items-center justify-center">
          <button
            onClick={() => textToSpeech(question)}
            className="relative bg-green text-white text-xs font-bold py-2 px-3 rounded-full hover:bg-pink transition duration-300 mr-2"
          >
            <div className="w-5">
              <IconSpeaker />
            </div>
          </button>
          <button
            onClick={() => onOpenModal(question)}
            className="text-base/1 bg-green text-white font-bold py-2 px-3 rounded-full hover:bg-pink transition duration-300 "
          >
            <div className="w-5">
              <IconChatBubble />
            </div>
          </button>
        </div>
      </div>

      <Modal
        title="Book Talks"
        isOpen={isModalOpen === question}
        onClose={onCloseModal}
      >
        <BookTalksChat question={question} answer={answer} name={avataName} />
      </Modal>
    </Fragment>
  );
};

export default BookTalkCard;
