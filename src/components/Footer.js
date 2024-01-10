import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col gap-3 items-center lg:flex-row justify-between p-4 mt-20">
      <div>&copy; 2023 - SimplHire </div>
      <div className="flex gap-10">
        <NavLink>Help & Support</NavLink>
        <NavLink>Privacy Policy</NavLink>
      </div>
    </div>
  );
};

export default Footer;
