import React from "react";

const ProductCart = ({ product, openModal, setBooking }) => {
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
    fetch("http://localhost:5000/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

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
        {product?.status === "sold" && <p>Sold</p>}
        <button
          type="button"
          onClick={handleBooking}
          disabled={product?.status === "sold" && true}
          className={`${
            product.status === "sold" ? "bg-red-200" : ""
          } w-full bg-[#296218] text-white py-2 rounded-md`}
        >
          {product.status === "sold" ? "Sold" : "Book Now"}
        </button>
        <button
          disabled={product?.status === "sold" && true}
          onClick={() => handleWishList(product)}
          className="w-full bg-[#d1bb2b] text-white py-2 rounded-md"
        >
          Add To Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
