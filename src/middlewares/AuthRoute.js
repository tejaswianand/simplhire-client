import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useData } from "./dataContext";

const AuthRoute = (props) => {
  const { Component } = props;
  const { validToken } = useData();
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const checkUserToken = () => {
    if (validToken) {
      window.location.reload();
      setIsLoggedOut(false);
    } else {
      setIsLoggedOut(true);
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedOut]);

  return <React.Fragment>{isLoggedOut ? <Component /> : null}</React.Fragment>;
};

export default AuthRoute;
