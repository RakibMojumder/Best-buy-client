import React from "react";
import Advertise from "./Advertise/Advertise";
import Banner from "./Banner";
import Contact from "./Contact";
import ProductCategory from "./ProductCategory";

const Home = () => {
  return (
    <>
      <Banner />
      <ProductCategory />
      <Advertise />
      <Contact />
    </>
  );
};

export default Home;
