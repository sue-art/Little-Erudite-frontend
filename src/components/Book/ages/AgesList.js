import React, { Fragment } from "react";
const ageRanges = [
  {
    id: 1,
    name: "5 years under",
    imageSrc: "/books/sweetboy.png",
  },
  {
    id: 2,
    name: "6-8 years",
    imageSrc: "/books/bravegirl.png",
  },
  {
    id: 3,
    name: "9-12 years",
    imageSrc: "/books/justbecause.png",
  },
  {
    id: 4,
    name: "13-18 years",
    imageSrc: "/books/sweetboy.png",
  },
];

const AgesList = () => {
  return (
    <Fragment>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {ageRanges.map((age) => (
          <div className="flex flex-col items-center">
            <img src={age.imageSrc} alt={age.name} className="w-24 h-24" />
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {age.name}
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default AgesList;
