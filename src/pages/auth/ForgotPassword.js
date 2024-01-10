import React, { useState } from "react";
import NavOne from "../../components/NavOne";
import Footer from "../../components/Footer";

const ForgotPassword = () => {
  const [userType, setUserType] = useState("employee");
  const [loading, setLoading] = useState(false);
  const [employeeError, setEmployeeError] = useState("");
  const [companyError, setCompanyError] = useState("");
  return (
    <div>
      <NavOne />
      <div className="mt-20 mx-auto w-11/12 lg:w-1/4 lg:mx-auto">
        <div className="text-center mb-10 font-bold text-xl lg:text-2xl">
          Forgot Password?
        </div>
        <div className="flex bg-gray-50 rounded p-2 gap-5 justify-around mb-5">
          <div
            onClick={() => setUserType("employee")}
            className={`p-2 rounded cursor-pointer ${
              userType == "employee" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Employee
          </div>
          <div
            onClick={() => setUserType("company")}
            className={`p-2 rounded cursor-pointer ${
              userType == "company" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Company
          </div>
        </div>
        {userType == "employee" ? (
          <div>
            <form>
              <label className="">Email Address</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-blue-600 focus:border-2 outline-none mb-3"
                type="email"
              />
              <button className="bg-blue-600 text-white font-medium hover:bg-blue-700 p-3 w-full rounded text-center flex justify-center my-4">
                {loading ? (
                  <div className="button-loader"></div>
                ) : (
                  "Send Employee ID & Password Reset LInk"
                )}
              </button>
            </form>
            {employeeError ? (
              <div className="text-red-600 mb-3 text-center bg-red-100 p-2 rounded">
                {employeeError}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            <form>
              <label className="">Email Address</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-blue-600 focus:border-2 outline-none mb-3"
                type="email"
              />

              <button className="bg-blue-600 text-white font-medium hover:bg-blue-700 p-3 w-full rounded text-center flex justify-center my-4">
                {loading ? (
                  <div className="button-loader"></div>
                ) : (
                  "Send Password Reset Link"
                )}
              </button>
            </form>
            {companyError ? (
              <div className="text-red-600 mb-3 text-center bg-red-100 p-2 rounded">
                {companyError}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;
