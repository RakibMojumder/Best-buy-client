import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import SmallSpinner from "../../../components/SmallSpinner";
import AddAReview from "./AddAReview";
import ReviewCart from "./ReviewCart";

const AllReviews = ({ id, productId }) => {
  const {
    data: allReviews,
    isLoading,
    refetch,
  } = useQuery(["reviews", id], async () => {
    const res = await axios.get(
      `https://best-buy-serever.vercel.app/reviews/${id}`
    );
    return res.data.data;
  });

  if (isLoading) {
    return <SmallSpinner />;
  }

  return (
    <div className="my-28 w-full md:1/3 lg:w-1/2 mx-auto">
      <AddAReview refetch={refetch} productId={productId} />
      <div className="mt-20">
        {allReviews?.map((review) => (
          <ReviewCart key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
