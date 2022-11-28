import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import getStoredUser from "../../sharedAPI/getStoredUser";

const Sidebar = () => {
  const { user, show, setShow } = useContext(AuthContext);
  const [storedUser, setStoredUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStoredUser(user?.email).then((res) => {
      setStoredUser(res);
      setLoading(false);
    });

    return () => setShow(false);
  }, [user, setShow]);

  if (loading) {
    return;
  }

  return (
    <>
      <div className="hidden md:block w-full p-3 divide-y-2 divide-slate-400 space-y-2 h-full bg-slate-50 text-gray-800">
        <div className="flex items-center p-2 space-x-4 mt-10">
          <img
            src={user?.photoURL}
            alt=""
            className="w-12 h-12 rounded-full bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
            <span className="flex items-center space-x-1">
              <Link
                rel="noopener noreferrer"
                className="text-xs hover:underline text-gray-400"
              >
                View profile
              </Link>
            </span>
          </div>
        </div>
        <div className="divide-y-4 divide-gray-700">
          <ul className="pt-8 pb-4 space-y-1 text-sm">
            {storedUser?.role === "admin" ? (
              <>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/admin"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    Admin
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/allSellers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    All Sellers
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/allBuyers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    All Buyers
                  </NavLink>
                </li>
                <li className="text-center textba">
                  <NavLink
                    to="/dashboard/reportedItem"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    Reported Item
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/addProduct"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    Add A Product
                  </NavLink>
                </li>
                <li className="text-center textba">
                  <NavLink
                    to="/dashboard/myProducts"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    My products
                  </NavLink>
                </li>
              </>
            ) : storedUser?.role === "seller" ? (
              <>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/addProduct"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    Add A Product
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/myProducts"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    My Products
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/myBuyers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    My Buyers
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/myOrders"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    My orders
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/wishlist"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
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
      {/* 
    
    
    */}
      <div
        className={`md:hidden h-full p-3 space-y-2 w-60 min-h-full bg-white text-white${
          show
            ? "block translate-x-0 transition-all ease-linear duration-500"
            : "hidden -translate-x-72 duration-500"
        }`}
      >
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
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/admin"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    Admin
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/allSellers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    All Sellers
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/allBuyers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    All Buyers
                  </NavLink>
                </li>
                <li className="text-center textba">
                  <NavLink
                    to="/dashboard/reportedItem"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    Reported Item
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/allBuyers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    Add A Product
                  </NavLink>
                </li>
                <li className="text-center textba">
                  <NavLink
                    to="/dashboard/reportedItem"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    My products
                  </NavLink>
                </li>
              </>
            ) : storedUser?.role === "seller" ? (
              <>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/addProduct"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    Add A Product
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/myProducts"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    My Products
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/myBuyers"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    My Buyers
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/myOrders"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
                    }
                  >
                    My orders
                  </NavLink>
                </li>
                <li className="text-center textba mb-3">
                  <NavLink
                    to="/dashboard/wishlist"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#3749BB] text-white block py-2 text-center"
                        : undefined
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
    </>
  );
};

export default Sidebar;
