import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { JobProvider } from "./context/JobContext";
import { ResumeProvider } from "./context/ResumeContext";
import { CoverLetterProvider } from "./context/CoverLetterContext";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import JobsPage from "./pages/JobsPage";

export default function App() {
  return (
    <JobProvider>
      <ResumeProvider>
        <CoverLetterProvider>
          <Router>
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
