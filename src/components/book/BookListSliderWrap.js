import React, { useState, useEffect, useContext } from "react";

import Slider from "../NetflixSlider";
const BookListSliderWrap = ({ sliderlist }) => {
  console.log(sliderlist);
  return (
    <div>
      {" "}
      <Slider>
        {sliderlist.map((movie) => (
          <Slider.Item movie={movie} key={movie.id}>
            <h1>TEST TEST</h1>
            item1
          </Slider.Item>
        ))}
      </Slider>
    </div>
  );
};

export default BookListSliderWrap;
