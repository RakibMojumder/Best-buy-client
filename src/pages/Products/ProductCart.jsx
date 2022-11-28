import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import SmallSpinner from "../../components/SmallSpinner";
import { AuthContext } from "../../contexts/AuthProvider";

const ProductCart = ({ product, openModal, setBooking }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {
    _id,
    img,
    isVerified,
    configuration,
    location,
    name,
    originalPrice,
    postedTime,
    resalePrice,
    sellerEmail,
    sellersName,
    usedTime,
  } = product;

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
    <div className="grid grid-cols-12 md:gap-8 border mb-5 bg-white">
      <div className="col-span-12 md:col-span-3">
        <img className="" src={img} alt="" />
      </div>
      <div className="product-details col-span-12 md:col-span-6 space-y-1.5 p-2">
        <h1 className="text-xl font-semibold mt-3">{name}</h1>
        <p className="text-sm">{configuration}</p>
        <div className="md:flex justify-between">
          <p>
            Seller: {sellersName}{" "}
            {isVerified && (
              <FaCheckCircle className="inline-block text-blue-500 mb-1 ml-1" />
            )}
          </p>
          <p>Posted: {postedTime}</p>
        </div>
        <div className="md:flex justify-between">
          <p>Product used: {usedTime}</p>
          <p>Location: {location}</p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 space-y-2 p-3">
        <p>
          Original price: <del className="font-bold">${originalPrice}</del>
        </p>
        <p>
          Resale price:{" "}
          <span className="font-bold text-[#3749BB]">${resalePrice}</span>
        </p>
        <p>
          Product Status:{" "}
          <span className="font-bold">
            {product?.status ? "Sold" : "Available"}
          </span>
        </p>
        <button
          type="button"
          onClick={handleBooking}
          disabled={product?.status === "sold" && true}
          className={`${
            product.status === "sold" ? "bg-[#b1b9e9]" : "bg-[#3749BB]"
          } w-full text-white py-2 rounded-md`}
        >
          {product.status === "sold" ? "Sold" : "Book Now"}
        </button>
        <button
          disabled={product?.status === "sold" && true}
          onClick={() => handleWishList(product)}
          className="w-full bg-[#F49D1A] text-white py-2 rounded-md"
        >
          {loading ? <SmallSpinner /> : "Add To Wishlist"}
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
