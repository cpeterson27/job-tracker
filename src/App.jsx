import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { JobProvider } from "./context/JobProvider";
import { ResumeProvider } from "./context/ResumeProvider";
import { CoverLetterProvider } from "./context/CoverLetterProvider";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import JobsPage from "./pages/JobsPage";

export default function App() {
  return (
    <JobProvider>
      <ResumeProvider>
        <CoverLetterProvider>
          <Router basename="/job-tracker">
            <Navbar />

            <div className="p-6">
              <Routes>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/" element={<Navigate to="/profile" replace />} />
                <Route path="*" element={<Navigate to="/profile" replace />} />
              </Routes>
            </div>
          </Router>
        </CoverLetterProvider>
      </ResumeProvider>
    </JobProvider>
  );
}



