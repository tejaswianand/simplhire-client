import React from "react";
import Logo from "./Logo";
import { NavLink, useLocation } from "react-router-dom";
import { useData } from "../middlewares/dataContext";

const NavOne = () => {
  const location = useLocation();
  const activePage = location.pathname.split("/")[2];
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const { userInfo } = useData();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="p-4 flex justify-between bg-green-900">
      <div className="text-white rounded w-fit p-2 ">
        <Logo />
      </div>
      <div className="hidden lg:flex gap-5 text-white">
        <div className={`p-2 px-4 rounded`}>
          <NavLink to="/">
            <i class="fa-solid fa-house"></i>&nbsp;Home
          </NavLink>
        </div>
        <div className={`p-2 px-4 rounded`}>
          <NavLink to="/jobs">
            <i class="fa-solid fa-laptop-file"></i>&nbsp;Jobs
          </NavLink>
        </div>
        {userId && userType == "candidate" ? (
          <>
            <div className={`p-2 px-4 rounded`}>
              <NavLink to="/profile">
                <i class="fa-solid fa-user"></i>
                &nbsp;{userInfo.name}
              </NavLink>
            </div>
            <div onClick={() => handleLogout()} className={`p-2 px-4 rounded`}>
              Logout&nbsp;<i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
          </>
        ) : userId && userType == "recruiter" ? (
          <>
            {" "}
            <div className={`p-2 px-4 rounded`}>
              <NavLink to="/recruiter/jobs/posted">Posted Jobs</NavLink>
            </div>
            <div className={`p-2 px-4 rounded`}>
              <NavLink to="/recruiter/applications/all">Applications</NavLink>
            </div>
            <div className={`p-2 px-4 rounded`}>
              <NavLink to="/recruiter/profile">Profile</NavLink>
            </div>
            <div onClick={() => handleLogout()} className={`p-2 px-4 rounded`}>
              Logout
            </div>
          </>
        ) : (
          <>
            {" "}
            <div
              className={`border p-2 px-4 rounded ${
                activePage == "login"
                  ? "text-green-900 bg-white hover:bg-slate-100"
                  : "text-white hover:bg-white hover:text-black"
              }`}
            >
              <NavLink to="/auth/login">Login</NavLink>
            </div>
            <div
              className={`border border p-2 px-4 rounded ${
                activePage == "signup"
                  ? "text-green-900 bg-white hover:bg-slate-100"
                  : "text-white hover:bg-white hover:text-black"
              }`}
            >
              <NavLink to="/auth/signup">Signup</NavLink>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-2 lg:hidden">
        {" "}
        <div className="flex lg:hidden bg-white text-black px-4 h-9 justify-center items-center rounded">
          <NavLink to="/jobs">Jobs</NavLink>
        </div>
        <div className="flex lg:hidden bg-white text-black w-9 h-9 justify-center items-center rounded">
          <i class="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  );
};

export default NavOne;
