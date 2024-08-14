import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAuthors } from "../../admin/authors/AuthorFetchAPI";
import Loader from "../../Loader";

const convertToSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter((word) => word.length > 0)
    .join("-");
};

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const responseData = await getAllAuthors();
    setAuthors(responseData);
    setLoading(false);
  };

  const handleClick = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <div className="mt-5 mb-10 flex flex-wrap">
        {authors.slice(0, 15).map((author) => (
          <Link to={`/authors/${convertToSlug(author.name)}`} key={author.name}>
            <button
              type="button"
              value={author.name}
              onClick={(e) => {
                handleClick(e);
              }}
              className="text-white bg-green hover:bg-white hover:text-blue border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            >
              {author.name}
            </button>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default AuthorList;
