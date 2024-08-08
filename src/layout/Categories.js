import React from "react";
import CardWithBackgroundImage from "../components/Cards/CardWithBackgroundImage";

const CategoryList = [
  {
    id: 1,
    name: "Dog Man",
    value: "all",
    color: "green",
    image: "/books/dog_man.png",
  },
  {
    ie: 2,
    name: "The Bad Guys",
    value: "Animals",
    color: "pink",
    image: "/books/bad_guys.png",
  },
  {
    id: 3,
    name: "Cat Kid",
    value: "Biography",
    color: "yellow",
    image: "/books/cat_kid.png",
  },
  {
    id: 4,
    name: "Storey treehouse",
    value: "Music",
    color: "orange",
    image: "/books/treehouse.png",
  },
  {
    id: 5,
    name: "Diary of a Wimpy Kid",
    value: "General",
    color: "purple",
    image: "/books/wimpy_kid.png",
  },
  {
    id: 6,
    name: "AHN DO",
    value: "General",
    color: "green",
    image: "/books/anh_do.png",
  },

  {
    id: 7,
    name: "Roald Dahl",
    value: "General",
    color: "pink",
    image: "/books/roald_dahl.png",
  },
  {
    id: 8,
    name: "Pigeon",
    value: "General",
    color: "yellow",
    image: "/books/pigeon.png",
  },
  {
    id: 9,
    name: "Dr. Seuss",
    value: "General",
    color: "orange",
    image: "/books/cat_in_hat.png",
  },
  {
    id: 10,
    name: "General",
    value: "General",
    color: "pink",
    image: "/books/bad_guys.png",
  },
  {
    id: 11,
    name: "General",
    value: "General",
    color: "gray",
    image: "/books/dog_man.png",
  },
];
// Utility function to generate URL slugs
const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const Categories = () => {
  return (
    <div className="relative px-30">
      <h2 className="text-2xl mt-5 font-bold tracking-tight text-gray-900">
        By categories
      </h2>

      <div className="flex items-center justify-center py-5 flex-wrap">
        {CategoryList.map((list) => (
          <CardWithBackgroundImage
            key={list.id}
            image={list.image}
            color={list.color}
            link={`/category/${generateSlug(list.name)}`}
          ></CardWithBackgroundImage>
        ))}
      </div>
    </div>
  );
};

export default Categories;
