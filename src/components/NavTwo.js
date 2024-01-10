import React from "react";
import { useData } from "../middlewares/dataContext";
import Logo from "./Logo";

const NavTwo = () => {
  const { userInfo } = useData();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="flex border-b p-4 pb-5  justify-between w-full items-center gap-10">
      <div className="flex gap-2 lg:gap-5">
        <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded text-blue-600">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div className="p-2 border border-blue-600 text-blue-600 rounded w-fit">
          <Logo />
        </div>
      </div>
      <div>
        <div className="flex gap-2 h-10">
          <img
            className="rounded w-10 "
            src={`${userInfo.companyLogo}`}
            alt="profile"
          />
          <div>
            <div className="hidden lg:block font-medium">
              {userInfo.companyName}
            </div>
            <p
              onClick={() => handleLogout()}
              className="hidden lg:flex gap-2 items-center cursor-pointer text-xs font-medium text-slate-400"
            >
              Logout
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </p>
            <div
              onClick={() => handleLogout()}
              className="bg-blue-600 hover:bg-blue-700 lg:hidden h-10 w-10 flex justify-center items-center text-white rounded"
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTwo;
