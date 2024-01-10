import React, { useEffect, useReducer, useState } from "react";
import NavOne from "../components/NavOne";
import axios from "axios";
import API_URL from "../apiConfig";
import { NavLink } from "react-router-dom";
import { useData } from "../middlewares/dataContext";
import jwt from "jsonwebtoken";

const Jobs = () => {
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const { validToken, userInfo, reloadUserData } = useData();
  console.log(userInfo);
  const [jobs, setJobs] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/jobs/view-all`);
        setJobs(res.data.jobs);
      } catch (error) {}
    };
    getJobs();
  }, [ignored]);

  const saveJob = async (jobId) => {
    const data = { userId, jobId };
    const response = await axios.put(`${API_URL}/candidate/save-job`, data);
    console.log(response.data.status);
    if (response.data.status == true) {
      forceUpdate();
      reloadUserData();
    }
  };
  const unSaveJob = async (jobId) => {
    const data = { userId, jobId };
    const response = await axios.put(`${API_URL}/candidate/unsave-job`, data);
    console.log(response.data.status);
    if (response.data.status == true) {
      forceUpdate();
      reloadUserData();
    }
  };
  const checkSaved = (jobId) => {
    if (userInfo.savedJobs) {
      const isSaved = userInfo.savedJobs.some(
        (savedJobId) => savedJobId === jobId
      );
      if (isSaved) {
        return true;
      } else {
      }
      return false;
    }
  };
  return (
    <>
      <NavOne />
      <div
        className="border-b shadow"
        style={{
          backgroundImage: "url(/assets/images/bg.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{ height: "200px", backgroundColor: "rgba(255,255,255,0.8)" }}
          className="p-4 text-xl lg:text-2xl font-bold flex justify-center items-center"
        >
          Find and Apply for Jobs
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-1/5 border-r p-4">
          <div className="border border-slate-300 px-2 rounded">
            <input
              className="outline-none p-2"
              placeholder="Location, Role, Company"
            />
          </div>
        </div>
        <div className="p-4 flex gap-3 lg:flex-row flex-col">
          {jobs.map((data) => (
            <div
              className="rounded p-4 border-2 border-slate-100"
              key={data._id}
            >
              <div className="flex justify-between">
                <div className="font-semibold text-lg lg:text-xl mb-3">
                  {data.role}
                </div>
                {validToken && userType === "candidate" ? (
                  <>
                    {checkSaved(data._id) === true ? (
                      <div
                        onClick={() => unSaveJob(data._id)}
                        className="cursor-pointer h-8 w-8 bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-800 flex justify-center items-center rounded"
                      >
                        <i class="fa-solid fa-bookmark"></i>{" "}
                      </div>
                    ) : (
                      <div
                        onClick={() => saveJob(data._id)}
                        className="cursor-pointer h-8 w-8 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 flex justify-center items-center rounded"
                      >
                        <i class="fa-solid fa-bookmark"></i>{" "}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-xs">
                    <NavLink
                      to="/auth/login"
                      className="cursor-pointer text-blue-600"
                    >
                      Login
                    </NavLink>{" "}
                    to Save
                  </div>
                )}
              </div>
              <div className="flex gap-2 text-sm lg:text-base">
                <div>
                  <i class="fa-solid fa-building"></i>&nbsp;
                  {data.companyName}
                </div>
                <div>|</div>
                <div>
                  <i class="fa-solid fa-location-dot"></i>&nbsp;
                  {data.location}
                </div>
                <div>|</div>
                <div>
                  <i class="fa-solid fa-business-time"></i>&nbsp;
                  {data.expRequired} Years
                </div>
              </div>
              <div className="bg-green-50 border border-green-300 text-green-600 hover:text-white hover:bg-green-700 hover:border-green-700 rounded p-2 mt-4 text-center">
                {" "}
                <NavLink to={`/jobs/view/${data._id}`}>View</NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;
