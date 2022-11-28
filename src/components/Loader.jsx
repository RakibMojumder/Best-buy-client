import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <HashLoader
        color="#0D4C92"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
