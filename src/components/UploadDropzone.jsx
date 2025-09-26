import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

export default function UploadDropzone({ label, accept, onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
  const handleFileInput = (e) => {
    if (e.target.files.length > 0) onFilesSelected(e.target.files);
  };

  // Combine classes safely
  const baseClasses =
    "w-full h-44 p-4 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer transition";
  const hoverClasses = "hover:bg-blue-50 hover:border-2 hover:border-blue-400";
  const dragClasses = "bg-blue-50 border-2 border-blue-400";

  return (
    <div
      className={`${baseClasses} ${isDragging ? dragClasses : "bg-white border border-gray-200"} ${hoverClasses}`}
      onClick={() => document.getElementById(label).click()}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FaFileUpload className="text-gray-600 text-4xl mb-3" />
      <span className="font-semibold text-center mb-1">{label}</span>
      <span className="text-gray-400 text-sm text-center">Click or drag files here</span>
      <input
        id={label}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
}







