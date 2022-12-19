import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import Ratings from "./Ratings";

const AddAReview = ({ productId, refetch }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const review = e.target.review.value;

    const reviewDetails = {
      productId,
      review,
      rating: rating,
      userName: user?.displayName,
      userEmail: user?.email,
      userImg: user?.photoURL,
      date: format(new Date(), "PP"),
    };

    // Post review to database
    const res = await axios.post(
      "https://best-buy-serever.vercel.app/reviews",
      reviewDetails
    );
    if (res.data.success) {
      toast.success("Review added successfully");
      refetch();
      e.target.reset();
    }
  };

  return (
    <div className="py-10 border-t border-t-slate-500 border-b border-b-slate-500">
      <Ratings rating={rating} setRating={setRating} />
      <h1 className="text-lg uppercase font-semibold my-5">Add A Review</h1>
      <form onSubmit={handleSubmitReview}>
        <textarea
          className="w-full rounded-md shadow-lg dark:text-slate-700 border-slate-400 focus:border focus:border-slate-600 focus:ring-0"
          name="review"
          id=""
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 block mt-3 px-10 py-1 text-white rounded-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAReview;
