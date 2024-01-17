import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import moment from "moment";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NavOne from "../components/NavOne";
import API_URL from "../apiConfig";
import { useData } from "../middlewares/dataContext";

const SingleJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const jobId = location.pathname.split("/")[3];
  const { userInfo } = useData();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [job, setJob] = useState([]);
  const [content, setContent] = useState("details");
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [resume, setResume] = useState([]);
  const [workExperience, setWorkExperience] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [resumeName, setResumeName] = useState("");

  const newJob = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/jobs/view/${jobId}`);
      setJob(response.data.job);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message || " Something Went Wrong");
      setLoading(false);
    }
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState("");
  const [applicationDetails, setApplicationDetails] = useState([]);
  const getUser = async () => {
    const res = await axios.get(`${API_URL}/candidate/find/${userId}`);
    setName(res.data.user.name);
    setEmail(res.data.user.email);
    setPhone(res.data.user.mobile);
    setResume(res.data.user.resume);
    setWorkExperience(res.data.user.workExperience);
    setExpectedCtc(res.data.user.expectedCtc);
  };
  useEffect(() => {
    if (userId && userInfo.userType == "candidate") {
      getUser();
    }
    const checkStatus = async () => {
      const data = { jobId, userId };
      try {
        const res = await axios.post(
          `${API_URL}/application/check-status`,
          data
        );
        if (res.data.status == true) {
          setAlreadyApplied(true);
          setApplicationDetails(res.data.application);
        } else {
          setAlreadyApplied(false);
        }
      } catch (error) {
        setAlreadyApplied(false);
      }
    };
    checkStatus();
    newJob();
  }, [jobId, ignored]);
  const [showResumeList, setShowResumeList] = useState(false);
  const handleApply = async (e) => {
    e.preventDefault();
    const data = {
      jobId,
      userId,
      name,
      email,
      phone,
      workExperience,
      expectedCtc,
      resumeLink,
    };
    console.log(data);
    try {
      const response = await axios.post(`${API_URL}/application/create`, data);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const current_date = Date.now();
  return (
    <>
      <NavOne />
      <div className="modal-container-2 w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
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
                {alreadyApplied ? (
                  <div
                    onClick={() => setContent("apply")}
                    className={`${
                      content === "apply"
                        ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                        : ""
                    }`}
                  >
                    Application Details
                  </div>
                ) : (
                  <div>
                    {moment(job.acceptTill).format("MMM Do YY") <=
                    moment(current_date).format("MMM Do YY") ? (
                      <div className="text-red-600 font-bold">
                        Applications Closed
                      </div>
                    ) : (
                      <div
                        onClick={() => setContent("apply")}
                        className={`${
                          content === "apply"
                            ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                            : ""
                        }`}
                      >
                        Apply <i className="fa-solid fa-location-arrow"></i>
                      </div>
                    )}
                  </div>
                )}
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
                    alreadyApplied ? (
                      <div className="mt-5 text-justify">
                        {applicationDetails && alreadyApplied && (
                          <div>
                            You have already applied for this role on{" "}
                            <span className="font-bold">
                              {moment(applicationDetails.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </span>
                            . The current status is{" "}
                            <span className="font-bold">
                              "{applicationDetails.status}"
                            </span>
                            . Kindly await further communication regarding the
                            status of your application. We appreciate your
                            interest in&nbsp;
                            {job.companyName}.
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-5">
                        <div className="text-xs lg:text-sm text-slate-500 text-justify mb-4">
                          Kindly be advised to review and update your contact
                          details (Name, Email, and Phone Number) on your
                          profile before proceeding with your application.
                          Ensuring accurate information is essential for
                          effective communication throughout the application
                          process.
                        </div>
                        <form onSubmit={handleApply}>
                          <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
                            <div className="w-full lg:w-1/2">
                              <label className="block star">
                                Work Experience (In Years)
                              </label>
                              <input
                                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                                type="number"
                                value={workExperience}
                                required
                                placeholder="Experience in Years (0.6, 2, 3)"
                                onChange={(e) =>
                                  setWorkExperience(e.target.value)
                                }
                              />
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label className="block star">
                                Expected CTC (LPA)
                              </label>
                              <input
                                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                                type="text"
                                value={expectedCtc}
                                required
                                placeholder=" Enter your expected CTC in LPA"
                                onChange={(e) => setExpectedCtc(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="dropdown w-full border rounded  p-3">
                            <div
                              onClick={(e) => {
                                setShowResumeList(!showResumeList);
                              }}
                              className="dropdown-btn"
                            >
                              {resumeName ? resumeName : "Select Resume"}
                              <span
                                className={
                                  showResumeList
                                    ? "fas fa-caret-up"
                                    : "fas fa-caret-down"
                                }
                              />
                            </div>
                            <div
                              className="dropdown-content text-black"
                              style={{
                                display: showResumeList ? "block" : "none",
                              }}
                            >
                              {resume.map((data) => (
                                <div
                                  onClick={() => {
                                    setResumeName(data.name);
                                    setResumeLink(data.fileLink);
                                    setShowResumeList(!showResumeList);
                                  }}
                                  className="item"
                                >
                                  {data.name}
                                </div>
                              ))}
                            </div>
                          </div>
                          <button className="mt-3 bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded-full text-center flex justify-center">
                            {loading ? (
                              <div className="button-loader"></div>
                            ) : (
                              "Apply"
                            )}
                          </button>
                        </form>
                        {errorMessage ? (
                          <div className="mt-4 text-red-600 text-center p-1 rounded-full">
                            <i class="fa-solid fa-triangle-exclamation"></i>{" "}
                            {errorMessage}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )
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
