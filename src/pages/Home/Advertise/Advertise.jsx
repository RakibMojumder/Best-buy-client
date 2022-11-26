import { Carousel } from "flowbite-react";
import React from "react";

const Advertise = () => {
  return (
    <div className="h-96">
      <Carousel slideInterval={5000}>
        <img
          className=" w-full"
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt="..."
        />
        <img
          className=" w-full"
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <img
          className=" w-full"
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <img
          className=" w-full"
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <img
          className=" w-full"
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
        />
      </Carousel>
    </div>
  );
};

export default Advertise;
