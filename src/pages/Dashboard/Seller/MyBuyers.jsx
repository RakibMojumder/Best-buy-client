import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyBuyers = () => {
  const { user } = useContext(AuthContext);
  const { data: myBuyers, isLoading } = useQuery(
    ["myBuyers", user?.email],
    async () => {
      const res = await axios.get(
        `http://localhost:5000/myBuyers?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
          },
        }
      );
      return res.data.data;
    }
  );

  if (isLoading) {
    return;
  }

  if (myBuyers.length < 1) {
    return (
      <h1 className="text-2xl text-slate-700 py-6 text-center uppercase font-bold">
        You don't have any buyer's yet
      </h1>
    );
  }

  return (
    <div className="pt-6">
      <h1 className="text-xl text-slate-700 font-bold my-4">My buyers</h1>
      <div className="overflow-hidden overflow-x-auto rounded-lg bwish bwish-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Phone
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Location
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {myBuyers.map((buyer) => (
              <tr key={buyer._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {buyer.customerName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                  {buyer.customerEmail}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                  {buyer.customerPhone}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-bold">
                  ${buyer.meetingLocation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBuyers;
