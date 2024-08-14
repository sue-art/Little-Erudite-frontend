import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import IconArrowRight from "../Icons/IconArrowRight";
import IconSpeaker from "../Icons/IconSpeaker";

const BookFlipItem = ({ book }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { title, image, author } = book;

  // Function to generate slug from book title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  const truncateText = (text, maxLength) => {
    // if text is shorter than the maxLength, return the text
    if (!text) return;
    else if (text.length <= maxLength) {
      return text;
    }
    // cut the text to the maximum length and add "..."
    return text.slice(0, maxLength) + "...";
  };

  const getColorClass = () => {
    const colors = [
      "bg-red",
      "bg-pink",
      "bg-green",
      "bg-yellow",
      "bg-blue",
      "bg-purple",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const bookStyle = {
    color: "white",
    width: "160px", // Set a fixed width
    height: "200px", // Set a fixed height
    alignItems: "center", // Center items horizontally
  };

  return (
    <Fragment>
      <div
        className={`book-card`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
          <div
            className={`card-front rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none ${getColorClass()}`}
          >
            {/* Front of the card */}
            <Link to={`/books/${generateSlug(title)}`}>
              <img style={bookStyle} src={image} alt={title} />
            </Link>
          </div>
          <div
            className={`card-back bg-green p-3 focus:ring-4 focus:outline-none `}
          >
            {/* Back of the card */}
            <Link to={`/books/${generateSlug(title)}`}>
              <div className="flex flex-col gap-4">
                <h2 className="text-white">{truncateText(title, 40)}</h2>
                <p className="text-white text-sm">{truncateText(author, 10)}</p>
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex">
                    <button className="bg-pink text-white text-xs font-bold py-2 px-3 rounded-full hover:bg-pink transition duration-300 mr-2">
                      <div className="w-5">
                        <IconSpeaker />
                      </div>
                    </button>
                    <button className="bg-pink text-white font-bold py-2 px-3 rounded-full hover:bg-pink transition duration-300 ">
                      <div className="w-5 py-1 pl-0 pr-1">
                        <IconArrowRight />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookFlipItem;
