import axios from "axios";
import React, { useState } from "react";
import API_URL from "../../../apiConfig";

const NewJob = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const postedBy = localStorage.getItem("userId");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [expRequired, setExpRequired] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [totalPositions, setTotalPositions] = useState("");
  const [acceptTill, setAcceptTill] = useState("");
  const [description, setDescription] = useState("");
  const newJob = async (e) => {
    e.preventDefault();
    const data = {
      postedBy,
      companyName,
      role,
      location,
      expRequired,
      minSalary,
      maxSalary,
      totalPositions,
      acceptTill,
      description,
    };
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/jobs/create`, data);
      setCompanyName("");
      setRole("");
      setLocation("");
      setExpRequired("");
      setMinSalary("");
      setMaxSalary("");
      setTotalPositions("");
      setAcceptTill("");
      setDescription("");
      setSuccessMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message || " Something Went Wrong");
      setLoading(false);
    }
  };
  return (
    <div className="modal-container w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-lg lg:text-xl">Post New Job</div>
        <div
          onClick={closeModal}
          className="bg-red-50 text-red-600 hover:bg-red-100 flex justify-center items-center p-2 rounded w-10 h-10"
        >
          <i className="fas fa-close" />
        </div>
      </div>
      <div className="mt-5">
        <form onSubmit={newJob}>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
            <div className="w-full lg:w-1/2">
              <label className="block star">Company Name</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="text"
                value={companyName}
                required
                placeholder="SimplHire"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block star">Role</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="text"
                value={role}
                required
                placeholder="Senior Software Developer"
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
            <div className="w-full lg:w-1/2">
              <label className="block star">Location</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="text"
                value={location}
                required
                placeholder="Noida, India"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block star">
                Experience Required ( In Years )
              </label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="text"
                value={expRequired}
                required
                placeholder="0-1"
                onChange={(e) => setExpRequired(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">Salary Range ( Yearly / LPA )</div>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
            <div className="w-full lg:w-1/2">
              <label className="block star">Minimum</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="number"
                value={minSalary}
                required
                placeholder="20"
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block star">Maximum</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="number"
                value={maxSalary}
                required
                placeholder="30"
                onChange={(e) => setMaxSalary(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
            <div className="w-full lg:w-1/2">
              <label className="block star">Number of Positions</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="number"
                value={totalPositions}
                required
                placeholder="2"
                onChange={(e) => setTotalPositions(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block star">Accept Application till</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="date"
                value={acceptTill}
                required
                placeholder="30"
                onChange={(e) => setAcceptTill(e.target.value)}
              />
            </div>
          </div>
          <label className="block star">Description</label>
          <textarea
            className="rounded resize-none border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
            value={description}
            required
            rows="6"
            placeholder="We are seeking an experienced and highly skilled Senior Software Developer to join our dynamic team. In this role, you will lead the design and development of complex software solutions, collaborating with cross-functional teams to deliver high-quality products. As a senior member, you'll bring expertise in full-stack development, "
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button className="bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded-full text-center flex justify-center">
            {loading ? <div className="button-loader"></div> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewJob;
