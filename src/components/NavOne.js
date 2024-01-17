import React, { useState } from "react";
import Logo from "./Logo";
import { NavLink, useLocation } from "react-router-dom";
import { useData } from "../middlewares/dataContext";

const NavOne = () => {
  const location = useLocation();
  const { validToken } = useData();
  const activePage = location.pathname.split("/")[2];
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const { userInfo } = useData();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="p-3 lg:px-8 flex justify-between items-center border-b">
        <div className="text-black rounded w-fit p-2 ">
          <Logo />
        </div>
        <div className="hidden lg:flex gap-8 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          {validToken && userType == "candidate" ? (
            <>
              <NavLink to="/profile">
                <i class="fa-solid fa-user"></i>
                &nbsp;{userInfo.name}
              </NavLink>

              <div onClick={() => handleLogout()}>Logout</div>
            </>
          ) : validToken && userType == "recruiter" ? (
            <>
              <NavLink to="/recruiter/jobs/posted">Posted Jobs</NavLink>
              <NavLink to="/recruiter/applications/all">Applications</NavLink>
              <NavLink to="/recruiter/profile">Profile</NavLink>
              <div onClick={() => handleLogout()}>Logout</div>
            </>
          ) : (
            <>
              <NavLink to="/auth/login">
                Login <i class="fa-solid fa-lock"></i>
              </NavLink>
              <NavLink
                className="bg-green-600 hover:bg-green-700 text-white  p-2 rounded-full px-4"
                to="/auth/signup"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
        <div className="flex gap-2 lg:hidden">
          <div
            className="flex lg:hidden bg-white text-black w-9 h-9 justify-center items-center rounded"
            onClick={toggleSidebar}
          >
            {isOpen ? (
              <i class="fa-solid fa-bars"></i>
            ) : (
              <i class="fa-solid fa-bars"></i>
            )}
          </div>
        </div>
      </div>
      {isOpen && <div className="overlay-2" onClick={closeSidebar}></div>}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content bg-white text-black">
          <div className="flex flex-col gap-5 text-black">
            <NavLink to="/">
              <i class="fa-solid fa-house"></i>&nbsp;Home
            </NavLink>
            <NavLink to="/jobs">
              <i class="fa-solid fa-laptop-file"></i>&nbsp;Jobs
            </NavLink>
            {validToken && userType == "candidate" ? (
              <>
                <NavLink to="/profile">
                  <i class="fa-solid fa-user"></i>
                  &nbsp;{userInfo.name}
                </NavLink>

                <div onClick={() => handleLogout()}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;
                  Logout
                </div>
              </>
            ) : validToken && userType == "recruiter" ? (
              <>
                <NavLink to="/recruiter/jobs/posted">Posted Jobs</NavLink>

                <NavLink to="/recruiter/applications/all">Applications</NavLink>

                <NavLink to="/recruiter/profile">Profile</NavLink>

                <div onClick={() => handleLogout()}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;
                  Logout
                </div>
              </>
            ) : (
              <>
                <NavLink to="/auth/login">
                  <i class="fa-solid fa-lock"></i> Login
                </NavLink>
                <NavLink to="/auth/signup">
                  <i class="fa-solid fa-user-plus"></i> Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavOne;
