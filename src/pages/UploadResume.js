import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavOne from "../components/NavOne";
import API_URL from "../apiConfig";
import { useData } from "../middlewares/dataContext";

const UploadResume = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");
  const userId = localStorage.getItem("userId");
  const [resumeName, setResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { userInfo } = useData();
  const [resumeLength, setResumeLength] = useState(0);
  const resume = userInfo && userInfo.resume ? userInfo.resume : [];

  useEffect(() => {
    const length = resume.length;
    console.log(userInfo);
    setResumeLength(length);
  }, [userInfo]);

  const handleResumeNameChange = (e) => {
    setResumeName(e.target.value);
  };

  const handleFileChange = (e) => {
    setResumeFile(null);
    setErrorMessage("");
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setResumeFile(selectedFile);
    } else {
      setErrorMessage("Please select a PDF file.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resumeName", resumeName);
      formData.append("resume", resumeFile);
      const response = await axios.post(
        `${API_URL}/candidate/upload-resume/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      window.location.href = "/profile";
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <NavOne />
      <div className="modal-container-2 w-11/12 lg:w-1/2 mx-auto  rounded mt-10 border border-green-200">
        <div className="flex gap-5 ">
          <div
            onClick={() => navigate(-1)}
            className="bg-red-50 text-red-600 hover:bg-red-100 flex justify-center items-center p-2 rounded w-8 h-8"
          >
            <i className="fas fa-arrow-left" />
          </div>
          <div className="font-bold md:text-lg lg:text-xl">Upload Resume</div>
        </div>
        {resumeLength >= 3 ? (
          <div className="mt-3 text-sm lg:text-base bg-red-50 text-red-600 border border-red-200 p-4 rounded">
            You have already uploaded the maximum allowed number of resumes. To
            upload a new resume, please delete one of your existing resumes.
            <span className="block font-bold mt-4">Max Allowed Count - 3</span>
          </div>
        ) : (
          <div>
            <form onSubmit={handleUpload}>
              <div className="w-full rounded bg-slate-50 p-10 my-3 border-slate-200 border flex justify-center items-center flex-col">
                <label
                  htmlFor="resumeinput"
                  className="cursor-pointer text-center"
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <div className="text-slate-500">
                    {resumeFile ? resumeFile.name : "Upload Resume"}
                  </div>
                </label>
                <input
                  type="file"
                  id="resumeinput"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <label className="block star">File Name</label>
              <input
                className="rounded border-2 p-2 w-full focus:border-green-600 focus:border-2 outline-none mb-3"
                type="text"
                placeholder="resume-1, resume-2, resume-latest"
                value={resumeName}
                required
                onChange={handleResumeNameChange}
              />{" "}
              <button className="bg-green-700 text-white font-medium hover:bg-green-800 p-3 w-full rounded text-center flex justify-center">
                {loading ? <div className="button-loader"></div> : "Upload"}
              </button>
            </form>
            {errorMessage ? (
              <div className="text-red-600 mt-3  text-center p-1 rounded-full">
                <i class="fa-solid fa-triangle-exclamation"></i> {errorMessage}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadResume;
