import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import Loader from "../../../components/Loader";
import PaymentModal from "../../../components/PaymentModal";
import { AuthContext } from "../../../contexts/AuthProvider";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [bookedOrder, setBookedOrder] = useState({});

  const {
    data: myOrders,
    isLoading,
    refetch,
  } = useQuery(["bookings", user?.email], async () => {
    const res = await axios.get(
      `https://best-buy-server.vercel.app/bookings?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        },
      }
    );
    return res.data.data;
  });

  function closeModal() {
    setIsOpen(!isOpen);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  const handleClick = (order) => {
    openModal();
    setBookedOrder(order);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (myOrders?.length === 0) {
    return (
      <h1 className="text-2xl text-slate-700 font-bold py-6 text-center">
        Your order list is empty
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-2xl text-slate-700 font-bold text-center py-5">
        Your Order List
      </h1>
      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {myOrders?.map((order) => (
              <tr key={order._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <img className="h-8" src={order?.productImg} alt="" />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-semibold">
                  {order.productName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800 font-bold">
                  ${order.productPrice}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-800">
                  {order?.status === "paid" ? (
                    <button className="bg-green-100 text-green-500 px-5 py-1 rounded">
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClick(order)}
                      className="bg-red-100 text-red-500 px-5 py-1 rounded"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Elements stripe={stripePromise}>
          <PaymentModal
            isOpen={isOpen}
            closeModal={closeModal}
            order={bookedOrder}
            refetch={refetch}
          />
        </Elements>
      </div>
    </>
  );
};

export default MyOrders;
