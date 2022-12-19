import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import ProductCart from "./ProductCart";

const CategoriesProduct = () => {
  const { brand } = useParams();

  const { data: products, isLoading } = useQuery(
    ["products", brand],
    async () => {
      const res = await axios.get(
        `https://best-buy-serever.vercel.app/products/${brand}`
      );
      return res.data.data;
    }
  );

  if (isLoading) {
    return;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mt-10 mb-6">Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products?.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesProduct;
