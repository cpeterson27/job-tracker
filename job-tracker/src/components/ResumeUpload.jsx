import React, { useContext, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";

export default function ResumeUpload() {
  const { resumes, addResume } = useContext(ResumeContext);
  const fileInput = useRef();

  const handleUpload = () => {
    const file = fileInput.current.files[0];
    if (file) {
      addResume({ name: file.name, file });
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Resumes</h3>
      <input type="file" ref={fileInput} onChange={handleUpload} className="mb-2" />
      <ul>
        {resumes.map((r) => (
          <li key={r.id}>{r.name}</li>
        ))}
      </ul>
    </div>
  );
}





