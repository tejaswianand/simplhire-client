import React from "react";
import { useData } from "../middlewares/dataContext";

const Logo = () => {
  const { validToken } = useData();
  const userType = localStorage.getItem("userType");
  return (
    <div className="flex lg:gap-2 flex-col lg:flex-row">
      <div className="flex gap-2 items-center">
        <i class="fa-solid fa-chart-simple"></i>
        <div className="font-bold">SimplHire</div>
      </div>
      <span className="block text-slate-500 text-xs font-medium capitalize pl-6 lg:p-0">
        {validToken ? userType : ""}
      </span>
    </div>
  );
};

export default Logo;
