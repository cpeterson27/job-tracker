import React, { useState, useContext } from "react";
import { CoverLetterContext } from "../context/CoverLetterContext";
import { ResumeContext } from "../context/ResumeContext";
import UploadDropzone from "../components/UploadDropzone";
import GoogleDrivePicker from "../components/GoogleDrivePicker";
import JobModal from "../components/JobModal";
import { FaFilePdf, FaFileWord, FaGoogleDrive, FaTrash } from "react-icons/fa";

export default function ProfilePage() {
  const { coverLetters, addCoverLetter, deleteCoverLetter } = useContext(CoverLetterContext);
  const { resumes, addResume, deleteResume } = useContext(ResumeContext);

  const [modalOpen, setModalOpen] = useState(false);

  const handleAddJob = () => setModalOpen(true);

  // --- Local file handlers ---
  const handleLocalResumeFiles = (files) => {
    Array.from(files).forEach((file) => {
      const fileUrl = URL.createObjectURL(file); // generate URL once
      addResume({ id: crypto.randomUUID(), name: file.name, type: file.type || "", uploadedAt: new Date(), file, url: fileUrl });
    });
  };

  const handleLocalCoverLetterFiles = (files) => {
    Array.from(files).forEach((file) => {
      const fileUrl = URL.createObjectURL(file);
      addCoverLetter({ id: crypto.randomUUID(), name: file.name, type: file.type || "", uploadedAt: new Date(), file, url: fileUrl });
    });
  };

  // --- Google Drive handler ---
  const handleDriveFiles = (files) => {
    files.forEach((file) => {
      const newFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.mimeType || "",
        url: file.url,
        uploadedAt: new Date(),
      };
      if (file.name.toLowerCase().includes("resume")) addResume(newFile);
      else addCoverLetter(newFile);
    });
  };

  // --- File icon renderer ---
  const renderFileIcon = (file) => {
    const type = file.type || "";
    if (type.includes("pdf")) return <FaFilePdf className="text-red-500 text-2xl" />;
    if (type.includes("word") || type.includes("msword")) return <FaFileWord className="text-blue-600 text-2xl" />;
    return <FaGoogleDrive className="text-green-600 text-2xl" />;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <UploadDropzone
          label="Drag & drop your resume here"
          accept=".pdf,.doc,.docx"
          onFilesSelected={handleLocalResumeFiles}
        />
        <UploadDropzone
          label="Drag & drop your cover letter here"
          accept=".pdf,.doc,.docx"
          onFilesSelected={handleLocalCoverLetterFiles}
        />
        <GoogleDrivePicker onFilesSelected={handleDriveFiles} />
      </div>

      <button
        onClick={handleAddJob}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6"
      >
        Add New Job
      </button>

      {modalOpen && <JobModal job={{}} onClose={() => setModalOpen(false)} />}

      {/* Resumes */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Resumes</h3>
        {resumes.length === 0 ? (
          <p className="text-gray-500">No resumes uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {resumes.map((file) => (
              <li key={file.id} className="flex items-center justify-between border p-3 rounded shadow hover:shadow-lg transition bg-white">
                <div className="flex items-center gap-3">
                  {renderFileIcon(file)}
                  <span>{file.name}</span>
                </div>
                <div className="flex gap-2">
                  {file.url && (
                    <a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      View
                    </a>
                  )}
                  <button onClick={() => deleteResume(file.id)}>
                    <FaTrash className="text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cover Letters */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Cover Letters</h3>
        {coverLetters.length === 0 ? (
          <p className="text-gray-500">No cover letters uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {coverLetters.map((file) => (
              <li key={file.id} className="flex items-center justify-between border p-3 rounded shadow hover:shadow-lg transition bg-white">
                <div className="flex items-center gap-3">
                  {renderFileIcon(file)}
                  <span>{file.name}</span>
                </div>
                <div className="flex gap-2">
                  {file.url && (
                    <a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      View
                    </a>
                  )}
                  <button onClick={() => deleteCoverLetter(file.id)}>
                    <FaTrash className="text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}






































