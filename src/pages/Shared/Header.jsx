import React, { Fragment, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import logoImg from "../../assets/img/logo.png";
import getStoredUser from "../../sharedAPI/getStoredUser";
import { FaCaretDown, FaCaretUp, FaMoon } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { ThemeContext } from "../../contexts/ThemeProvider";

const Header = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useState(null);
  const [showDd, setShowDd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStoredUser(user?.email).then((res) => {
      setStoredUser(res);
      setLoading(false);
    });
  }, [user]);

  const handleLogOut = () => {
    logOut().then(() => {
      localStorage.removeItem("Best-buy-token");
      navigate("/login");
      toast.success("you have been log out now");
    });
  };

  const handleDropDown = () => {
    setShowDd(!showDd);
  };

  if (loading) {
    return;
  }

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 dark:bg-transparent dark:text-cyan-500">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img className="h-10 w-10" src={logoImg} alt="" />
            <Link
              to="/"
              className="flex-none text-2xl ml-4 uppercase font-bold sm:text-center dark:text-white "
            >
              Best Buy
            </Link>
          </div>
          <div className="sm:hidden flex items-center">
            <div className="mr-5">
              {theme ? (
                <FaMoon onClick={toggleTheme} className="text-lg" />
              ) : (
                <HiSun onClick={toggleTheme} className="text-xl text-white" />
              )}
            </div>
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
            <NavLink
              to="/"
              className="font-medium text-gray-600 hover:text-gray-400 dark:text-white dark:hover:text-white"
              aria-current="page"
            >
              Home
            </NavLink>

            {/* dropdown */}
            {user && (
              <button
                onClick={handleDropDown}
                type="button"
                className="hs-collapse inline-block text-left md:hidden rounded-md font-medium bg-white dark:bg-slate-800 text-gray-700 dark:text-white align-middle"
              >
                Dashboard{" "}
                {showDd ? (
                  <FaCaretDown className="inline-block ml-1 text-xl mb-1" />
                ) : (
                  <FaCaretUp className="inline-block ml-1 text-xl mb-1" />
                )}
              </button>
            )}

            {/* dropdown menu */}

            <div
              className={`hs-collapse md:hidden overflow-hidden transition-all duration-300 basis-full grow sm:block flex flex-col space-y-3 pl-5 ${
                showDd ? "block" : "hidden"
              }`}
            >
              {storedUser?.role === "admin" ? (
                <>
                  <li className="text-left list-none font-semibold dark:text-white">
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
                  </li>
                  <li className="text-left list-none font-semibold dark:text-white mb-3">
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
                  </li>
                  <li className="text-left list-none font-semibold dark:text-white mb-3">
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
                  </li>
                  <li className="text-left list-none font-semibold dark:text-white">
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
                  </li>
                  <li className="text-left list-none font-semibold dark:text-white mb-3">
                    <NavLink
                      to="/dashboard/Admin/addProduct"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      Add A Product
                    </NavLink>
                  </li>
                  <li className="text-left list-none font-semibold dark:text-white">
                    <NavLink
                      to="/dashboard/Admin/myProducts"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      My products
                    </NavLink>
                  </li>
                </>
              ) : storedUser?.role === "seller" ? (
                <>
                  <li className="text-left list-none font-semibold dark:text-white">
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
                  </li>
                  <li className="text-left list-none font-semibold dark:text-white mb-3">
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
                  </li>
                  <li className="text-left list-none font-semibold dark:text-white mb-3">
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
                  </li>
                </>
              ) : (
                <>
                  <li className="text-left list-none font-semibold dark:text-white">
                    <NavLink
                      to="/dashboard/myOrders"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      My orders
                    </NavLink>
                  </li>
                  <li className="text-left list-none font-semibold dark:text-white mb-3">
                    <NavLink
                      to="/dashboard/wishlist"
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#3749BB] dark:text-cyan-400 font-bold block"
                          : undefined
                      }
                    >
                      My wishlist
                    </NavLink>
                  </li>
                </>
              )}
            </div>

            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="hidden md:block font-medium text-gray-600 hover:text-gray-400 dark:text-white  dark:hover:text-white"
                >
                  Dashboard
                </NavLink>
                <div>
                  <button
                    onClick={handleLogOut}
                    className="font-medium text-gray-600 hover:text-gray-400 dark:text-white dark:hover:text-white"
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="font-medium text-gray-600 hover:text-gray-400 dark:text-white  dark:hover:text-white"
                >
                  Log in
                </NavLink>
              </>
            )}
            <div className="hidden md:block">
              {theme ? (
                <FaMoon onClick={toggleTheme} className="text-lg" />
              ) : (
                <HiSun onClick={toggleTheme} className="text-xl text-white" />
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
