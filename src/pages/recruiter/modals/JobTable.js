import React, { useState } from "react";
import { useData } from "../../../middlewares/dataContext";
import moment from "moment";
import axios from "axios";
import API_URL from "../../../apiConfig";
import ViewJob from "./ViewJob";
import { NavLink } from "react-router-dom";

const JobTable = () => {
  const { listedJobs, reloadJobs } = useData();
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
      <div class="container">
        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead class="text-white">
            {listedJobs.map((data) => (
              <tr class="bg-green-700 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th class="p-3 text-left">Company</th>
                <th class="p-3 text-left">Role</th>
                <th class="p-3 text-left">Location</th>
                <th class="p-3 text-left">Created On</th>
                <th class="p-3 text-left">Actions</th>
                <th class="p-3 text-left">Status</th>
              </tr>
            ))}
          </thead>
          <tbody class="flex-1 sm:flex-none">
            {listedJobs.map((data) => (
              <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                <td class="border-grey-light border hover:bg-gray-100 p-3">
                  {data.companyName}
                </td>
                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {data.role}{" "}
                </td>
                <td class="border-grey-light border hover:bg-gray-100 p-3">
                  {data.location}
                </td>
                <td class="border-grey-light border hover:bg-gray-100 p-3">
                  {moment(data.createdAt).format("MMM Do YY")}{" "}
                </td>
                <td class="border-grey-light border p-3 flex gap-2">
                  <NavLink
                    to={`/recruiter/jobs/view/${data._id}`}
                    className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 p-2 rounded w-7 h-7 flex items-center justify-center"
                  >
                    <i className="fas fa-eye" />
                  </NavLink>
                  <p className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-800 p-2 rounded w-7 h-7 flex items-center justify-center">
                    <i className="fas fa-pen-to-square" />
                  </p>
                </td>
                <td class="border-grey-light border hover:bg-gray-100 p-3">
                  {data.isActive == true ? (
                    <p
                      onClick={() => changeStatus(data._id)}
                      className="text-2xl text-green-600"
                    >
                      <i className="fas fa-toggle-on" />
                    </p>
                  ) : (
                    <p
                      onClick={() => changeStatus(data._id)}
                      className="text-2xl text-red-600"
                    >
                      <i className="fas fa-toggle-off" />
                    </p>
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JobTable;
