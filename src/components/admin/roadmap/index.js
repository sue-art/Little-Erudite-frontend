import React, { useState } from "react";
import { getBooksByRoadmap } from "../books/BookFetchAPI";

const RoadmapDashboard = () => {
  const roadmapList = [
    { name: "The STEM Explorer's Path" },
    { name: "The Time Traveler's Trail" },
    { name: "The Global Citizen's Journey" },
    { name: "The Nature Navigator's Route" },
    { name: "The Empathy Expedition" },
    { name: "The Little Bookworms Journey" },
  ];

  const [booklist, setBooklist] = useState([]);

  // Your component logic goes here

  const handleView = async (item) => {
    // Logic for handling the view button click
    console.log("View button clicked for:", item.name);
    // Add your code here to handle the view button click
    const booklistData = await getBooksByRoadmap(item.name);
    setBooklist(booklistData);
  };

  // Group booklist by topic
  const groupedBooklist = booklist.reduce((acc, book) => {
    book.topics.forEach((topic) => {
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(book);
      console.log("acc", acc[topic]);
    });
    return acc;
  }, {});

  return (
    <div>
      {roadmapList.map((item, index) => (
        <div key={index}>
          {item.name}
          <button onClick={() => handleView(item)}>View</button>
        </div>
      ))}

      {Object.keys(groupedBooklist).map(
        (topic) =>
          topic && (
            <div className="mt-5" key={topic}>
              <h2>{topic}</h2>
              <ul>
                {groupedBooklist[topic].map((book, index) => (
                  <li key={index}>{book.title}</li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
};

export default RoadmapDashboard;
