import React, { useState } from "react";
import Logo from "../../components/Logo";
import NavOne from "../../components/NavOne";
import Footer from "../../components/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import API_URL from "../../apiConfig";
import axios from "axios";

const Login = () => {
  const [userType, setUserType] = useState("candidate");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    setEmail("");
    setPassword("");
    setUserType(data);
  };

  const candidateLogin = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const data = { email, password };
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/candidate/login`, data);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType);
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response.data.message || "Something Went Wrong");
      setLoading(false);
      console.log(error);
    }
  };
  const recruiterLogin = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const data = { email, password };
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/recruiter/login`, data);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType);
      window.location.href = "/recruiter/home";
      setLoading(false);
      setSuccessMessage(response.data.message);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response.data.message || "Something Went Wrong");
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <NavOne />

      <div className="mt-10 mx-auto w-11/12 lg:w-1/4 lg:mx-auto">
        <div className="flex rounded p-2 gap-5 justify-around mb-5">
          <div
            onClick={() => handleUserChange("candidate")}
            className={`p-2 px-5 rounded-full cursor-pointer ${
              userType == "candidate" ? "bg-green-600 text-white" : ""
            }`}
          >
            Candidate
          </div>
          <div
            onClick={() => handleUserChange("recruiter")}
            className={`p-2 px-5 rounded-full cursor-pointer ${
              userType == "recruiter" ? "bg-green-600 text-white" : ""
            }`}
          >
            Recruiter
          </div>
        </div>
        <div className="text-center mb-10 font-bold text-lg lg:text-xl capitalize">
          {userType} Login
        </div>
        {userType == "candidate" ? (
          <div className="rounded border border-green-100 p-4 mb-4">
            <form onSubmit={candidateLogin}>
              <label className="block star">Email Address</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block star">Password</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-blue-600 focus:border-2 outline-none mb-3"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded-full text-center flex justify-center">
                {loading ? <div className="button-loader"></div> : "Login"}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded border border-green-100 p-4 mb-4">
            <form onSubmit={recruiterLogin}>
              <label className="star">Email Address</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block star">Password</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-blue-600 focus:border-2 outline-none mb-3"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded-full text-center flex justify-center">
                {loading ? <div className="button-loader"></div> : "Login"}
              </button>
            </form>
          </div>
        )}
        {errorMessage ? (
          <div className="text-red-600 mb-3  text-center p-1 rounded-full">
            <i class="fa-solid fa-triangle-exclamation"></i> {errorMessage}
          </div>
        ) : (
          ""
        )}
        {successMessage ? (
          <div className="text-green-700 mb-3 text-center p-2 rounded-full">
            <i class="fa-solid fa-circle-check"></i> {successMessage}
          </div>
        ) : (
          ""
        )}

        <div className="text-center ">
          <NavLink
            className="text-blue-600 hover:text-blue-700"
            to="/auth/forgot-password"
          >
            Forgot Passsword?
          </NavLink>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default Login;
