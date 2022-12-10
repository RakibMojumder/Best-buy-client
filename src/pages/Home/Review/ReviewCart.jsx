import React from "react";
import StarComponent from "../../../components/StarComponent";

const ReviewCart = ({ review }) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-700 dark:text-white mb-8 drop-shadow-xl p-7 rounded-lg">
      <div className="reviewer-details flex items-center mb-5">
        <img className="h-14 rounded-full" src={review.userImg} alt="" />
        <div className="ml-3 flex-1 flex justify-between">
          <div>
            <p>
              Name: <span>{review.userName}</span>
            </p>
            <p>
              Email: <span>{review.userEmail}</span>
            </p>
          </div>
          <div>
            <StarComponent star={review.rating} />
            <span>{review.date}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-t-slate-400 pt-3">
        <p className="text-justify">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewCart;
