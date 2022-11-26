import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";
import { FaCheckCircle } from "react-icons/fa";

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
        if (data.success) {
          toast.success("Successfully deleted seller");
          refetch();
          closeModal();
        }
      });
  };

  const handleVerified = (seller) => {
    console.log(seller);
    fetch(`http://localhost:5000/verified/${seller._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(seller),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };

  if (allSellers.length < 1) {
    return (
      <h1 className="text-3xl uppercase mt-20 font-bold text-center text-slate-700">
        No Seller for you
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-3xl uppercase mb-6 font-bold text-center text-slate-700">
        All Sellers
      </h1>
      <div className=" rounded-lg border border-gray-200">
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
                  {seller.name}{" "}
                  {seller.verified && (
                    <FaCheckCircle className="text-blue-500 inline-block ml-1l mb-1" />
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                  {seller.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => openModal(seller)}
                      className="px-3 py-1 bg-red-100 text-red-500"
                    >
                      Remove
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-500">
                      Make Admin
                    </button>
                    {!seller.verified && (
                      <button
                        onClick={() => handleVerified(seller)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-500"
                      >
                        Make Verified
                      </button>
                    )}
                  </div>
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
    </>
  );
};

export default AllSellers;
