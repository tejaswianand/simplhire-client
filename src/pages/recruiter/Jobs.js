import React, { useState } from "react";
import RecruiterNav from "../../components/RecruiterNav";
import { useData } from "../../middlewares/dataContext";
import NewJob from "./modals/NewJob";
import JobTable from "./modals/JobTable";

const Jobs = () => {
  const { userInfo, listedJobs } = useData();
  const [newJobModal, setNewJobModal] = useState(false);
  return (
    <>
      {newJobModal ? (
        <>
          <div className="overlay"></div>
          <NewJob closeModal={() => setNewJobModal(!newJobModal)} />
        </>
      ) : (
        ""
      )}
      <RecruiterNav />
      <div className="p-4">
        <div className="flex justify-between font-medium items-center">
          <div className="text-lg lg:text-2xl">Listed Jobs</div>
          <button
            onClick={() => setNewJobModal(!newJobModal)}
            className="bg-green-900 p-2 rounded-full text-white px-5"
          >
            Post New Job +
          </button>
        </div>
        <div className="mt-5">
          <JobTable />
        </div>
      </div>
    </>
  );
};

export default Jobs;
