import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import ConfirmModal from "../../../components/ConfirmModal";
import Loader from "../../../components/Loader";
import SmallSpinner from "../../../components/SmallSpinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const AllBuyers = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [deletedBuyer, setDeletedBuyer] = useState();
  const [loading, setLoading] = useState(false);
  const {
    data: allBuyers,
    isLoading,
    refetch,
  } = useQuery(["allBuyers"], async () => {
    const res = await axios.get(
      `http://localhost:5000/allBuyers?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        },
      }
    );
    return res.data.data;
  });

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
          toast.success("Successfully deleted buyer");
          refetch();
          closeModal();
        }
      });
  };

  const handleVerified = (seller) => {
    setLoading(true);
    fetch(`http://localhost:5000/verified/${seller._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(seller),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        toast.success("Verified successful");
        refetch();
      });
  };

  const handleMakeAdmin = (buyer) => {
    fetch(`http://localhost:5000/allBuyers`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(buyer),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Make admin successful");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (allBuyers?.length < 1) {
    return (
      <h1 className="text-xl md:text-3xl uppercase py-6 font-bold text-center text-slate-700 dark:text-white">
        No Buyer for you
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-3xl uppercase py-6 font-bold text-center text-slate-700 dark:text-white">
        All Buyers
      </h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Remove</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allBuyers.map((buyer) => (
            <Table.Row
              key={buyer._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src={buyer.userImg}
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>
                {buyer.name}{" "}
                {buyer.verified && (
                  <FaCheckCircle className="inline-block text-blue-500 mb-1 ml-1" />
                )}
              </Table.Cell>
              <Table.Cell>{buyer.email}</Table.Cell>
              <Table.Cell>
                <FaTrash
                  onClick={() => openModal(buyer)}
                  className="text-red-500 text-lg"
                />
              </Table.Cell>
              <Table.Cell>
                {buyer.verified ? (
                  <button
                    onClick={() => handleMakeAdmin(buyer)}
                    className="px-3 text-sm py-1 bg-green-100 text-green-500"
                  >
                    Make Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleVerified(buyer)}
                    className="px-3 py-1 bg-green-100 text-blue-500"
                  >
                    {loading ? <SmallSpinner /> : "Make verified"}
                  </button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ConfirmModal
        isOpen={isOpen}
        closeModal={closeModal}
        clickHandler={handleDeleteBuyer}
        item="Buyer"
      />
    </>
  );
};

export default AllBuyers;
