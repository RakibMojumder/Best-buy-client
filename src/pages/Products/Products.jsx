import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../../components/BookingModal";
import ProductCart from "./ProductCart";

const Products = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState({});

  const { data: products, isLoading } = useQuery(["products", id], async () => {
    const res = await axios.get(
      `https://best-buy-server.vercel.app/products/${id}`
    );
    return res.data.data;
  });

  function closeModal() {
    setIsOpen(!isOpen);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  if (isLoading) {
    return;
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold text-slate-700 uppercase my-3">
        Products For {id}
      </h1>
      {products.map((product) => (
        <ProductCart
          key={product._id}
          product={product}
          openModal={openModal}
          setBooking={setBooking}
        />
      ))}
      <BookingModal isOpen={isOpen} closeModal={closeModal} booking={booking} />
    </div>
  );
};

export default Products;
