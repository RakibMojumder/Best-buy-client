import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const StarComponent = ({ star }) => {
  return (
    <div className="flex space-x-1 text-lg text-cyan-400">
      {[...Array(5).keys()].map((value, index) => {
        const num = index + 1;
        if (star >= num) {
          // return <FaStar key={index} />;
          return <IoIosStar key={index} />;
        } else if (star < num && star > num - 1) {
          // return <FaStarHalfAlt key={index} />;
          return <IoIosStarHalf key={index} />;
        } else {
          return <IoIosStarOutline key={index} />;
        }
      })}
    </div>
  );
};

export default StarComponent;
