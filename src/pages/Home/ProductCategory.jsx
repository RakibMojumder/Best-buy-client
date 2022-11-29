import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SmallSpinner from "../../components/SmallSpinner";

const ProductCategory = () => {
  const { data: categories, isLoading } = useQuery(
    ["productCategory"],
    async () => {
      const res = await axios.get(
        "https://best-buy-server.vercel.app/productCategory"
      );
      return res.data.data;
    }
  );

  if (isLoading) {
    return <SmallSpinner />;
  }

  return (
    <div className="py-14 md:py-28">
      <h1 className="text-3xl text-slate-700 text-center mb-6 font-bold uppercase">
        Select The Category
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories?.map((category) => (
          <Link
            to={`/category/${category.brand}`}
            className="bg-[#495ac8] text-white shadow-md text-center py-2 rounded-lg transition-all hover:bg-white hover:text-[#495ac8]"
            key={category._id}
          >
            {category.brand}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
