import { Navbar } from "flowbite-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogIn = () => {
    logOut().then(() => {
      localStorage.removeItem("Best-buy-token");
      navigate("/login");
      toast.success("you have been log out now");
    });
  };
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {user ? (
          <button onClick={handleLogIn} className="text-left">
            Log out
          </button>
        ) : (
          <NavLink>Log in</NavLink>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
