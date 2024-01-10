import React from "react";
import RecruiterNav from "../../components/RecruiterNav";
import { useData } from "../../middlewares/dataContext";
import NavOne from "../../components/NavOne";

const Home = () => {
  const { userInfo } = useData();
  return (
    <>
      <NavOne />
      <div className="p-4">
        <div className="text-lg lg:text-2xl font-medium">
          Welcome Back, <span className="font-bold">{userInfo.name}</span>
        </div>
      </div>
    </>
  );
};

export default Home;
