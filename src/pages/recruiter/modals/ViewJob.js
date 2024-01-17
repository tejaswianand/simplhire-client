import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import API_URL from "../../../apiConfig";
import moment from "moment";
import RecruiterNav from "../../../components/RecruiterNav";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const ViewJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobId = location.pathname.split("/")[4];

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [job, setJob] = useState([]);
  const [content, setContent] = useState("details");
  const [deleteModal, setDeleteModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState(null);
  const [inviteMessage, setInviteMessage] = useState(
    `We are impressed by your profile and would like to invite you for an interview. Please join us for a virtual meeting using the given details. We look forward to discussing your candidacy.`
  );
  const [inviteMeetLink, setInviteMeetLink] = useState("");
  const [inviteMeetPassword, setInviteMeetPassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [applications, setApplications] = useState([]);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [applicationToShow, setApplicationToShow] = useState("submitted");
  const [inviteErrorMessage, setInviteErrorMessage] = useState("");
  const [inviteSuccessMessage, setInviteSuccessMessage] = useState("");
  const openInviteModal = (data) => {
    // setInviteErrorMessage("");
    setInviteSuccessMessage("");
    setDeleteModal(false);
    setInviteData(data);
    setInviteModal(true);
  };
  const closeInviteModal = (data) => {
    setInviteErrorMessage("");
    setInviteSuccessMessage("");
    setDeleteModal(false);
    setInviteData(null);
    setInviteModal(false);
  };
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
  const getApplications = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/application/findByJobId/${jobId}`
      );
      const userApplications = res.data.application;
      const filteredApplications = userApplications.filter(
        (application) => application.status === applicationToShow
      );

      setApplications(filteredApplications);
      setApplicationsCount(userApplications.length);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  useEffect(() => {
    getApplications();
  }, [jobId, applicationToShow, ignored]);
  useEffect(() => {
    newJob();
  }, [jobId, ignored]);
  const changeStatus = async (id) => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/jobs/change-status/${id}`);
      forceUpdate();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const deleteJob = async () => {
    try {
      setDeleting(true);
      const res = await axios.delete(`${API_URL}/jobs/delete/${jobId}`);
      setErrorMessage(res.data.message);
      navigate(-1);
    } catch (error) {
      setDeleting(false);
      setErrorMessage(error.response.data.message);
    }
  };

  const markViewed = async (appId) => {
    const data = { appId, status: "viewed" };
    try {
      const res = await axios.put(`${API_URL}/application/change-status`, data);
      forceUpdate();
    } catch (error) {}
  };
  const markShortlisted = async (appId) => {
    const data = { appId, status: "shortlisted" };
    try {
      const res = await axios.put(`${API_URL}/application/change-status`, data);
      forceUpdate();
    } catch (error) {}
  };
  const sendInvite = async (e) => {
    e.preventDefault();
    const data = {
      appId: inviteData._id,
      email: inviteData.email,
      name: inviteData.name,
      role: job.role,
      company: job.companyName,
      inviteMessage,
      inviteMeetLink,
      inviteMeetPassword,
    };
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/application/send-invite`, data);
      setInviteSuccessMessage(res.data.message);
      setLoading(false);
    } catch (error) {
      setInviteErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      {inviteModal ? (
        <>
          <div className="overlay"></div>
          <div className="modal-container w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
            <div className="flex justify-between">
              <div className="font-bold text-lg">Send Invite</div>
              <div
                onClick={() => closeInviteModal()}
                className="cursor-pointer text-xs lg:text-sm bg-red-50 border border-red-100 text-red-600 p-1 rounded px-4 hover:bg-red-100"
              >
                Cancel
              </div>
            </div>
            {inviteSuccessMessage ? (
              <div className="bg-green-50 border border-green-400 text-green-600 p-2 mt-3 text-center rounded">
                {inviteSuccessMessage}
              </div>
            ) : (
              <>
                {" "}
                <div className="text-xs lg:text-sm my-2 mt-4 text-slate-500">
                  Inviting <span className="font-bold">{inviteData.name}</span>{" "}
                  for the <span className="font-bold">{job.role}</span> role at{" "}
                  <span className="font-bold">{job.companyName}</span>. With{" "}
                  <span className="font-bold">{inviteData.workExperience}</span>{" "}
                  years of experience, their expected CTC is{" "}
                  <span className="font-bold">{inviteData.expectedCtc}</span>{" "}
                  LPA.
                </div>
                <div className="mt-4">
                  <form onSubmit={sendInvite}>
                    <label className="block star">Invite Message</label>
                    <textarea
                      className="rounded resize-none border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                      value={inviteMessage}
                      required
                      rows="6"
                      onChange={(e) => setInviteMessage(e.target.value)}
                    ></textarea>
                    <label className="block star">Meeting Link / URL</label>
                    <input
                      className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                      type="text"
                      value={inviteMeetLink}
                      required
                      placeholder="https://meet.google.com/sim-pl-hire"
                      onChange={(e) => setInviteMeetLink(e.target.value)}
                    />
                    <label className="block">Meeting Password (if any)</label>
                    <input
                      className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                      type="text"
                      value={inviteMeetPassword}
                      required
                      placeholder="Pass#123"
                      onChange={(e) => setInviteMeetPassword(e.target.value)}
                    />
                    <button className="bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded text-center flex justify-center">
                      {loading ? (
                        <div className="button-loader"></div>
                      ) : (
                        "Send Invite"
                      )}
                    </button>
                    {inviteErrorMessage ? (
                      <div className="bg-red-50 border border-red-100 text-red-600 p-2 text-sm mt-3 text-center rounded">
                        &#9888; {inviteErrorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        ""
      )}
      {deleteModal ? (
        <>
          <div className="overlay"></div>
          <div className="modal-container w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
            <div className="font-bold text-lg">
              Are you sure you want to delete this job?
            </div>
            <div className="mt-3 text-slate-500">
              Please be advised that once data is deleted, it cannot be
              recovered. If you prefer to make a job no longer visible on the
              candidate's portal, you have the option to deactivate it using the
              toggle feature. This action ensures that the job listing will be
              hidden from candidates while maintaining data integrity.
            </div>
            <div className="flex gap-3 mt-3">
              <div
                onClick={() => setDeleteModal(!deleteModal)}
                className="cursor-pointer bg-green-50 border border-green-100 text-green-600 p-2 rounded px-4"
              >
                Cancel
              </div>

              {deleting ? (
                <div className="cursor-pointer bg-red-500 w-28 flex justify-center border border-red-100 text-red-600 p-2 rounded px-4">
                  <div className="button-loader"></div>
                </div>
              ) : (
                <div
                  onClick={() => deleteJob()}
                  className="cursor-pointer bg-red-50 w-38 border border-red-100 text-red-600 p-2 rounded px-4"
                >
                  Yes, Delete
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {deleteModal || inviteModal ? (
        ""
      ) : (
        <>
          <RecruiterNav />
          <div className="modal-container-2 w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
            {loading ? (
              <div className="page-loader-black"></div>
            ) : deleting ? (
              <div className="flex justify-center items-center flex-col gap-5">
                <div className="page-loader-black"></div>
                <div>Please wait, Deleting this Job</div>
              </div>
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
                      {job.role}
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div>
                      {job.isActive == true ? (
                        <div
                          onClick={() => changeStatus(job._id)}
                          className="flex justify-center items-center  rounded h-8 w-8 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-800"
                        >
                          <i className="fas fa-toggle-on" />
                        </div>
                      ) : (
                        <div
                          onClick={() => changeStatus(job._id)}
                          className="flex justify-center items-center  rounded h-8 w-8 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-800"
                        >
                          <i className="fas fa-toggle-off" />
                        </div>
                      )}{" "}
                    </div>
                    {deleteModal ? (
                      <div
                        onClick={() => setDeleteModal(!deleteModal)}
                        className="flex justify-center items-center  rounded h-8 w-8 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-800"
                      >
                        <i className="fas fa-close" />
                      </div>
                    ) : (
                      <div
                        onClick={() => setDeleteModal(!deleteModal)}
                        className="flex justify-center items-center  rounded h-8 w-8 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-800"
                      >
                        <i className="fas fa-trash" />
                      </div>
                    )}
                  </div>
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
                      onClick={() => setContent("applications")}
                      className={`${
                        content == "applications"
                          ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                          : ""
                      }`}
                    >
                      Applications ({applicationsCount})
                    </div>
                  </div>
                  {content === "details" ? (
                    <div>
                      <div className="flex flex-col lg:flex-row gap-2">
                        <div>
                          Hiring For -
                          <span className="font-bold">{job.companyName}</span>
                        </div>
                        <div className="hidden lg:inline">|</div>
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
                          Created On -
                          <span className="font-bold">
                            {" "}
                            {moment(job.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}{" "}
                          </span>
                        </div>
                        <div className="hidden lg:inline">|</div>
                        <div>
                          Last Update On -{" "}
                          <span className="font-bold">
                            {" "}
                            {moment(job.updatedAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}{" "}
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
                      <div className="text-xs lg:text-sm flex gap-2 mb-3">
                        <div
                          onClick={() => setApplicationToShow("submitted")}
                          className={`${
                            applicationToShow == "submitted"
                              ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                              : ""
                          }`}
                        >
                          Submitted
                        </div>
                        <div
                          onClick={() => setApplicationToShow("viewed")}
                          className={`${
                            applicationToShow == "viewed"
                              ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                              : ""
                          }`}
                        >
                          Viewed
                        </div>
                        <div
                          onClick={() => setApplicationToShow("shortlisted")}
                          className={`${
                            applicationToShow == "shortlisted"
                              ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                              : ""
                          }`}
                        >
                          Shortlisted
                        </div>
                        <div
                          onClick={() => setApplicationToShow("invited")}
                          className={`${
                            applicationToShow == "invited"
                              ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                              : ""
                          }`}
                        >
                          Invite Sent
                        </div>
                        <div
                          onClick={() => setApplicationToShow("hired")}
                          className={`${
                            applicationToShow == "hired"
                              ? "text-green-700 font-bold border-b-2 pb-1 border-green-700"
                              : ""
                          }`}
                        >
                          Hired
                        </div>
                      </div>
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
                              <span className="font-bold">{data.status}</span>
                            </div>{" "}
                          </div>
                          <div className="my-2 text-lg lg:text-xl font-bold">
                            {data.name}
                            <span className="block text-xs text-slate-400 font-medium">
                              Applied on:{" "}
                              {moment(data.createdAt).format("MMM Do YY")}
                            </span>
                          </div>
                          <div className="my-2 flex gap-3 text-xs lg:text-sm">
                            <div>
                              Email:{" "}
                              <span className="font-bold">{data.email}</span>
                            </div>
                            <div className="hidden lg:inline">|</div>
                            <div>
                              Phone:{" "}
                              <span className="font-bold">{data.phone}</span>
                            </div>
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
                                to={`${data.resumeLink}`}
                                onClick={() => markViewed(data._id)}
                              >
                                View Resume&nbsp;
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                              </NavLink>
                            </div>
                          </div>
                          <div className="mt-2">
                            {data.status == "submitted" ||
                            data.status == "viewed" ? (
                              <div
                                onClick={() => markShortlisted(data._id)}
                                className="p-1 px-2 rounded text-xs lg:text-sm border border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-200 hover:text-blue-900 w-fit"
                              >
                                Shortlist
                              </div>
                            ) : data.status == "shortlisted" ? (
                              <div
                                onClick={() => openInviteModal(data)}
                                className="p-1 px-2 rounded text-xs lg:text-sm border border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-200 hover:text-blue-900 w-fit"
                              >
                                Send Invite
                              </div>
                            ) : data.status == "invited" ? (
                              <div
                                onClick={() => markShortlisted(data._id)}
                                className="p-1 px-2 rounded text-xs lg:text-sm border border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-200 hover:text-blue-900 w-fit"
                              >
                                Mark Hired
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ))}
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

export default ViewJob;
