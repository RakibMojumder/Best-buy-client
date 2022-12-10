import React from "react";
import AllReviews from "./AllReviews";

const Reviews = ({ productId }) => {
  return (
    <div className="my-20 flex flex-col justify-center items-center">
      {/* <AddAReview productId={productId} /> */}
      <AllReviews id={productId} productId={productId} />
    </div>
  );
};

export default Reviews;
