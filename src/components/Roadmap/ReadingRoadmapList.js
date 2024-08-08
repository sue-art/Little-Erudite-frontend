import React from "react";
import Card from "../Cards/Card";
import IconArrowRight from "../Icons/IconArrowRight";
import Avatar from "../Avata/Avata";

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

const ReadingRoadmapList = () => {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl pb-10">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
        {initialRoadmap.map((roadmap) => (
          <Card color={roadmap.color} key={roadmap.id}>
            <div className="flex items-center justify-center w-20 h-20 my-6 mt-6">
              <Avatar name={roadmap.avatarname} size={"medium"} />
            </div>
            <h3 className="mb-2 text-xl text-white font-bold">
              {roadmap.title}
            </h3>
            <p className="mb-3 font-normal text-sm text-white">
              {roadmap.description}
            </p>
            <a
              href={`/roadmap/${roadmap.slug}`}
              className="float-right inline-flex items-center px-3 py-2 text-sm font-medium text-center text-green bg-white rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <IconArrowRight />
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReadingRoadmapList;
