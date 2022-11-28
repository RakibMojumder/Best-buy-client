import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

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
    return <Loader />;
  }

  return (
    <div className="py-28">
      <h1 className="text-3xl text-[#3749BB] text-center mb-6 font-bold uppercase">
        Select The Category
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories?.map((category) => (
          <Link
            to={`/category/${category.brand}`}
            className="bg-white shadow-md text-center py-2 rounded-lg"
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
