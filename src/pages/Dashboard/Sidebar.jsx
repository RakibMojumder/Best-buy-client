import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import getStoredUser from "../../sharedAPI/getStoredUser";

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-full p-3 space-y-2 w-60 min-h-full bg-gray-900 text-gray-100">
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
              <li className="text-center mb-3">
                <NavLink
                  to="/dashboard/allSellers"
                  className={({ isActive }) =>
                    isActive ? "bg-lime-500 block py-2 text-center" : undefined
                  }
                >
                  All Sellers
                </NavLink>
              </li>
              <li className="text-center mb-3">
                <NavLink
                  to="/dashboard/allBuyers"
                  className={({ isActive }) =>
                    isActive ? "bg-lime-500 block py-2 text-center" : undefined
                  }
                >
                  All Buyers
                </NavLink>
              </li>
              <li className="text-center">
                <NavLink
                  to="/dashboard/reportedItem"
                  className={({ isActive }) =>
                    isActive ? "bg-lime-500 block py-2 text-center" : undefined
                  }
                >
                  Reported Item
                </NavLink>
              </li>
            </>
          ) : storedUser.role === "seller" ? (
            <>
              <li className="text-center mb-3">
                <NavLink
                  to="/dashboard/addProduct"
                  className={({ isActive }) =>
                    isActive ? "bg-lime-500 block py-2 text-center" : undefined
                  }
                >
                  Add A Product
                </NavLink>
              </li>
              <li className="text-center mb-3">
                <NavLink
                  to="/dashboard/myProducts"
                  className={({ isActive }) =>
                    isActive ? "bg-lime-500 block py-2 text-center" : undefined
                  }
                >
                  My Products
                </NavLink>
              </li>
              <li className="text-center mb-3">
                <NavLink
                  to="/dashboard/myBuyers"
                  className={({ isActive }) =>
                    isActive ? "bg-lime-500 block py-2 text-center" : undefined
                  }
                >
                  My Buyers
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="text-center mb-3">
                <NavLink
                  to="/dashboard/myOrders"
                  className={({ isActive }) =>
                    isActive ? "bg-lime-500 block py-2 text-center" : undefined
                  }
                >
                  My orders
                </NavLink>
              </li>
              <li className="text-center mb-3">
                <NavLink
                  to="/dashboard/wishlist"
                  className={({ isActive }) =>
                    isActive ? "bg-lime-500 block py-2 text-center" : undefined
                  }
                >
                  My wishlist
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
