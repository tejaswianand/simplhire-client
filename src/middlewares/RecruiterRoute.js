import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const RecruiterRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    if (userType == "recruiter") {
      try {
        if (!token) {
          return navigate("/auth/login");
        }
        const decodedToken = jwt.decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          console.log("Token expired, redirecting to login");
          return navigate("/auth/login");
        }
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Token verification error:", error);
        return navigate("/auth/login");
      }
    } else {
      return navigate("/auth/login");
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? <Component /> : null}</React.Fragment>;
};

export default RecruiterRoute;
