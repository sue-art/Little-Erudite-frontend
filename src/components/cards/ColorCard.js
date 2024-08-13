import React from "react";

const ColorCard = ({ children, bgColor, bgImage }) => {
  const colorCardStyle = {
    backgroundColor: bgColor || "transeparent", // Default to purple if bgColor is not provided
    color: "white",
    backgroundImage: `url(${bgImage})`, // Set background image using CSS
    backgroundSize: "cover", // Cover the entire div without stretching the image
    backgroundPosition: "center", // Center the background image
    width: "400px", // Set a fixed width
    height: "230px", // Set a fixed height
    display: "flex", // Use Flexbox
    flexDirection: "column", // Stack children vertically
    justifyContent: "space-between", // Distribute space evenly
    alignItems: "center", // Center items horizontally
    padding: "20px", // Add some padding
    overflow: "hidden", // Prevent content from overflowing
  };

  return (
    <div
      className="max-w-sm p-6 m-3 border-gray-200 rounded-lg shadow dark:border-gray-700"
      style={colorCardStyle} // Apply the style object here
    >
      {children}
    </div>
  );
};

export default ColorCard;
