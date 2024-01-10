import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import API_URL from "../apiConfig";
import jwt from "jsonwebtoken";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userInfo, setUserData] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const [listedJobs, setListedJobs] = useState([]);
  const [validToken, setValidToken] = useState(false);

  const getUserData = async () => {
    if (userType === "recruiter") {
      try {
        const res = await axios.get(`${API_URL}/recruiter/find/${userId}`);
        setUserData(res.data.user);
      } catch (error) {}
    } else {
      try {
        const res = await axios.get(`${API_URL}/candidate/find/${userId}`);
        setUserData(res.data.user);
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (userId && userType) {
      getUserData();
    }
  }, [userId]);
  const reloadUserData = async () => {
    await getUserData();
  };

  const getListedJobs = async () => {
    if (userType === "recruiter") {
      try {
        const res = await axios.get(`${API_URL}/jobs/view-all/${userId}`);
        setListedJobs(res.data.jobs);
      } catch (error) {}
    } else {
      return;
    }
  };
  const reloadJobs = async () => {
    await getListedJobs();
  };
  const validateToken = async () => {
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        setValidToken(false);
      } else {
        setValidToken(true);
      }
    } else {
      setValidToken(false);
    }
  };
  useEffect(() => {
    getListedJobs();
    validateToken();
  }, []);
  const contextValue = {
    userInfo,
    reloadUserData,
    listedJobs,
    reloadJobs,
    validToken,
  };
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
