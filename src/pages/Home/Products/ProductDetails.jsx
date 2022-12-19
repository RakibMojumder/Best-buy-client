import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import wishListIcon from "../../../assets/icons/wishlist.png";
import Reviews from "../Review/Reviews";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import SmallSpinner from "../../../components/SmallSpinner";
import BookingModal from "../../../components/BookingModal";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: product, isLoading } = useQuery(["product", id], async () => {
    const res = await axios.get(
      `https://best-buy-serever.vercel.app/product/${id}`
    );
    return res.data.data;
  });

  if (isLoading) {
    return <Loader />;
  }

  function closeModal() {
    setIsOpen(!isOpen);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  const handleBooking = () => {
    setBooking(product);
    openModal();
  };

  // Handle my wish list
  const handleWishList = (product) => {
    setLoading(true);
    fetch("https://best-buy-server.vercel.app/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...product, customerEmail: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        toast.success("This product added in the wishlist");
      });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14 pb-9 bg-white dark:bg-slate-600 dark:bg-opacity-20 dark:text-white mt-14">
        <div className="product-img md:col-span-4">
          <img className="w-full" src={product?.img} alt="" />
        </div>
        <div className="product-details md:col-span-8 space-y-4 p-3 pr-10 my-auto">
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <div className="flex items-center justify-between flex-wrap">
            <p className="bg-violet-200 dark:bg-gray-200 dark:text-slate-900 px-5 py-1 rounded-full text-sm mb-3">
              Resale Price:{" "}
              <span className="font-bold">${product?.resalePrice}</span>
            </p>
            <p className="bg-violet-200 dark:bg-gray-200 dark:text-slate-900 px-5 py-1 rounded-full text-sm mb-3">
              Original Price:{" "}
              <span className="font-bold">${product?.originalPrice}</span>
            </p>
            <p className="bg-violet-200 dark:bg-gray-200 dark:text-slate-900 px-5 py-1 rounded-full text-sm mb-3">
              Status:{" "}
              <span className="font-bold">
                {product?.status === "sold" ? "Stock Out" : "In Stock"}
              </span>
            </p>
            <p className="bg-violet-200 dark:bg-gray-200 dark:text-slate-900 px-5 py-1 rounded-full text-sm mb-3">
              Brand:{" "}
              <span className="font-bold">{product?.productCategory}</span>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Configuration:</h3>
            <p className="text-sm">{product?.configuration}</p>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <p>
              Seller: <span>{product?.sellersName}</span>
            </p>
            <p>
              Used Time: <span>{product?.usedTime}</span>
            </p>
            <p>
              Posted Date: <span>{product?.postedTime}</span>
            </p>
          </div>
          <div className="flex flex-wrap">
            <button
              onClick={handleBooking}
              disabled={product?.status === "sold" ? true : false}
              className={`flex items-center px-8 py-2 text-white mb-3 mr-6 ${
                product?.status === "sold" ? "bg-violet-300" : "bg-violet-500"
              }`}
            >
              <FaCartPlus className="mr-2" />
              Book Now
            </button>
            <button
              onClick={() => handleWishList(product)}
              disabled={product?.status === "sold" ? true : false}
              className={`flex items-center px-8 py-2 text-white mb-3 mr-6 ${
                product?.status === "sold" ? "bg-[#ead580]" : "bg-yellow-400"
              }`}
            >
              <img className="h-5 mr-2" src={wishListIcon} alt="" />
              {loading ? <SmallSpinner /> : "Add To Wishlist"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <Reviews productId={id} />
      </div>
      <BookingModal isOpen={isOpen} closeModal={closeModal} booking={booking} />
    </div>
  );
};

export default ProductDetails;
