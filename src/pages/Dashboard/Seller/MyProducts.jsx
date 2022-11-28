import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";
import { AuthContext } from "../../../contexts/AuthProvider";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import Loader from "../../../components/Loader";

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

  console.log(myProducts);

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
          closeModal();
          refetch();
          toast.success("successfully deleted the product");
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
          refetch();
          toast.success(`Advertise ${product.name}`);
        }
      });
  };

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={isOpen}
        closeModal={closeModal}
        clickHandler={handleDeleteProduct}
      />
    </div>
  );
};

export default MyProducts;
