import React, { useState, useContext } from "react";
import { JobContext } from "../context/JobContext";
import { ResumeContext } from "../context/ResumeContext";
import { CoverLetterContext } from "../context/CoverLetterContext";

export default function JobModal({ job, onClose }) {
  const { addJob, updateJob } = useContext(JobContext);
  const { resumes } = useContext(ResumeContext);
  const { coverLetters } = useContext(CoverLetterContext);

  const [title, setTitle] = useState(job?.title || "");
  const [description, setDescription] = useState(job?.description || "");
  const [status, setStatus] = useState(job?.status || "none");
  const [contactName, setContactName] = useState(job?.contactName || "");
  const [contactType, setContactType] = useState(job?.contactType || "");
  const [linkedInURL, setLinkedInURL] = useState(job?.linkedInURL || "");
  const [notes, setNotes] = useState(job?.notes || "");
  const [resumeId, setResumeId] = useState(job?.resumeId || "");
  const [coverLetterId, setCoverLetterId] = useState(job?.coverLetterId || "");
  const [appliedDate, setAppliedDate] = useState(job?.appliedDate || "");

  const handleSave = () => {
    const jobData = {
      ...job,
      title,
      description,
      status,
      contactName,
      contactType,
      linkedInURL,
      notes,
      resumeId,
      coverLetterId,
      appliedDate,
    };

    if (job?.id) {
      updateJob(job.id, jobData);
    } else {
      addJob(jobData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
        <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
    >
      X
    </button>
        <h2 className="text-xl font-bold mb-4">{job?.id ? "Edit Job" : "Add Job"}</h2>

        <input
          className="w-full mb-2 border p-2 rounded"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-2 border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="mb-2">
          <label>Status:</label>
          <select
            className="ml-2 border rounded p-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="none">None</option>
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="mb-2">
          <label>Contact Name:</label>
          <input
            className="ml-2 border rounded p-1"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label>Contact Type:</label>
          <select
            className="ml-2 border rounded p-1"
            value={contactType}
            onChange={(e) => setContactType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="recruiter">Recruiter</option>
            <option value="employee">Employee</option>
            <option value="friend">Friend</option>
          </select>
        </div>

        <div className="mb-2">
          <label>LinkedIn URL:</label>
          <input
            className="ml-2 border rounded p-1"
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label>Notes:</label>
          <textarea
            className="w-full border rounded p-1"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label>Resume:</label>
          <select
            className="ml-2 border rounded p-1"
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
          >
            <option value="">Select Resume</option>
            {resumes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Cover Letter:</label>
          <select
            className="ml-2 border rounded p-1"
            value={coverLetterId}
            onChange={(e) => setCoverLetterId(e.target.value)}
          >
            <option value="">Select Cover Letter</option>
            {coverLetters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Date Applied:</label>
          <input
            type="date"
            className="ml-2 border rounded p-1"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}















