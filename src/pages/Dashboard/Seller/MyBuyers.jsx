import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyBuyers = () => {
  const { user } = useContext(AuthContext);
  const { data: myBuyers, isLoading } = useQuery(
    ["myBuyers", user?.email],
    async () => {
      const res = await axios.get(
        `http://localhost:5000/myBuyers?email=${user?.email}`
      );
      console.log(res.data.data);
      return res;
    }
  );

  return (
    <div>
      <h1>My buyers</h1>
    </div>
  );
};

export default MyBuyers;
