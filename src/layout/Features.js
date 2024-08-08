import React from "react";
import { Link } from "react-router-dom";
import { Book, Award } from "lucide-react";

const Features = () => {
  return (
    <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
      <div className="p-6 rounded-lg text-center">
        <Link to="/books">
          <Book className="mx-auto mb-4 text-blue-500" size={48} />
          <h2 className="text-xl font-semibold mb-2">Explore Books</h2>
          <p className="text-gray-600">
            Browse our vast collection of children's books.
          </p>
        </Link>
      </div>
      <div className="p-6 rounded-lg text-center">
        <Link to="/quizzes">
          <Award className="mx-auto mb-4 text-green-500" size={48} />
          <h2 className="text-xl font-semibold mb-2">Take Quizzes</h2>
          <p className="text-gray-600">
            Test your knowledge with fun, interactive quizzes.
          </p>
        </Link>
      </div>
      <div className="p-6 rounded-lg text-center">
        <Link to="/profile">
          <svg
            className="mx-auto mb-4 text-purple-500"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Track Progress</h2>
          <p className="text-gray-600">
            Monitor your reading journey and quiz scores.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Features;
