import React, { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import CoverLetterUpload from "../components/CoverLetterUpload";
import JobModal from "../components/JobModal";

export default function ProfilePage() {
  // const { addJob } = useContext(JobContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddJob = () => setModalOpen(true);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="mb-6">
        <ResumeUpload />
        <CoverLetterUpload />
      </div>

      <button onClick={handleAddJob} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add New Job
      </button>

      {modalOpen && <JobModal job={{}} onClose={() => setModalOpen(false)} />}
    </div>
  );
}















