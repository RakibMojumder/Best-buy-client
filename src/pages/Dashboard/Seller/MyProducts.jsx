import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: myProducts, isLoading } = useQuery(
    ["myProducts", user?.email],
    async () => {
      const res = await axios.get(
        `http://localhost:5000/myProducts?email=${user?.email}`
      );
      return res.data.data;
    }
  );

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
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Price
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {myProducts.map((product) => (
            <tr key={product._id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                <img
                  className="h-12 w-12 rounded-full"
                  src={product.img}
                  alt=""
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                {product.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                {product.status === "sold"
                  ? "Sold"
                  : product.status === "booked"
                  ? "Booked"
                  : "Not booked yet"}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                ${product.resalePrice}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                <button className="px-3 bg-red-100 text-red-500 mr-3">
                  Remove
                </button>
                <button className="px-4 bg-blue-100 text-blue-500">Ads</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
