import React from "react";
import NavOne from "../components/NavOne";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <NavOne />
      <div className="py-10 h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">SimplHire</h1>
          <p className="text-lg text-center mb-8">
            Your Job Listing and Applicant Tracking Solution
          </p>
          <a
            href="#"
            className="bg-green-600 text-white py-2 px-4 rounded-full text-lg font-semibold transition duration-300 hover:bg-green-600 hover:text-white"
          >
            Get Started
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
