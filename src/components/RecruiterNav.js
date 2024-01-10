import React from "react";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

const RecruiterNav = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="p-4 flex justify-between bg-green-900 items-center">
      <div className="text-white rounded w-fit p-2 ">
        <Logo />
      </div>
      <div className="hidden lg:flex gap-5 text-white">
        <div className={`p-2 px-4 rounded`}>
          <NavLink to="/recruiter/home">Home</NavLink>
        </div>
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
      </div>
      <div className="flex lg:hidden bg-white text-black w-9 h-9 justify-center items-center rounded">
        <i class="fa-solid fa-bars"></i>
      </div>
    </div>
  );
};

export default RecruiterNav;
