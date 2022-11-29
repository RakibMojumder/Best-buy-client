import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import getStoredUser from "../../sharedAPI/getStoredUser";
import wishListIcon from "../../assets/icons/love.png";
import orderListIcon from "../../assets/icons/order.png";
import adminIcon from "../../assets/icons/admin.png";
import sellersIcon from "../../assets/icons/sellers.png";
import buyersIcon from "../../assets/icons/buyers.png";
import reportIcon from "../../assets/icons/report.png";
import addProductIcon from "../../assets/icons/addProduct.png";
import myProductsIcon from "../../assets/icons/myProduct.png";

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
    return;
  }

  return (
    <>
      <div className="hidden md:block w-full p-3 divide-y-2 divide-slate-400 space-y-2 h-screen bg-slate-50 text-gray-800">
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
          <ul className="pt-8 pb-4 space-y-4 text-sm">
            {storedUser?.role === "admin" ? (
              <>
                <li className="flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={adminIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/allAdmin"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      Admin
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={sellersIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/allSellers"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      All Sellers
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={buyersIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/allBuyers"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      All Buyers
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={reportIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/reportedItem"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      Reported Item
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={addProductIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/addProduct"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      Add A Product
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={myProductsIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/myProducts"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      My Products
                    </NavLink>
                  </span>
                </li>
              </>
            ) : storedUser?.role === "seller" ? (
              <>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={addProductIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/addProduct"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      Add A Product
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={myProductsIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/myProducts"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      My Products
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={buyersIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/myBuyers"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      My Buyers
                    </NavLink>
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={orderListIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/myOrders"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      My Orders
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <img className="h-5 ml-auto" src={wishListIcon} alt="" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/wishList"
                      className={({ isActive }) =>
                        isActive ? "text-[#3749BB] font-bold block" : undefined
                      }
                    >
                      My WishList
                    </NavLink>
                  </span>
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
