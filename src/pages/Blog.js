import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogContextProvider } from "../components/blog/BlogContextProvider";

import BlogList from "../components/blog/BlogList";
import BlogCategory from "../components/blog/BlogCategory";
import BlogDetail from "../components/blog/BlogDetail";

const Blog = () => {
  const { id } = useParams();
  const [selectedCategory, setselectedCategory] = useState("all");

  return (
    <Fragment>
      <BlogContextProvider>
        <BlogCategory />
        {id ? <BlogDetail /> : <BlogList />}
      </BlogContextProvider>
    </Fragment>
  );
};

export default Blog;
