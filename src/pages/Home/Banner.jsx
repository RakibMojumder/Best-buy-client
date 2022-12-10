import { Carousel } from "flowbite-react";
import React from "react";
import imgOne from "../../assets/banner-img/dell-SGY0LIfTKZ4-unsplash.jpg";
import imgTwo from "../../assets/banner-img/domenico-loia-hGV2TfOh0ns-unsplash.jpg";
import imgThree from "../../assets/banner-img/kari-shea-1SAnrIxw5OY-unsplash.jpg";

const Banner = () => {
  return (
    <div className="md:h-96 lg:h-[480px] mt-5 md:mt-10">
      <Carousel slideInterval={5000}>
        <div className="carousel-img">
          <img src={imgOne} alt="..." />
        </div>
        <div className="carousel-img">
          <img src={imgTwo} alt="..." />
        </div>
        <div className="carousel-img">
          <img src={imgThree} alt="..." />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
