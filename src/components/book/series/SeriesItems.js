import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { BookListContext } from "../BookListContext";
import { getAllBooks, getBooksBySeries } from "../../admin/books/BookFetchAPI";

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const SeriesItems = ({ item }) => {
  const cardStyle = {
    color: "white",
    backgroundImage: `url(${item.image})`, // Set background image using CSS
    backgroundSize: "70%", // Cover the entire div without stretching the image
    backgroundPosition: "center", // Center the background image
    backgroundRepeat: "no-repeat",
    width: "270px", // Set a fixed width
    height: "180px", // Set a fixed height
    display: "flex", // Use Flexbox
    flexDirection: "column", // Stack children vertically
    justifyContent: "space-between", // Distribute space evenly
    alignItems: "center", // Center items horizontally
    overflow: "hidden", // Prevent content from overflowing
  };

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

  const { data, dispatch } = useContext(BookListContext);
  const { books, filteredBooks, loading } = data;

  const fetchData = async (name) => {
    if (name === "all") {
      const booklist = await getAllBooks();
      dispatch({ type: "fetchBooksAndChangeState", payload: booklist });
    } else {
      const booklist = await getBooksBySeries(name.toLocaleLowerCase());
      console.log("booklist", booklist);
      dispatch({ type: "fetchBooksAndChangeState", payload: booklist });
    }
    dispatch({ type: "loading", payload: false });
  };

  const handleClick = (e) => {
    //  e.preventDefault();
    const name = e.target.value;
    fetchData(name);
  };

  return (
    <Fragment>
      <div className="max-w-sm mx-5 my-3 py-0 border-gray-200 rounded-lg dark:border-gray-700">
        <div
          to={`?series=${slugify(item.name)}`}
          key={item._id}
          style={cardStyle}
          className={`inline-flex px-5 items-center text-sm font-medium text-center rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none ${getColorClass(
            item.color
          )}`}
        >
          {" "}
          <button
            type="button"
            value={item.name}
            onClick={handleClick}
            className="text-white bg-green hover:bg-white hover:text-blue text-sm border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          >
            {item.name}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default SeriesItems;
