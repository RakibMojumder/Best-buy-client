import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import AllSellers from "./Admin/AllSellers";
import MyOrders from "./Buyer/MyOrders";
import AddProduct from "./Seller/AddProduct";
import getStoredUser from "../../sharedAPI/getStoredUser";
import Loader from "../../components/Loader";

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
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader loading={loading} />
      </div>
    );
  }

  if (storedUser.role === "admin") {
    return <AllSellers />;
  }

  if (storedUser.role === "seller") {
    return <AddProduct />;
  }

  return <MyOrders />;
};

export default Dashboard;
