import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import getStoredUser from "../../sharedAPI/getStoredUser";
import { HiUserGroup, HiUsers } from "react-icons/hi";
import { AiOutlineInbox } from "react-icons/ai";
import { GoListUnordered } from "react-icons/go";
import { RiHeartAddFill } from "react-icons/ri";
import {
  MdAdminPanelSettings,
  MdReport,
  MdOutlineAddBox,
} from "react-icons/md";

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
      <div className="hidden md:block w-full p-3 divide-y-2 divide-slate-400 space-y-2 h-screen bg-slate-50 dark:bg-gray-900 dark:bg-opacity-30 dark:text-white text-gray-800">
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
                    <MdAdminPanelSettings className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/allAdmin"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      Admin
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    {/* <img className="text-2xl ml-auto" src={sellersIcon} alt="" /> */}
                    <HiUserGroup className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/allSellers"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      All Sellers
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <HiUsers className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/allBuyers"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      All Buyers
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <MdReport className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/reportedItem"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      Reported Item
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <MdOutlineAddBox className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/addProduct"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      Add A Product
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <AiOutlineInbox className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/admin/myProducts"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
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
                    <MdOutlineAddBox className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/addProduct"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      Add A Product
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <AiOutlineInbox className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/myProducts"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      My Products
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <HiUsers className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/myBuyers"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
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
                    <GoListUnordered className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/myOrders"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      My Orders
                    </NavLink>
                  </span>
                </li>
                <li className="mb-3 flex items-center justify-center gap-4">
                  <div className="w-[25%]">
                    <RiHeartAddFill className="text-2xl ml-auto" />
                  </div>
                  <span className="text-left flex-1 font-semibold">
                    <NavLink
                      to="/dashboard/wishList"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
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
