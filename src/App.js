import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ActivateAccount from "./pages/auth/ActivateAccount";
import Home from "./pages/recruiter/Home";
import Protected from "./middlewares/Protected";
import { DataProvider } from "./middlewares/dataContext";
import RecruiterRoute from "./middlewares/RecruiterRoute";
import Jobs from "./pages/recruiter/Jobs";
import ViewJob from "./pages/recruiter/modals/ViewJob";
import PublicJobs from "./pages/Jobs";
import SingleJob from "./pages/SingleJob";
import CandidateRoutes from "./middlewares/CandidateRoutes";
import Profile from "./pages/Profile";
import UploadResume from "./pages/UploadResume";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage}></Route>
          <Route path="/jobs" Component={PublicJobs}></Route>
          <Route path="/jobs/view/:id" Component={SingleJob}></Route>

          <Route path="/auth/login" Component={Login}></Route>
          <Route path="/auth/signup" Component={Signup}></Route>
          <Route
            path="/auth/forgot-password"
            Component={ForgotPassword}
          ></Route>
          <Route
            path="/auth/activate-account/:token/:type"
            Component={ActivateAccount}
          ></Route>
          <Route
            path="/profile"
            element={<CandidateRoutes Component={Profile} />}
          ></Route>
          <Route
            path="/upload-resume"
            element={<CandidateRoutes Component={UploadResume} />}
          ></Route>
          {/* Recruiter Routes */}
          <Route
            path="/recruiter/home"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
          <Route
            path="/recruiter/jobs/posted"
            element={<RecruiterRoute Component={Jobs} />}
          ></Route>
          <Route
            path="/recruiter/jobs/create-new"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
          <Route
            path="/recruiter/jobs/update/:id"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
          <Route
            path="/recruiter/job/update/:id"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
          <Route
            path="/recruiter/jobs/view/:id"
            element={<RecruiterRoute Component={ViewJob} />}
          ></Route>
          <Route
            path="/recruiter/application/all"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
          <Route
            path="/recruiter/application/view"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
          <Route
            path="/recruiter/application/update/:id"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
          <Route
            path="/recruiter/profile"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
          <Route
            path="/recruiter/profile/update"
            element={<RecruiterRoute Component={Home} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
