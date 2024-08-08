import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "./BlogContextProvider";
import Loader from "../Loader";

const BlogDetail = () => {
  const postsContext = usePosts();
  const { post } = postsContext;
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [date, setDate] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  function convertMarkdownToHtml(markdown) {
    // Convert headers with Tailwind classes
    markdown = markdown.replace(
      /^## (.*$)/gim,
      '<h2 class="text-2xl font-bold mb-4 mt-6">$1</h2>'
    );

    // Convert paragraphs with Tailwind classes
    markdown = markdown.replace(/^\s*\n\s*\n/gm, '</p><p class="mb-4">');
    markdown = '<p class="mb-4">' + markdown + "</p>";

    // Convert line breaks
    markdown = markdown.replace(/\r\n/g, "<br>");

    // Convert bold text with Tailwind classes
    markdown = markdown.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold">$1</strong>'
    );

    // Convert italic text with Tailwind classes
    markdown = markdown.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    return markdown;
  }

  // Function to render the JSON response to HTML
  function renderRichTextToHTML(node) {
    if (node.nodeType === "document") {
      return `<div>${node.content.map(renderRichTextToHTML).join("")}</div>`;
    }
    if (node.nodeType === "paragraph") {
      return `<p>${node.content.map(renderRichTextToHTML).join("")}</p>`;
    }
    if (node.nodeType === "text") {
      return convertMarkdownToHtml(node.value);
    }
    // Add more cases for different node types as needed
  }

  const fetchPost = async () => {
    if (postsContext && postsContext.dispatch) {
      postsContext.dispatch({ type: "GET_POST", payload: id });
    }

    // Simulating post fetch for demonstration
    setTimeout(() => {
      if (post) {
        const htmlContentFields = post.fields.content.content[0];

        const htmlContent = htmlContentFields.content.map((contentItem) =>
          renderRichTextToHTML(contentItem)
        );

        const date = new Date(post.sys.createdAt);
        setDate(date.toLocaleDateString("en-US", options));

        setContent(htmlContent);
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchPost();
  }, [id, post]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      <div className="mt-10 pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {post.fields.title}
              </h1>
            </header>

            <figure className="max-w-lg">
              <img
                className="h-auto max-w-full rounded-lg"
                src={post.fields.coverImages[0].fields.file.url}
                alt={post.fields.coverImages[0].fields.title}
              />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                {post.fields.coverImages[0].fields.title}
              </figcaption>
            </figure>

            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <address className="flex items-center mb-6 not-italic mt-5">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src={post.fields.author.fields.image.fields.file.url}
                  alt={post.fields.author.fields.name}
                />
                <div className="mt-10">
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {post.fields.author.fields.name}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {post.fields.author.fields.position}
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {date}
                  </p>
                </div>
              </div>
            </address>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
