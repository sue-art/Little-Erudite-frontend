import React from "react";
import { Link } from "react-router-dom";

const TopicCard = ({ topic, books, position }) => {
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  const getRandomColor = () => {
    const colors = [
      "red",
      "pink",
      "green",
      "yellow",
      "blue",
      "purple",
      "orange",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const color = getRandomColor();

  const getColorClass = (color) => {
    switch (color) {
      case "pink":
        return "bg-pink";
      case "blue":
        return "bg-blue";
      case "purple":
        return "bg-purple";
      case "green":
        return "bg-green";
      case "yellow":
        return "bg-yellow";
      case "red":
        return "bg-red";
      case "orange":
        return "bg-orange";
      case "gray":
        return "bg-gray";
      default:
        return ""; // Default case if color doesn't match
    }
  };

  const getArrowPositionClass = (position) => {
    switch (position) {
      case "right":
        return "left-[51px]";
      case "left":
        return "right-[36px]";
      default:
        return ""; // Default case if position doesn't match
    }
  };

  return (
    <div
      href="#"
      className={`px-5 py-2 pb-7 text-white border-gray-200 rounded-lg dark:border-gray-700 ${getColorClass(
        color
      )}`}
    >
      <div
        className={`arrow absolute top-9 ${getArrowPositionClass(
          position
        )} transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 ${getColorClass(
          color
        )} `}
      ></div>

      <h2 class="my-4 text-2xl font-bold text-white">{topic} </h2>
      {books.slice(0, 5).map((book) => (
        <div key={book.id}>
          <Link reloadDocument to={`/books/${generateSlug(book.title)}`}>
            <div class="flex items-center justify-between mt-2">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white">{book.title}</h3>
                <p class="text-sm text-gray-700 dark:text-gray-400">
                  {book.author}
                </p>
              </div>
              <img
                src={book.image}
                alt={book.title}
                class="w-12 h-12 object-cover rounded-lg"
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TopicCard;
