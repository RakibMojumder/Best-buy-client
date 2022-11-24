import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import getStoredUser from "../../Hooks/getStoredUser";

const Sidebar = () => {
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

  console.log(storedUser);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-full p-3 space-y-2 w-60 bg-gray-900 text-gray-100">
      <div className="flex items-center p-2 space-x-4">
        <img
          src={user?.photoURL}
          alt=""
          className="w-12 h-12 rounded-full bg-gray-500"
        />
        <div>
          <h2 className="text-lg font-semibold">{user?.displayName}</h2>
          <span className="flex items-center space-x-1">
            <a
              rel="noopener noreferrer"
              href="/"
              className="text-xs hover:underline text-gray-400"
            >
              View profile
            </a>
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-700">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          {storedUser?.role === "admin" ? (
            <>
              <li>
                <Link to="/allSellers">All Sellers</Link>
              </li>
              <li>
                <Link to="/allUsers">All Users</Link>
              </li>
              <li>
                <Link to="/reportedItem">Reported Item</Link>
              </li>
            </>
          ) : storedUser.role === "seller" ? (
            <>
              <li>
                <Link to="/addProduct">Add A Product</Link>
              </li>
              <li>
                <Link to="/myProducts">My Products</Link>
              </li>
              <li>
                <Link to="/myByers">My Byers</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/myOrders">My orders</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
