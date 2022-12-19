import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "../../../components/SmallSpinner";

const ProductsCategory = () => {
  const navigate = useNavigate();
  const { data: productCategory, isLoading } = useQuery([], async () => {
    const res = await axios.get(
      `https://best-buy-serever.vercel.app/productCategory`
    );
    return res.data.data;
  });

  const handleNavigate = (brand) => {
    navigate(`/category/${brand}`);
  };

  const handleSeeAllProducts = () => {
    navigate("/");
  };

  if (isLoading) {
    return <SmallSpinner />;
  }

  return (
    <div>
      <h1 className="text-lg font-bold text-center mt-10 dark:text-white">
        Featured <span className="dark:text-cyan-400">Category</span>
      </h1>
      <p className="mb-4 text-center dark:text-white">
        Get Your Desired Product!
      </p>
      <div>
        <ul className="">
          {productCategory?.map((category) => (
            <li
              key={category._id}
              onClick={() => handleNavigate(category.brand)}
              className="bg-white text-slate-700 text-center transition-all border-b border-b-slate-300 list-none py-1 hover:bg-[#3749BB] hover:text-white dark:hover:bg-cyan-400"
            >
              {category.brand}
            </li>
          ))}
          <li
            onClick={handleSeeAllProducts}
            className="bg-white text-slate-700 text-center transition-all border-b border-b-slate-300 list-none py-1 hover:bg-[#3749BB] hover:text-white dark:hover:bg-cyan-400"
          >
            All Products
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductsCategory;
