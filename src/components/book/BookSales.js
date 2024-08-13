import React, { Fragment } from "react";

const BookSales = ({ amazon, booktopia }) => {
  console.log("amazon", amazon);
  return (
    <Fragment>
      <div>
        <a href={amazon.link} target="_blank" rel="noopener noreferrer">
          <button className="bg-green hover:bg-pink text-white font-bold py-2 px-4 mr-4 rounded-full">
            <span>{amazon.price}</span> - Buy on Amazon
          </button>
        </a>
        <a href={booktopia.link} target="_blank" rel="noopener noreferrer">
          <button className="bg-green hover:bg-pink text-white font-bold py-2 px-4 mr-4 rounded-full">
            <span>{booktopia.price}</span> - Buy on Booktopia
          </button>
        </a>
      </div>
    </Fragment>
  );
};

export default BookSales;
