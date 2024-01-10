import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API_URL from "../apiConfig";
import { useData } from "../middlewares/dataContext";

const JobById = ({ jobId }) => {
  const [job, setJob] = useState([]);
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const { validToken, userInfo, reloadUserData } = useData();
  const getJob = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs/view/${jobId}`);
      setJob(response.data.job);
    } catch (error) {}
  };
  useEffect(() => {
    getJob();
  }, [jobId]);

  const saveJob = async (jobId) => {
    const data = { userId, jobId };
    const response = await axios.put(`${API_URL}/candidate/save-job`, data);
    console.log(response.data.status);
    if (response.data.status == true) {
      reloadUserData();
    }
  };
  const unSaveJob = async (jobId) => {
    const data = { userId, jobId };
    const response = await axios.put(`${API_URL}/candidate/unsave-job`, data);
    console.log(response.data.status);
    if (response.data.status == true) {
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
    <div
      className="rounded p-4 border-2 border-slate-100 w-full lg:w-1/2"
      key={job._id}
    >
      <div className="flex justify-between">
        <div className="font-semibold text-lg lg:text-xl mb-3">{job.role}</div>
        {validToken && userType === "candidate" ? (
          <>
            {checkSaved(job._id) === true ? (
              <div
                onClick={() => unSaveJob(job._id)}
                className="cursor-pointer h-8 w-8 bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-800 flex justify-center items-center rounded"
              >
                <i class="fa-solid fa-bookmark"></i>{" "}
              </div>
            ) : (
              <div
                onClick={() => saveJob(job._id)}
                className="cursor-pointer h-8 w-8 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 flex justify-center items-center rounded"
              >
                <i class="fa-solid fa-bookmark"></i>{" "}
              </div>
            )}
          </>
        ) : (
          <div className="text-xs">
            <NavLink to="/auth/login" className="cursor-pointer text-blue-600">
              Login
            </NavLink>{" "}
            to Save
          </div>
        )}
      </div>
      <div className="flex gap-2 text-sm lg:text-sm">
        <div>
          <i class="fa-solid fa-building"></i>&nbsp;
          {job.companyName}
        </div>
        <div>|</div>
        <div>
          <i class="fa-solid fa-location-dot"></i>&nbsp;
          {job.location}
        </div>
        <div>|</div>
        <div>
          <i class="fa-solid fa-business-time"></i>&nbsp;
          {job.expRequired} Years
        </div>
      </div>
      <div className="bg-green-50 border border-green-300 text-green-600 hover:text-white hover:bg-green-700 hover:border-green-700 rounded p-2 mt-4 text-center">
        {" "}
        <NavLink to={`/jobs/view/${job._id}`}>View</NavLink>
      </div>
    </div>
  );
};

export default JobById;
