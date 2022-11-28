import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import React, { useContext } from "react";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const { data: allAdmin, isLoading } = useQuery(
    ["admin", user?.email],
    async () => {
      const res = await axios.get(
        `https://best-buy-server.vercel.app/admin?email=${user?.email}`,
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

  if (allAdmin?.length < 1) {
    return (
      <h1 className="text-3xl uppercase py-6 font-bold text-center text-slate-700">
        Admin list is empty
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-3xl uppercase py-6 font-bold text-center text-slate-700">
        All Admins
      </h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allAdmin.map((admin) => (
            <Table.Row
              key={admin._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src={admin.userImg}
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>{admin.name}</Table.Cell>
              <Table.Cell>{admin.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default Admin;
