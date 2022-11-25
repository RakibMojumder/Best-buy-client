import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: myProducts, isLoading } = useQuery();

  return (
    <div>
      <h1>MY products</h1>
    </div>
  );
};

export default MyProducts;
