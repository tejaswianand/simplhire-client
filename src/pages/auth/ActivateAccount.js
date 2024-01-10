import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../../apiConfig";

const ActivateAccount = () => {
  const location = useLocation();
  const token = location.pathname.split("/")[3];
  const type = location.pathname.split("/")[4];

  const [message, setMessage] = useState(
    "Activating your account, Please Wait"
  );
  const handleActivate = async () => {
    if (type == "candidate") {
      try {
        const response = await axios.put(
          `${API_URL}/candidate/activate-account/${token}`
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message || "Something Went Wrong");
      }
    } else {
      try {
        const response = await axios.put(
          `${API_URL}/recruiter/activate-account/${token}`
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message || "Something Went Wrong");
      }
    }
  };
  useEffect(() => {
    handleActivate();
  }, [token]);

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-10">
      <div className="text-xl">
        <Logo />
      </div>
      <div className="text-xl lg:text-2xl font-semibold">{message}</div>
      <div className="text-white bg-green-700 hover_bg-blue-700 p-2 px-5 rounded-full">
        <NavLink to="/auth/login">
          <i class="fa-solid fa-chevron-left text-sm"></i> Back to Login
        </NavLink>
      </div>
    </div>
  );
};

export default ActivateAccount;
