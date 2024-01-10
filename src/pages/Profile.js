import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import moment from "moment";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NavOne from "../components/NavOne";
import API_URL from "../apiConfig";
import { useData } from "../middlewares/dataContext";
import JobById from "../Helpers/JobById";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo } = useData();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("details");

  const [resumeLength, setResumeLength] = useState(0);
  const resume = userInfo && userInfo.resume ? userInfo.resume : [];

  useEffect(() => {
    const length = resume.length;
    console.log(userInfo);
    setResumeLength(length);
  }, [userInfo]);
  const deleteResume = async (rid) => {
    try {
      const res = await axios.put(
        `${API_URL}/candidate/delete-resume/${userId}/${rid}`
      );
      window.location.reload();
    } catch (error) {}
  };
  return (
    <>
      <NavOne />
      <div className="modal-container w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
        {loading ? (
          <div className="page-loader-black"></div>
        ) : (
          <>
            {" "}
            <div className="flex gap-5  justify-between">
              <div className="font-bold md:text-lg lg:text-xl">
                {userInfo.name}
                <span className="block text-sm font-medium capitalize text-slate-400">
                  {userInfo.userType}
                </span>
              </div>
              <div className="flex gap-3">
                {" "}
                <div
                  onClick={() => navigate("/upload-resume")}
                  className="flex justify-center items-center h-8  rounded px-2 text-xs gap-2 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-800"
                >
                  Upload Resume <i class="fa-solid fa-cloud-arrow-up"></i>{" "}
                </div>
                <div
                  onClick={() => navigate("/profile/update")}
                  className="flex justify-center items-center  rounded h-8 w-8 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-800"
                >
                  <i className="fas fa-pen-to-square" />
                </div>
              </div>
            </div>
            <div className="mt-5 text-sm md:text-base lg:text-base">
              <div className="flex gap-5 mb-4 text-xs md:text-sm lg:text-base">
                <div
                  onClick={() => setContent("details")}
                  className={`${
                    content == "details"
                      ? "cursor-pointer text-green-700 font-bold border-b-2 pb-1 border-green-700"
                      : "cursor-pointer"
                  }`}
                >
                  <i class="fa-solid fa-circle-info"></i>&nbsp;Details
                </div>
                <div
                  onClick={() => setContent("applications")}
                  className={`${
                    content == "applications"
                      ? "cursor-pointer text-green-700 font-bold border-b-2 pb-1 border-green-700"
                      : "cursor-pointer"
                  }`}
                >
                  <i class="fa-solid fa-envelope-circle-check"></i>&nbsp;My
                  Applications
                </div>
                <div
                  onClick={() => setContent("savedJobs")}
                  className={`${
                    content == "savedJobs"
                      ? "cursor-pointer text-green-700 font-bold border-b-2 pb-1 border-green-700"
                      : "cursor-pointer"
                  }`}
                >
                  <i class="fa-regular fa-bookmark"></i>&nbsp;Saved Jobs
                </div>
              </div>
              {content === "savedJobs" ? (
                <div className="flex gap-3 lg:flex-row flex-col">
                  {userInfo.savedJobs.map((data) => (
                    <>
                      <JobById jobId={data} />
                    </>
                  ))}
                </div>
              ) : content === "applications" ? (
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
              ) : (
                <div>
                  <div className="font-bold">Contact Details</div>
                  <div className="flex gap-2 mt-1">
                    <div>
                      <i class="fa-regular fa-envelope"></i>&nbsp;
                      {userInfo.email}
                    </div>
                    <div className="hidden lg:inline">|</div>
                    <div>
                      <i class="fa-solid fa-mobile-screen-button"></i>&nbsp;
                      {userInfo.mobile ? userInfo.mobile : "Not Updated"}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-bold">Work Experience: </span>
                    {userInfo.workExperience
                      ? userInfo.workExperience
                      : "Not Updated"}
                  </div>
                  <div className="mt-3 flex flex-col lg:flex-row gap-3">
                    <div>
                      {" "}
                      <span className="font-bold">Expected CTC:</span>{" "}
                      {userInfo.currentCtc
                        ? userInfo.currentCtc
                        : "Not Updated"}
                    </div>
                    <div className="hidden lg:inline">|</div>
                    <div>
                      {" "}
                      <span className="font-bold">Expected CTC:</span>{" "}
                      {userInfo.expectedCtc
                        ? userInfo.expectedCtc
                        : "Not Updated"}
                    </div>
                  </div>
                  <div className="mt-3 md:text-lg font-bold">
                    Uploaded Resumes ({resumeLength})
                  </div>
                  <div className="flex flex-col gap-3 lg:flex-row mt-3 ">
                    {resume.map((data) => (
                      <div
                        className="flex justify-between gap-10 border border-slate-100 p-2 border-2 rounded"
                        key={data._id}
                      >
                        <div>{data.name}</div>
                        <div className="flex gap-3">
                          <div className="bg-green-50 text-sm hover_bg-green-100 p-2 h-6 w-6 text-green-600 hover:text-green-800 flex items-center justify-center rounded">
                            <NavLink target="_blank" to={`${data.fileLink}`}>
                              <i className="fas fa-eye" />
                            </NavLink>
                          </div>
                          <div
                            onClick={() => deleteResume(data._id)}
                            className="bg-red-50 text-sm hover_bg-red-100 p-2 h-6 w-6 text-red-600 hover:text-red-800 flex items-center justify-center rounded"
                          >
                            <i className="fas fa-trash" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
