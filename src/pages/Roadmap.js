import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import GenresList from "../components/book/genres/GenresList";
import SearchBar from "../components/book/Search/SearchBar";
import BooksListContextProvider from "../components/book/BookListContext";

import Avatar from "../components/avata/Avata";
import TopicList from "../components/roadmap/TopicList";
import Loader from "../components/Loader";

const initialRoadmap = [
  {
    id: 1 - 123,
    title: "The Little Bookworms Journey",
    slug: "the-little-bookworms-journey",
    avatarname: "Sam",
    color: "green",
    description:
      "It is designed to improve literacy in Year 1&2 children through enjoyable It is designed to enhance literacy in Year 1 and 2 children, promoting enjoyable reading and encouraging parents and carers to engage in effective conversations with them.",
  },
  {
    id: 2 - 124,
    title: "The Literary Adventurer's Journey",
    slug: "the-literary-adventurers-journey",
    avatarname: "Dave",
    color: "pink",
    description:
      "It is designed to improve literacy in Year 3 and 4 children, helping them on their reading journey, discovering new books, and developing their literary skills.",
  },
  {
    id: 3 - 125,
    title: "The Chapter Chaser's Journey",
    slug: "the-chapter-chasers-journey",
    color: "yellow",
    avatarname: "Sarah",
    description:
      "It is the Year 5 and 6 Reading Road Map. Librarian-selected titles and a new non-fiction section aim to boost literacy by encouraging children to explore diverse authors and genres.",
  },
];
const Roadmap = () => {
  const { id } = useParams();
  const roadmap = initialRoadmap; // Assuming this is defined elsewhere
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRoadmap = useCallback(
    (roadmapData) => {
      if (id) {
        const selectedRoadmapData = roadmapData.find(
          (item) => item.slug === id
        );
        setSelectedRoadmap(selectedRoadmapData);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchRoadmap(roadmap);
    setLoading(false);
  }, [fetchRoadmap, roadmap]);

  if (loading) return <Loader />;

  return (
    <Fragment>
      <BooksListContextProvider>
        <div className="mt-20">
          <GenresList />
          <SearchBar />
          <center>
            <h1 className="text-2xl font-bold my-5">{selectedRoadmap.title}</h1>
            <Avatar name={selectedRoadmap.avatarname} size={"medium"} />
            <p className="mt-5 xs:w-full sm:w-1/2">
              {selectedRoadmap.description}
            </p>
          </center>
          <TopicList roadmapTitle={selectedRoadmap.title} />
        </div>
      </BooksListContextProvider>
    </Fragment>
  );
};

export default Roadmap;
