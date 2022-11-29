import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";
import { AuthContext } from "../../../contexts/AuthProvider";
import { FaCheck } from "react-icons/fa";
import Loader from "../../../components/Loader";
import { Table } from "flowbite-react";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState();

  const {
    data: myProducts,
    isLoading,
    refetch,
  } = useQuery(["myProducts", user?.email], async () => {
    const res = await axios.get(
      `https://best-buy-server.vercel.app/myProducts?email=${user?.email}`
    );
    return res.data.data;
  });

  if (isLoading) {
    return <Loader />;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(id) {
    setIsOpen(true);
    setProductId(id);
  }

  const handleDeleteProduct = () => {
    fetch(`https://best-buy-server.vercel.app/myProducts/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("successfully deleted the product");
          closeModal();
          refetch();
        }
      });
  };

  const handleAds = (product) => {
    fetch(`https://best-buy-server.vercel.app/advertise`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Advertise ${product.name}`);
          refetch();
        }
      });
  };

  if (myProducts?.length === 0) {
    return (
      <h1 className="text-xl md:text-2xl text-slate-700 py-6 text-center uppercase font-bold">
        You don't add any product yet
      </h1>
    );
  }

  return (
    <div>
      <h1 className="text-2xl text-slate-700 py-6 ml-4 uppercase font-bold">
        My Products
      </h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {myProducts.map((product) => (
            <Table.Row
              key={product?._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src={product.img}
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>
                {product?.name.length > 20
                  ? product.name.slice(0, 20)
                  : product.name}
              </Table.Cell>
              <Table.Cell>
                {product.status === "sold"
                  ? "Sold"
                  : product.status === "booked"
                  ? "Booked"
                  : "Not booked yet"}
              </Table.Cell>
              <Table.Cell>${product.resalePrice}</Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => openModal(product._id)}
                  className="px-3 bg-red-100 text-red-500 mr-3"
                >
                  Remove
                </button>
                {product.advertise ? (
                  <p className="bg-blue-100 text-blue-500 px-3 inline-block">
                    Ads <FaCheck className="inline-block text-xs mb-1 ml-1" />{" "}
                  </p>
                ) : (
                  <button
                    onClick={() => handleAds(product)}
                    className="px-4 bg-blue-100 text-blue-500"
                  >
                    Ads
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
        clickHandler={handleDeleteProduct}
      />
    </div>
  );
};

export default MyProducts;
