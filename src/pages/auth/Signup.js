import React, { useState } from "react";
import NavOne from "../../components/NavOne";
import Footer from "../../components/Footer";
import axios from "axios";
import API_URL from "../../apiConfig";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [userType, setUserType] = useState("candidate");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserChange = (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCompanyName("");
    setDesignation("");
    setUserType(data);
  };

  const candidateSignup = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (password.length < 8) {
      setErrorMessage("Password should be minimum 8 Characters.");
      return;
    }
    if (password != confirmPassword) {
      setErrorMessage("Password not Matching");
      return;
    }
    const data = { name, email, password };
    try {
      setLoading(true);
      setSuccessMessage("Creating Account..Please wait");
      const response = await axios.post(`${API_URL}/candidate/signup`, data);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setSuccessMessage(response.data.message);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response.data.message || "Something Went Wrong");
      setLoading(false);
      console.log(error);
    }
  };
  const recruiterSignup = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (password.length < 8) {
      setErrorMessage("Password should be minimum 8 Characters.");
      return;
    }
    if (password != confirmPassword) {
      setErrorMessage("Password not Matching");
      return;
    }
    const data = { name, companyName, designation, email, password };
    try {
      setLoading(true);
      setSuccessMessage("Creating Account..Please wait");
      const response = await axios.post(`${API_URL}/recruiter/signup`, data);
      setName("");
      setCompanyName("");
      setDesignation("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
          Create new {userType} Account
        </div>
        {userType == "candidate" ? (
          <div className="rounded border border-green-100 p-4 mb-4">
            <form onSubmit={candidateSignup}>
              <label className="block star">Name</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label className="block star">Email Address</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block star">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="rounded border-2 p-2 w-full focus:border-blue-600 focus:border-2 outline-none mb-3"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length >= 8 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      color: "green",
                    }}
                  >
                    <i class="fa-regular fa-circle-check"></i>
                  </div>
                )}
              </div>
              <label className="block star">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="rounded border-2 p-2 w-full focus:border-blue-600 focus:border-2 outline-none mb-3"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword.length >= 8 &&
                  password === confirmPassword && (
                    <div
                      style={{
                        position: "absolute",
                        top: "40%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        color: "green",
                      }}
                    >
                      <i className="fa-regular fa-circle-check"></i>
                    </div>
                  )}
              </div>
              <button className="bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded-full text-center flex justify-center">
                {loading ? <div className="button-loader"></div> : "Signup"}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded border border-green-100 p-4 mb-4">
            <form onSubmit={recruiterSignup}>
              <label className="star">Name</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="star">Company Name</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="name"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <label className="star">Designation</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="name"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              <label className="star">Email Address</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block star">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="rounded border-2 p-2 w-full focus:border-blue-600 focus:border-2 outline-none mb-3"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length >= 8 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      color: "green",
                    }}
                  >
                    <i class="fa-regular fa-circle-check"></i>
                  </div>
                )}
              </div>
              <label className="block star">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="rounded border-2 p-2 w-full focus:border-blue-600 focus:border-2 outline-none mb-3"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword.length >= 8 &&
                  password === confirmPassword && (
                    <div
                      style={{
                        position: "absolute",
                        top: "40%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        color: "green",
                      }}
                    >
                      <i className="fa-regular fa-circle-check"></i>
                    </div>
                  )}
              </div>
              <button className="bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded-full text-center flex justify-center">
                {loading ? <div className="button-loader"></div> : "Signup"}
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
          Already have an account?{" "}
          <NavLink
            className="text-blue-600 hover:text-blue-700"
            to="/auth/login"
          >
            Login Here
          </NavLink>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default Signup;
