import React from "react";
import ReactStars from "react-rating-stars-component";

const Ratings = ({ rating, setRating }) => {
  const reviewRating = {
    size: 30,
    count: 5,
    isHalf: true,
    value: rating,
    color: "black",
    halfIcon: <i className="fa fa-star-half-alt" />,
    activeColor: "#02B8BC",
    onChange: (newValue) => {
      setRating(newValue);
    },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-gray-200 text-2xl w-14 h-14 flex justify-center items-center rounded-full">
        <span className="text-blue-600 font-bold">{rating}</span>
      </div>
      <ReactStars {...reviewRating} />
    </div>
  );
};

export default Ratings;
