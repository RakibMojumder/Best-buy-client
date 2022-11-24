import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import ProductCart from "./ProductCart";

const Products = () => {
  const { id } = useParams();

  const { data: products, isLoading } = useQuery(["products", id], async () => {
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    return res.data.data;
  });

  if (isLoading) {
    return;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCart key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
