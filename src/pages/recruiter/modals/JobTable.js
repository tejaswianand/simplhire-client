import React, { useState } from "react";
import { useData } from "../../../middlewares/dataContext";
import moment from "moment";
import axios from "axios";
import API_URL from "../../../apiConfig";
import ViewJob from "./ViewJob";
import { NavLink, useNavigate } from "react-router-dom";

const JobTable = () => {
  const { listedJobs, reloadJobs } = useData();
  const navigate = useNavigate();
  const changeStatus = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/jobs/change-status/${id}`);
      reloadJobs();
    } catch (error) {}
  };
  const [viewJobModal, setViewJobModal] = useState(false);
  const [jid, setJid] = useState("");

  return (
    <>
      {viewJobModal ? (
        <>
          <div className="overlay"></div>
          <ViewJob
            jobId={jid}
            closeModal={() => setViewJobModal(!viewJobModal)}
          />
        </>
      ) : (
        ""
      )}
      <div className="flex flex-col lg:flex-row gap-3">
        {listedJobs.map((data) => (
          <div
            className="rounded p-2 border border-slate-200 w-full lg:w-1/4"
            key={data._id}
          >
            <div className="uppercase text-slate-400 text-xs lg:text-sm">
              {data._id}
            </div>
            <div className="mt-2 font-bold lg:text-xl">
              {data.role} @ {data.companyName}
            </div>
            <div className="flex mt-2">
              <div>Salary Range:&nbsp;</div>
              <div className="flex">
                {" "}
                <div>{data.minSalary} to </div>
                <div>&nbsp;{data.maxSalary} (LPA)</div>
              </div>
            </div>
            <div className="mt-3 flex gap-3">
              <div
                onClick={() => navigate(`/recruiter/jobs/view/${data._id}`)}
                className="cursor-pointer hover:bg-blue-100 hover:text-blue-800 text-blue-600 bg-blue-50 border border-blue-200 p-1 px-3 w-fit rounded text-xs lg:text-sm"
              >
                View Job
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobTable;
