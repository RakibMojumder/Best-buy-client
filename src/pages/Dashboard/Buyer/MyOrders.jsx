import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
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
      <h1 className="text-xl md:text-2xl text-slate-700 font-bold py-6 text-center up">
        Your order list is empty
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-2xl text-slate-700 font-bold text-center py-5 uppercase">
        Your Order List
      </h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {myOrders?.map((order) => (
            <Table.Row
              key={order?._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img className="h-9" src={order?.productImg} alt="" />
              </Table.Cell>
              <Table.Cell>
                {order?.productName.length > 20
                  ? order.productName.slice(0, 20)
                  : order.productName}
              </Table.Cell>
              <Table.Cell>${order?.productPrice}</Table.Cell>
              <Table.Cell>
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
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Elements stripe={stripePromise}>
        <PaymentModal
          isOpen={isOpen}
          closeModal={closeModal}
          bookedOrder={bookedOrder}
          refetch={refetch}
        />
      </Elements>
    </>
  );
};

export default MyOrders;
