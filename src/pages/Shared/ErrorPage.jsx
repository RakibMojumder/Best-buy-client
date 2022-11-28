import React from "react";
import Lottie from "lottie-react";
import errorLottie from "../../assets/img/91351-404-error-page-animation-with-sky.json";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Lottie animationData={errorLottie} loop={true} />
      <Link to="/" className="bg-[#3749BB] text-white px-12 py-2 rounded-md">
        Back To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
