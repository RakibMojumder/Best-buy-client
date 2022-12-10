import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();
  const { _id, img, name, resalePrice, originalPrice } = product;

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={() => handleNavigate(_id)}
      className="h-[370px] relative shadow-md bg-white dark:bg-slate-700/[0.6] dark:text-white"
    >
      <div className="border-b dark:border-b-slate-600">
        <img className="h-[200px] w-full" src={img} alt="" />
      </div>
      <div className="product-details p-3">
        <h1 className="text-base font-semibold hover:underline hover:text-[#3749BB] dark:hover:text-white">
          {name}
        </h1>
        <div className="absolute w-full left-5 bottom-5 flex items-center">
          <p className="mr-5 text-[#3749BB] dark:text-cyan-400 text-xl font-bold">
            ${resalePrice}
          </p>
          <p className="text-lg">
            <del>${originalPrice}</del>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
