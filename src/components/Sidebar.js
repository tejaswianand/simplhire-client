import React from "react";
import Logo from "./Logo";
import { useData } from "../middlewares/dataContext";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const userType = localStorage.getItem("userType");
  const { userInfo } = useData();
  const location = useLocation();
  const currentPage = location.pathname.split("/")[2];

  return (
    <div className="border-r p-4">
      <div className="text-lg">
        <NavLink
          to="/company/home"
          className={`p-2 mb-2 flex items-center rounded hover:bg-blue-50 hover:text-blue-700 ${
            currentPage == "home" ? "text-blue-600 font-medium" : ""
          }`}
        >
          <i class="fa-solid fa-house"></i>&nbsp;Home
        </NavLink>
        <NavLink
          to="/company/users"
          className={`p-2 mb-2 flex items-center rounded hover:bg-blue-50 hover:text-blue-700 ${
            currentPage == "users" ? "text-blue-600 font-medium" : ""
          }`}
        >
          <i class="fa-solid fa-users"></i>&nbsp;Users
        </NavLink>
        <NavLink
          to="/company/roles"
          className={`p-2 mb-2 flex items-center rounded hover:bg-blue-50 hover:text-blue-700 ${
            currentPage == "roles" ? "text-blue-600 font-medium" : ""
          }`}
        >
          <i class="fa-solid fa-fingerprint"></i>&nbsp;Roles
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
