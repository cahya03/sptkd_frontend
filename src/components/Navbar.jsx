import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { akun } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      <nav
        className="fixed top-0 w-full h-16 bg-maroon shadow-md flex justify-between items-center z-10"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="flex items-center">
          <NavLink to="/dashboard" className="ml-4">
            <img src={logo} width="40" height="40" alt="logo" />
          </NavLink>
        </div>

        <div
          id="navbarBasicExample"
          className="hidden md:flex justify-end items-center"
        >
          <div className="mr-4">
            <button
              onClick={logout}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
