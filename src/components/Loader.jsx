import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <HashLoader
      color="green"
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;