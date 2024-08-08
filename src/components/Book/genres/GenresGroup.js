import React from "react";
import { Link } from "react-router-dom";
import GenresBookList from "./GenresBookList";
import { genres } from "./GenresList";

const GenresGroup = () => {
  const getColorClass = (index) => {
    const colors = [
      "bg-green",
      "bg-pink",
      "bg-yellow",
      "bg-red",
      "bg-blue",
      "bg-purple",
    ];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };
  return (
    <div className="mt-3 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
      {genres.slice(1.9).map((item, index) => (
        <div
          key={item.name}
          className={`rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none transition duration-300 ${getColorClass(
            index
          )}`}
        >
          {" "}
          <Link to={`?topics=${item.value}`}>
            <h1 className="p-3 text-lg font-bold text-white">{item.name}</h1>
          </Link>
          <GenresBookList name={item.value} />
        </div>
      ))}
    </div>
  );
};

export default GenresGroup;
