import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import GenresList from "../components/Book/genres/GenresList";
import SearchBar from "../components/Book/Search/SearchBar";
import BooksListContextProvider from "../components/Book/BookListContext";

import Avatar from "../components/Avata/Avata";
import TopicList from "../components/Roadmap/TopicList";
import Loader from "../components/Loader";

const initialRoadmap = [
  {
    id: 1 - 123,
    title: "The Little Bookworms Journey",
    slug: "the-little-bookworms-journey",
    avatarname: "Sam",
    color: "green",
    description:
      "It is designed to improve literacy in Year 1&2 children through enjoyable reading, encouraging parents, carers, and school staff to read aloud with them, featuring 30 new titles and reading tips.",
  },
  {
    id: 2 - 124,
    title: "The Literary Adventurer's Journey",
    slug: "the-literary-adventurers-journey",
    avatarname: "Dave",
    color: "pink",
    description:
      "The Literary Adventurer's Journey is the Year 5&6 Reading Road Map for ages 7-9 that will helps children aged 7-9 navigate their reading journey, discover new books, and develop their literary skills.",
  },
  {
    id: 3 - 125,
    title: "The Chapter Chaser's Journey",
    slug: "the-chapter-chasers-journey",
    color: "yellow",
    avatarname: "Sarah",
    description:
      "The Year 5&6 Reading Road Map, with 60 librarian-selected titles and a new non-fiction section, aims to boost literacy by encouraging children to explore diverse authors and genres.",
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
            <p className="mt-5 w-[500px]">{selectedRoadmap.description}</p>
          </center>
          <TopicList roadmapTitle={selectedRoadmap.title} />
        </div>
      </BooksListContextProvider>
    </Fragment>
  );
};

export default Roadmap;
