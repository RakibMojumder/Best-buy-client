import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import Loader from "../../../components/Loader";
import WishListPaymentModal from "../../../components/WishListPaymentModal";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [wishProduct, setWishProduct] = useState({});
  const {
    data: wishList,
    isLoading,
    refetch,
  } = useQuery(["wishlist", user?.email], async () => {
    const res = await axios.get(
      `https://best-buy-serever.vercel.app/wishlist?email=${user?.email}`,
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

  const handleClick = (wish) => {
    openModal();
    setWishProduct(wish);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (wishList?.length === 0) {
    return (
      <h1 className="text-xl md:text-2xl text-slate-700 dark:text-white font-bold py-6 text-center uppercase">
        Your wish list is empty
      </h1>
    );
  }

  return (
    <div>
      <h1 className="text-2xl text-slate-700 dark:text-white font-bold text-center py-5 uppercase">
        Your Wish List
      </h1>

      <Table>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Product Condition</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {wishList?.map((wish) => (
            <Table.Row
              key={wish?._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img className="h-10" src={wish?.img} alt="" />
              </Table.Cell>
              <Table.Cell>{wish?.name}</Table.Cell>
              <Table.Cell>{wish?.productCondition}</Table.Cell>
              <Table.Cell>${wish?.resalePrice}</Table.Cell>
              <Table.Cell>
                {wish?.status === "paid" ? (
                  <button className="bg-green-100 text-green-500 px-5 py-1 rounded">
                    Paid
                  </button>
                ) : (
                  <button
                    onClick={() => handleClick(wish)}
                    className="bg-red-100 text-red-500 px-5 py-1 rounded"
                  >
                    Purchase
                  </button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <WishListPaymentModal
        isOpen={isOpen}
        closeModal={closeModal}
        order={wishProduct}
        refetch={refetch}
      />
    </div>
  );
};

export default MyWishList;
