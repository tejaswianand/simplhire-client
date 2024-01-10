import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import moment from "moment";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NavOne from "../components/NavOne";
import API_URL from "../apiConfig";

const SingleJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const jobId = location.pathname.split("/")[3];
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [job, setJob] = useState([]);
  const [content, setContent] = useState("details");
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const newJob = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/jobs/view/${jobId}`);
      setJob(response.data.job);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message || " Something Went Wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    newJob();
  }, [jobId, ignored]);

  return (
    <>
      <NavOne />
      <div className="modal-container w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
        {loading ? (
          <div className="page-loader-black"></div>
        ) : (
          <>
            {" "}
            <div className="flex gap-5 items-center justify-between">
              <div className="flex gap-5">
                {" "}
                <div
                  onClick={() => navigate(-1)}
                  className="bg-red-50 text-red-600 hover:bg-red-100 flex justify-center items-center p-2 rounded w-8 h-8"
                >
                  <i className="fas fa-arrow-left" />
                </div>
                <div className="font-bold text-lg lg:text-xl">
                  {job.role} @ {job.companyName}
                </div>
              </div>
              <div className="flex gap-5"></div>
            </div>
            <div className="mt-5">
              <div className="flex gap-3 mb-4">
                <div
                  onClick={() => setContent("details")}
                  className={`${
                    content == "details"
                      ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                      : ""
                  }`}
                >
                  Details
                </div>
                <div
                  onClick={() => setContent("apply")}
                  className={`${
                    content == "apply"
                      ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                      : ""
                  }`}
                >
                  Apply <i class="fa-solid fa-location-arrow"></i>
                </div>
              </div>
              {content === "details" ? (
                <div>
                  <div className="flex flex-col lg:flex-row gap-2">
                    <div>
                      Location -{" "}
                      <span className="font-bold">{job.location}</span>
                    </div>
                    <div className="hidden lg:inline">|</div>
                    <div>
                      Accepting Applications Till -
                      <span className="font-bold">
                        {moment(job.acceptTill).format("MMM Do YY")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2 text-sm mt-2 text-slate-400">
                    <div>
                      Posted On -
                      <span className="font-bold">
                        {" "}
                        {moment(job.createdAt).format("MMMM Do YYYY")}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="block mb-1 font-bold">
                      Job Description -
                    </span>
                    {job.description}
                  </div>
                </div>
              ) : (
                <div>
                  {userId && userType == "candidate" ? (
                    <div>
                      <form></form>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div>You need to Login Before Applying </div>
                      <NavLink
                        to="/auth/login"
                        className="text-blue-600 font-bold"
                      >
                        Login Here
                      </NavLink>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleJob;
