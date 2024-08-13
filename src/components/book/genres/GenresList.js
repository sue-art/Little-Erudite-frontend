import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

export const genres = [
  { name: "All", value: "all" },
  { name: "Family", value: "family" },
  { name: "Social", value: "social" },
  { name: "Rhyming and Poetry", value: "Rhyming and Poetry" },
  { name: "Adventure", value: "adventure" },
  { name: "Animals", value: "animals" },
  { name: "Classics", value: "classic" },
  {
    name: "Historical and Cultural",
    value: "Historical and Cultural",
  },
  { name: "Geography", value: "geography" },
  { name: "Science Fiction", value: "Science Fiction" },
];

const GenresList = () => {
  const location = useLocation();

  return (
    <Fragment>
      <div
        className={`flex justify-${
          location.pathname === "/" ? "start mt-5" : "center pt-10"
        } flex-wrap`}
      >
        {genres.map((item) => (
          <Link to={`/books/?topics=${item.value}`} key={item.name}>
            <button
              type="button"
              value={item.name}
              className="text-white bg-green hover:bg-white hover:text-blue text-sm border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default GenresList;
