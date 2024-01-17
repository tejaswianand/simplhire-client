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
  const [updateProfileModal, setUpdateProfileModal] = useState(false);

  const [resumeLength, setResumeLength] = useState(0);
  const resume = userInfo && userInfo.resume ? userInfo.resume : [];

  useEffect(() => {
    const length = resume.length;
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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [currentCtc, setCurrentCtc] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [applications, setApplications] = useState([]);
  const [applicationsCount, setApplicationsCount] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${API_URL}/candidate/find/${userId}`);
      setMobile(res.data.user.mobile);
      setWorkExperience(res.data.user.workExperience);
      setCurrentCtc(res.data.user.currentCtc);
      setExpectedCtc(res.data.user.expectedCtc);
    };
    const getApplications = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/application/findByUserId/${userId}`
        );
        const userApplications = res.data.application;
        setApplications(userApplications);
        setApplicationsCount(userApplications.length);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    getUser();
    getApplications();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      mobile,
      workExperience,
      currentCtc,
      expectedCtc,
    };
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/candidate/update/${userId}`,
        data
      );
      window.location.reload();
      setSuccessMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message || " Something Went Wrong");
      setLoading(false);
    }
  };
  return (
    <>
      {updateProfileModal ? (
        <>
          <div className="overlay"></div>
          <div className="modal-container w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
            <div className="flex justify-between">
              <div className="font-bold text-lg lg:text-xl">Update Details</div>
              <div
                onClick={() => setUpdateProfileModal(!updateProfileModal)}
                className="flex justify-center items-center  rounded h-8 w-8 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-800"
              >
                <i className="fas fa-close" />
              </div>
            </div>
            <div>
              {" "}
              <form onSubmit={handleUpdate}>
                <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
                  <div className="w-full lg:w-1/2">
                    <label className="block star">Phone Number</label>
                    <input
                      className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                      type="text"
                      value={mobile}
                      required
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label className="block star">Work Experience</label>
                    <input
                      className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                      type="text"
                      value={workExperience}
                      required
                      onChange={(e) => setWorkExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
                  <div className="w-full lg:w-1/2">
                    <label className="block star">Current CTC</label>
                    <input
                      className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                      type="text"
                      value={currentCtc}
                      required
                      onChange={(e) => setCurrentCtc(e.target.value)}
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label className="block star">Expected CTC</label>
                    <input
                      className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                      type="text"
                      value={expectedCtc}
                      required
                      onChange={(e) => setExpectedCtc(e.target.value)}
                    />
                  </div>
                </div>
                <button className="bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded-full text-center flex justify-center">
                  {loading ? <div className="button-loader"></div> : "Save"}
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <NavOne />
          <div className="modal-container-2 w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
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
                      onClick={() => setUpdateProfileModal(!updateProfileModal)}
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
                      Applications ({applicationsCount})
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
                          {applications.map((data) => (
                            <div
                              className="border border-slate-200 p-2 mb-2 rounded"
                              key={data._id}
                            >
                              <div className="flex gap-3 flex-col lg:flex-row justify-between text-slate-400">
                                <div className="text-xs lg:text-sm">
                                  Application ID:{" "}
                                  <span className="font-bold uppercase">
                                    {data._id}
                                  </span>
                                </div>{" "}
                                <div className="text-xs lg:text-sm">
                                  Status:&nbsp;
                                  <span className="font-bold">
                                    {data.status}
                                  </span>
                                </div>{" "}
                              </div>
                              <div className="flex gap-3 flex-col lg:flex-row mt-3 text-xs lg:text-sm">
                                <div>
                                  Work Experience:{" "}
                                  <span className="font-bold uppercase">
                                    {data.workExperience}
                                  </span>{" "}
                                </div>{" "}
                                <div className="hidden lg:inline">|</div>
                                <div>
                                  Expected CTC:&nbsp;
                                  <span className="font-bold">
                                    {data.expectedCtc} LPA
                                  </span>
                                </div>{" "}
                                <div className="hidden lg:inline">|</div>
                                <div>
                                  <NavLink
                                    target="_blank"
                                    className="text-blue-600"
                                    to={`/jobs/view/${data.jobId}`}
                                  >
                                    View Job Description&nbsp;
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                  </NavLink>
                                </div>
                                <div className="hidden lg:inline">|</div>
                                <div>
                                  <NavLink
                                    target="_blank"
                                    className="text-blue-600"
                                    to={`${data.resumeLink}`}
                                  >
                                    Submitted Resume&nbsp;
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div>You need to Login </div>
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
                        {userInfo.workExperience ? (
                          <>{userInfo.workExperience} Years</>
                        ) : (
                          "Not Updated"
                        )}
                      </div>
                      <div className="mt-3 flex flex-col lg:flex-row gap-3">
                        <div>
                          {" "}
                          <span className="font-bold">Current CTC:</span>{" "}
                          {userInfo.currentCtc ? (
                            <>{userInfo.currentCtc} LPA</>
                          ) : (
                            "Not Updated"
                          )}
                        </div>
                        <div className="hidden lg:inline">|</div>
                        <div>
                          {" "}
                          <span className="font-bold">Expected CTC:</span>{" "}
                          {userInfo.expectedCtc ? (
                            <>{userInfo.expectedCtc} LPA</>
                          ) : (
                            "Not Updated"
                          )}
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
                                <NavLink
                                  target="_blank"
                                  to={`${data.fileLink}`}
                                >
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
      )}
    </>
  );
};

export default Profile;
