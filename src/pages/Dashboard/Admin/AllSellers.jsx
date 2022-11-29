import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { Table } from "flowbite-react";

const AllSellers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletedSeller, setDeletedSeller] = useState();
  const { user } = useContext(AuthContext);
  const {
    data: allSellers,
    isLoading,
    refetch,
  } = useQuery(["allSellers"], async () => {
    const res = await axios.get(
      `https://best-buy-server.vercel.app/allSellers?email=${user?.email}`,
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

  function openModal(seller) {
    setIsOpen(true);
    setDeletedSeller(seller);
  }

  const handleDeleteSeller = () => {
    fetch(
      `https://best-buy-server.vercel.app/deleteUsers?email=${user?.email}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(deletedSeller),
      }
    )
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
    fetch(`https://best-buy-server.vercel.app/verified/${seller._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(seller),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Verified successfull");
        refetch();
      });
  };

  const handleMakeAdmin = (seller) => {
    fetch(`https://best-buy-server.vercel.app/allSellers`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(seller),
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
    return <Loader loading={isLoading} />;
  }

  if (allSellers?.length < 1) {
    return (
      <h1 className="text-xl md:text-3xl uppercase py-6 font-bold text-center text-slate-700">
        No Seller for you
      </h1>
    );
  }

  return (
    <div>
      <h1 className="text-3xl uppercase py-6 font-bold text-center text-slate-700">
        All Sellers
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
          {allSellers.map((seller) => (
            <Table.Row
              key={seller._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src={seller.userImg}
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>
                {seller.name}{" "}
                {seller.verified && (
                  <FaCheckCircle className="inline-block text-blue-500 mb-1 ml-1" />
                )}
              </Table.Cell>
              <Table.Cell>{seller.email}</Table.Cell>
              <Table.Cell>
                <FaTrash
                  onClick={() => openModal(seller)}
                  className="text-red-500 text-lg"
                />
              </Table.Cell>
              <Table.Cell>
                {seller.verified ? (
                  <button
                    onClick={() => handleMakeAdmin(seller)}
                    className="px-3 text-sm py-1 bg-green-100 text-green-500"
                  >
                    Make Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleVerified(seller)}
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
          handleClick={handleDeleteSeller}
          item="seller"
        />
      </Table>
    </div>
  );
};

export default AllSellers;
