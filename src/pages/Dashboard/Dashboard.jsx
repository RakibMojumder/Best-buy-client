import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import getStoredUser from "../../Hooks/getStoredUser";
import HashLoader from "react-spinners/ClipLoader";
import AllSellers from "./Admin/AllSellers";
import MyOrders from "./Buyer/MyOrders";
import AddProduct from "./Seller/AddProduct";

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
        <HashLoader
          color="red"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
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
