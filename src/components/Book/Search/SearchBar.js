import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookListContext } from "../BookListContext";

const SearchBar = ({
  parameter,
  filter,
  order,
  home,
  search,
  setParameter,
  setFilter,
  setOrder,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (home && searchValue !== "") {
        navigate("/books");
      }
    }
  };

  useEffect(() => {}, [searchValue]);

  return (
    <div className="flex items-center justify-center flex-wrap mb-4">
      <form autoComplete="off">
        <input
          className="text-blue-700 border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium mr-3 px-5 py-2 text-center dark:border-blue-500 dark:text-blue-500"
          label="Search for a book"
          id="q_book"
          placeholder="Search..."
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          value={searchValue}
        />
        <Link to={`/books/?search=${searchValue}`}>
          <button
            variant="contained"
            value="book_list"
            className="text-blue-700 hover:text-white hover:bg-green border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2 text-center me-3 mb-3"
            color="primary"
          >
            Search
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
