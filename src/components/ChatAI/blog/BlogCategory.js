import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePosts } from "./BlogContextProvider";

const blogCategories = [
  {
    name: "All",
    value: "all",
  },
  { name: "Social Themes", value: "social-themes" },

  {
    name: "Adventure",
    value: "adventure",
  },
  { name: "Graphic Novels", value: "graphic-novels" },
  { name: "Science Fiction", value: "science-fiction" },
];

const BlogCategory = () => {
  const { dispatch } = usePosts();
  const navigate = useNavigate();

  const handleClick = (item) => {
    //e.preventDefault();
    navigate(`/blog?category=${item.value}`);

    dispatch({ type: "FILTER_POSTS", payload: item.name });
  };

  return (
    <Fragment>
      <div className="mt-20 flex items-center justify-center flex-wrap">
        {blogCategories.map((item) => (
          <Link to={`/blog?category=${item.value}`} key={item.name}>
            <button
              type="button"
              value={item.name}
              onClick={(e) => {
                handleClick(item);
              }}
              className="text-white bg-green hover:bg-white hover:text-blue border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default BlogCategory;
