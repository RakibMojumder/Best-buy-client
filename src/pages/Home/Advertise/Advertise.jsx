import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Carousel } from "flowbite-react";
import ProductCart from "../../Products/ProductCart";
import BookingModal from "../../../components/BookingModal";

const Advertise = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState({});
  const {
    data: advertise,
    isLoading,
    refetch,
  } = useQuery(["advertise"], async () => {
    const res = await axios.get("https://best-buy-server.vercel.app/advertise");
    return res.data.data;
  });

  if (isLoading) {
    return;
  }

  function closeModal() {
    setIsOpen(!isOpen);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  if (isLoading) {
    return;
  }

  if (advertise) {
    return;
  }

  return (
    <div className="py-20">
      <Carousel slideInterval={5000}>
        {advertise.map((product) => (
          <ProductCart
            key={product._id}
            product={product}
            openModal={openModal}
            setBooking={setBooking}
          />
        ))}
      </Carousel>
      <BookingModal
        isOpen={isOpen}
        closeModal={closeModal}
        booking={booking}
        refetch={refetch}
      />
    </div>
  );
};

export default Advertise;
