import React from "react";

const ProductCart = ({ product }) => {
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

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-3">
        <img className="w-full h-full" src={img} alt="" />
      </div>
      <div className="product-details col-span-6 space-y-1.5 p-2">
        <h1 className="text-xl">{name}</h1>
        <p className="text-sm">{configuration}</p>
        <div className="flex justify-between">
          <p>Seller: {sellersName}</p>
          <p>Posted: {postedTime}</p>
        </div>
        <div className="flex justify-between">
          <p>Product used: {usedTime}</p>
          <p>Location: {location}</p>
        </div>
      </div>
      <div className="col-span-3 space-y-2 border p-3">
        <p>Original price: {originalPrice}</p>
        <p>Resale price: {resalePrice}</p>
        <button className="w-full bg-[#2b6777] text-white py-2 rounded-md">
          Book Now
        </button>
        <button className="w-full bg-[#d1bb2b] text-white py-2 rounded-md">
          Add To Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
