import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import getStoredUser from "../../Hooks/getStoredUser";
import AddProduct from "./AddProduct";
import AllSellers from "./AllSellers";
import MyOrders from "./MyOrders";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [storedUser, setStoredUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStoredUser(user?.email).then((res) => {
      setStoredUser(res);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (storedUser.role === "admin") {
    return <AllSellers />;
  }

  if (storedUser.role === "sellers") {
    return <AddProduct />;
  }

  return <MyOrders />;
};

export default Dashboard;
