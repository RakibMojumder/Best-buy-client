import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import React, { useContext } from "react";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyBuyers = () => {
  const { user } = useContext(AuthContext);
  const { data: myBuyers, isLoading } = useQuery(
    ["myBuyers", user?.email],
    async () => {
      const res = await axios.get(
        `https://best-buy-server.vercel.app/myBuyers?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
          },
        }
      );
      return res.data.data;
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (myBuyers.length < 1) {
    return (
      <h1 className="text-xl md:text-2xl text-slate-700 py-6 text-center uppercase font-bold">
        You don't have any buyer's yet
      </h1>
    );
  }

  return (
    <div className="pt-6">
      <h1
        className="text-xl text-slate-700 font-bold
       my-4"
      >
        My buyers
      </h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {myBuyers.map((buyer) => (
            <Table.Row
              key={buyer?._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {buyer.customerName}
              </Table.Cell>
              <Table.Cell>{buyer.customerEmail}</Table.Cell>
              <Table.Cell>{buyer.customerPhone}</Table.Cell>
              <Table.Cell>{buyer.meetingLocation}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MyBuyers;
