"use client";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHome, IoDocument, IoLogOut, IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { akun } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="flex flex-col p-4 mt-16 h-screen pl-4 border">
      <h5 className="text-lg font-bold mb-2">General</h5>
      <ul className="list-none mb-4">
        <li>
          <NavLink
            to={"/dashboard"}
            className="flex items-center hover:bg-gray-200 mb-2"
          >
            <IoHome className="mr-2 mb" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/headerpenilaian"}
            className="flex items-center hover:bg-gray-200"
          >
            <IoDocument className="mr-2" />
            Header Penilaian
          </NavLink>
        </li>
      </ul>
      {akun && akun.akun_role === "Admin" && (
        <div>
          <h5 className="text-lg font-bold mb-2">Admin</h5>
          <ul className="list-none mb-4">
            <li>
              <NavLink
                to={"/akun"}
                className="flex items-center hover:bg-gray-200"
              >
                <IoPerson className="mr-2" />
                Akun
              </NavLink>
            </li>
          </ul>
          <ul className="list-none mb-4">
            <li>
              <NavLink
                to={"/pejabat"}
                className="flex items-center hover:bg-gray-200"
              >
                <IoPerson className="mr-2" />
                Pejabat
              </NavLink>
            </li>
          </ul>
          <ul className="list-none mb-4">
            <li>
              <NavLink
                to={"/mahasiswa"}
                className="flex items-center hover:bg-gray-200"
              >
                <IoPerson className="mr-2" />
                Mahasiswa
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <h5 className="text-lg font-bold mb-2">Settings</h5>
      <ul className="list-none mb-4">
        <li>
          <button
            onClick={logout}
            className="bg-white hover:bg-gray-200 text-gray-800 rounded flex items-center"
          >
            <IoLogOut className="mr-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
