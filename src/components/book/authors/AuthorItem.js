import React, { Fragment, useEffect, useState } from "react";
import { getAuthorByName } from "../../admin/authors/AuthorFetchAPI";

const AuthorItem = ({ name }) => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (name) => {
    const responseData = await getAuthorByName(name);
    setAuthor(responseData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(name);
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <p className="font-small mt-2">{author.description}</p>
      {author.published_books && (
        <>
          <h2 className="text-white mt-5">Books</h2>
          <p>{author.published_books.map((book) => book.title).join(", ")}</p>
        </>
      )}
    </Fragment>
  );
};

export default AuthorItem;
