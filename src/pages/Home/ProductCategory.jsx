import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ProductCategory = () => {
  const { data: categories, isLoading } = useQuery(
    ["productCategory"],
    async () => {
      const res = await axios.get("http://localhost:5000/productCategory");
      return res.data.data;
    }
  );

  if (isLoading) {
    return;
  }

  return (
    <div>
      <h1 className="text-3xl text-center my-3 font-bold">
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
