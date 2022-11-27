import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const {
    data: wishList,
    isLoading,
    refetch,
  } = useQuery(["wishlist", user?.email], async () => {
    const res = await axios.get(
      `http://localhost:5000/wishlist?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        },
      }
    );

    return res.data.data;
  });

  if (isLoading) {
    return;
  }

  if (wishList.length === 0) {
    return (
      <h1 className="text-2xl text-slate-700 font-bold py-6 text-center">
        Your wish list is empty
      </h1>
    );
  }

  return (
    <div>
      <h1 className="text-2xl text-slate-700 font-bold text-center py-5">
        Your Wish List
      </h1>
      <div className="overflow-hidden overflow-x-auto rounded-lg bwish bwish-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Product condition
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {wishList.map((wish) => (
              <tr key={wish._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <img className="h-10" src={wish?.img} alt="" />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                  {wish.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                  {wish.productCondition}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-bold">
                  ${wish.resalePrice}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                  <button className="bg-lime-500 px-5 py-1 rounded">
                    Purchase
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishList;
