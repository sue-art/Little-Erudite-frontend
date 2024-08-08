import React from "react";

const avata_list = [
  {
    name: "John",
    imageUrl: "/characters/John.png",
    altText: "John",
  },
  {
    name: "Sam",
    imageUrl: "/characters/sam.png",
    altText: "Sam",
  },
  {
    name: "Dave",
    imageUrl: "/characters/dave.png",
    altText: "Dave",
  },
  {
    name: "Sarah",
    imageUrl: "/characters/sarah.png",
    altText: "Sarah",
  },
  { name: "Mark", imageUrl: "/characters/mark.png", altText: "Mark" },
];

const image_size = {
  small: "h-10 w-10",
  medium: "h-[110px] w-[110px]",
  large: "h-18 w-18",
};

const Avatar = ({ name, size }) => {
  const { imageUrl, altText } = avata_list.find((avata) => avata.name === name);
  const imageSize = image_size[size] || image_size.medium;

  return (
    <img
      src={imageUrl}
      alt={altText}
      className={`${imageSize} rounded-full max-h-full max-w-full object-contain`}
    />
  );
};

export default Avatar;
