import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";

const AllBuyers = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [deletedBuyer, setDeletedBuyer] = useState();
  const {
    data: allBuyers,
    isLoading,
    refetch,
  } = useQuery(["allBuyers"], async () => {
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

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(buyer) {
    setIsOpen(true);
    setDeletedBuyer(buyer);
  }

  const handleDeleteBuyer = () => {
    fetch(`http://localhost:5000/deleteUsers?email=${user?.email}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(deletedBuyer),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Successfully deleted seller");
          refetch();
          closeModal();
        }
      });
  };

  if (AllBuyers.length === 0) {
    return (
      <h1 className="text-3xl uppercase mt-20 font-bold text-center text-slate-700">
        No Buyer for you
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-3xl uppercase mb-6 font-bold text-center text-slate-700">
        All Byers
      </h1>
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
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
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
                  <button
                    onClick={() => openModal(buyer)}
                    className="px-5 py-1 bg-red-100 text-red-500"
                  >
                    Remove
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                  <button className="px-5 py-1 bg-green-100 text-green-500">
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmModal
          isOpen={isOpen}
          closeModal={closeModal}
          clickHandler={handleDeleteBuyer}
          item="Buyer"
        />
      </div>
    </>
  );
};

export default AllBuyers;
