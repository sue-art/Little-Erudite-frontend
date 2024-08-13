import React, { Fragment } from "react";
import Loader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import { usePosts } from "./BlogContextProvider";

const BlogList = () => {
  const { state } = usePosts();
  const { filteredPosts, loading } = state;
  const navigate = useNavigate();

  const handleItemClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Fragment>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Blog
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredPosts.length === 0 && (
            <div className="text-center">No posts found</div>
          )}
          {filteredPosts.map((post) => (
            <div
              key={post.sys.id}
              onClick={() => handleItemClick(post.fields.slug)}
            >
              <div className="p-5 dark">
                <img
                  className="posts__post__img__container__img object-cover h-64 w-full"
                  src={post.fields.coverImages[0].fields.file.url}
                  alt={post.fields.title}
                />
                <h5 className="line-clamp-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.fields.title}
                </h5>

                <Link
                  to={`/blog/${post.fields.slug}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
};

export default BlogList;
