import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllBuyers = () => {
  const { data: allBuyers, isLoading } = useQuery(["allBuyers"], async () => {
    const res = await axios.get(`http://localhost:5000/allBuyers`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
      },
    });
    return res.data.data;
  });

  if (isLoading) {
    return;
  }

  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Image
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Email
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {allBuyers.map((buyer) => (
            <tr key={buyer._id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                <img
                  className="h-12 w-12 rounded-full"
                  src={buyer.userImg}
                  alt=""
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                {buyer.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                {buyer.email}
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

export default AllBuyers;
