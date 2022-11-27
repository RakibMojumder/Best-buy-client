import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
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
  console.log(allBuyers.length);

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

  if (allBuyers.length < 1) {
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
          <Table.HeadCell>Action</Table.HeadCell>
          {/* <Table.HeadCell>Admin</Table.HeadCell> */}
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
              <Table.Cell>{buyer.name}</Table.Cell>
              <Table.Cell>{buyer.email}</Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => openModal(buyer)}
                  className="px-5 py-1 bg-red-100 text-red-500"
                >
                  Remove
                </button>
              </Table.Cell>
              {/* <Table.Cell>
                <button className="px-5 py-1 bg-green-100 text-green-500">
                  Make Admin
                </button>
              </Table.Cell> */}
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
