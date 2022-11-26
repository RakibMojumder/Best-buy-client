import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";

const AllSellers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletedSeller, setDeletedSeller] = useState();
  const { user } = useContext(AuthContext);
  const {
    data: allSellers,
    isLoading,
    refetch,
  } = useQuery(["allSellers"], async () => {
    const res = await axios.get(`http://localhost:5000/allSellers`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
      },
    });
    return res.data.data;
  });

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(seller) {
    setIsOpen(true);
    setDeletedSeller(seller);
    console.log(deletedSeller);
  }

  const handleDeleteSeller = () => {
    fetch(`http://localhost:5000/deleteUsers?email=${user?.email}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(deletedSeller),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Successfully deleted seller");
          refetch();
          closeModal();
        }
      });
  };

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
            <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"></th>
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
                <button
                  onClick={() => openModal(seller)}
                  className="px-3 py-1 bg-red-100 text-red-500"
                >
                  Remove
                </button>
              </td>
              <td>
                <button className="px-3 py-1 bg-green-100 text-green-500">
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
        clickHandler={handleDeleteSeller}
        item="Seller"
      />
    </div>
  );
};

export default AllSellers;
