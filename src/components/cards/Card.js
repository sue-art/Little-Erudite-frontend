import React from "react";

const Card = ({ children, color }) => {
  const getColorClass = (color) => {
    switch (color) {
      case "pink":
        return "bg-pink";
      case "blue":
        return "bg-blue";
      case "purple":
        return "bg-purple";
      case "green":
        return "bg-green";
      case "yellow":
        return "bg-yellow";
      case "red":
        return "bg-red";
      case "orange":
        return "bg-orange";
      case "gray":
        return "bg-gray";
      default:
        return ""; // Default case if color doesn't match
    }
  };
  return (
    <div
      className={`px-5 py-2 pb-7 text-white border-gray-200 rounded-lg dark:border-gray-700 ${getColorClass(
        color
      )}`}
    >
      {children}
    </div>
  );
};

export default Card;
