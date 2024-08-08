import React, { useState, useEffect, useCallback } from "react";
import { getBooksByRoadmap } from "../admin/books/BookFetchAPI";
import TopicCard from "./TopicCard";
import "./roadmap.css";

const TopicList = ({ roadmapTitle }) => {
  const [booklist, setBooklist] = useState([]);

  const fetchBooks = useCallback(async (title) => {
    try {
      const booklistData = await getBooksByRoadmap(title);
      setBooklist(booklistData);
    } catch (error) {
      console.error("Error fetching books:", error);
      // Optionally, you can set an error state here
    }
  }, []);

  useEffect(() => {
    fetchBooks(roadmapTitle);
  }, [fetchBooks, roadmapTitle]);

  // Group booklist by topic
  const groupedBooklist = booklist.reduce((acc, book) => {
    book.topics.forEach((topic) => {
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(book);
    });
    return acc;
  }, {});

  const validTopics = Object.keys(groupedBooklist).filter((topic) => topic);

  return (
    <div className="my-10">
      <div className="timeline">
        {validTopics.map(
          (topic, index) =>
            topic && (
              <div
                key={topic}
                className={`topic-card ${index % 2 === 0 ? "left" : "right"}`}
              >
                <TopicCard
                  topic={topic}
                  books={groupedBooklist[topic]}
                  position={index % 2 === 0 ? "left" : "right"}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TopicList;
