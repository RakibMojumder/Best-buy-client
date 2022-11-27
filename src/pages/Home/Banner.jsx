import { Carousel } from "flowbite-react";
import React from "react";
import "./Styles/styles.css";
import imgOne from "../../assets/banner-img/dell-SGY0LIfTKZ4-unsplash.jpg";
import imgTwo from "../../assets/banner-img/domenico-loia-hGV2TfOh0ns-unsplash.jpg";
import imgThree from "../../assets/banner-img/kari-shea-1SAnrIxw5OY-unsplash.jpg";

const Banner = () => {
  return (
    <div className="md:h-96 lg:h-[480px] mt-5 md:mt-10">
      <Carousel slideInterval={5000}>
        <div className="relative">
          <div className="carousel-content absolute w-full h-full flex flex-col justify-center px-8 md:px-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-50 text-center">
            <h1 className="md:text-xl font-bold text-center uppercase">
              Welcome to <br />{" "}
              <span className="text-3xl md:text-5xl text-[#3749BB] font-extrabold">
                best buy
              </span>
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
              veritatis et iure. Minus tempore magnam sapiente nisi eum eius
              alias!
            </p>
          </div>
          <div className="carousel-img">
            <img src={imgOne} alt="..." />
          </div>
        </div>
        <div className="relative">
          <div className="carousel-content absolute w-full h-full flex flex-col justify-center px-8 md:px-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-50 text-center">
            <h1 className="md:text-xl font-bold text-center uppercase">
              Welcome to <br />{" "}
              <span className="text-3xl md:text-5xl text-[#3749BB] font-extrabold">
                best buy
              </span>
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
              veritatis et iure. Minus tempore magnam sapiente nisi eum eius
              alias!
            </p>
          </div>
          <div className="carousel-img">
            <img src={imgTwo} alt="..." />
          </div>
        </div>
        <div className="relative">
          <div className="carousel-content absolute w-full h-full flex flex-col justify-center px-8 md:px-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-50 text-center">
            <h1 className="md:text-xl font-bold text-center uppercase">
              Welcome to <br />{" "}
              <span className="text-3xl md:text-5xl text-[#3749BB] font-extrabold">
                best buy
              </span>
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
              veritatis et iure. Minus tempore magnam sapiente nisi eum eius
              alias!
            </p>
          </div>
          <div className="carousel-img">
            <img src={imgThree} alt="..." />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
