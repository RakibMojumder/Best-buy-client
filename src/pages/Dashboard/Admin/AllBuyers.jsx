import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
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
    const res = await axios.get(
      `https://best-buy-server.vercel.app/allBuyers?email=${user?.email}`,
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
    fetch(
      `https://best-buy-server.vercel.app/deleteUsers?email=${user?.email}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(deletedBuyer),
      }
    )
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
    fetch(`https://best-buy-server.vercel.app/verified/${seller._id}`, {
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

  const handleMakeAdmin = (buyer) => {
    fetch(`https://best-buy-server.vercel.app/allBuyers`, {
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
          refetch();
          toast.success("Make admin successful");
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (allBuyers?.length < 1) {
    return (
      <h1 className="text-3xl uppercase py-6 font-bold text-center text-slate-700">
        No Buyer for you
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-3xl uppercase py-6 font-bold text-center text-slate-700">
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
                    Make verified
                  </button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <ConfirmModal
          isOpen={isOpen}
          closeModal={closeModal}
          clickHandler={handleDeleteBuyer}
          item="Buyer"
        />
      </Table>
    </>
  );
};

export default AllBuyers;
