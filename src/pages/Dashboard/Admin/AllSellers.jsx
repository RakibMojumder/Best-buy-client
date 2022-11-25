import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllSellers = () => {
  const { data: allSellers, isLoading } = useQuery(["allSellers"], async () => {
    const res = await axios.get(`http://localhost:5000/allSellers`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
      },
    });
    return res.data.data;
  });

  if (isLoading) {
    return <h1 className="text-5xl">Loading</h1>;
  }

  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">
              Image
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">
              Email
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {allSellers.map((seller) => (
            <tr key={seller._id}>
              <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                <img
                  className="h-12 w-12 rounded-full"
                  src={seller.userImg}
                  alt=""
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                {seller.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                {seller.email}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                <button className="px-5 py-1 bg-red-100 text-red-500">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellers;
