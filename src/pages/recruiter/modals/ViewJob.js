import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import API_URL from "../../../apiConfig";
import moment from "moment";
import RecruiterNav from "../../../components/RecruiterNav";
import { useLocation, useNavigate } from "react-router-dom";

const ViewJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobId = location.pathname.split("/")[4];

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [job, setJob] = useState([]);
  const [content, setContent] = useState("details");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
  return (
    <>
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
      <RecruiterNav />
      <div className="modal-container w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
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
                <div className="font-bold text-lg lg:text-xl">{job.role}</div>
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
                  Applications
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
                <div></div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewJob;
