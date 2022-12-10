import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "../../../components/SmallSpinner";
import { IoMdArrowDropdown } from "react-icons/io";

const ProductsCategory = () => {
  const navigate = useNavigate();
  const [showCategory, setShowCategory] = useState(false);
  const { data: productCategory, isLoading } = useQuery([], async () => {
    const res = await axios.get(`http://localhost:5000/productCategory`);
    return res.data.data;
  });

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  };

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
        <div
          onClick={handleShowCategory}
          className="bg-white p-2 mb-2 text-slate-700 flex justify-between items-center"
        >
          Select Category <IoMdArrowDropdown className="text-2xl" />{" "}
        </div>
        <ul className={`${showCategory ? "h-full" : "hidden"}`}>
          {productCategory?.map((category) => (
            <li
              key={category._id}
              onClick={() => handleNavigate(category.brand)}
              className="bg-white text-slate-700 text-center transition-all border-b border-b-slate-300 list-none py-1 hover:bg-[#3749BB] hover:text-white"
            >
              {category.brand}
            </li>
          ))}
          <li
            onClick={handleSeeAllProducts}
            className="bg-white text-slate-700 text-center transition-all list-none py-1 hover:bg-[#3749BB] hover:text-white"
          >
            All Products
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductsCategory;
