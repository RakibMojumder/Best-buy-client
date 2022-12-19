import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Carousel } from "flowbite-react";
import BookingModal from "../../../components/BookingModal";
import AdvertiseCart from "./AdvertiseCart";
import Loader from "../../../components/Loader";

const Advertise = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState({});
  const {
    data: advertise,
    isLoading,
    refetch,
  } = useQuery(["advertise"], async () => {
    const res = await axios.get(
      "https://best-buy-serever.vercel.app/advertise"
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
    return <Loader />;
  }

  return (
    <>
      {advertise ? (
        <>
          <Carousel slideInterval={5000}>
            {advertise?.map((product) => (
              <AdvertiseCart
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
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Advertise;
