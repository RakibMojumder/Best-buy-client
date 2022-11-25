import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: myProducts, isLoading } = useQuery(
    ["myProducts", user?.email],
    async () => {
      const res = await axios.get(
        `http://localhost:5000/myProducts?email=${user?.email}`
      );
      console.log(res.data.data);
      return res.data.data;
    }
  );

  return (
    <div>
      <h1>MY products</h1>
    </div>
  );
};

export default MyProducts;
