import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../context/CoverLetterContext";

export default function CoverLetterUpload() {
  const { coverLetters, addCoverLetter } = useContext(CoverLetterContext);
  const fileInput = useRef();

  const handleUpload = () => {
    const file = fileInput.current.files[0];
    if (file) {
      addCoverLetter({ name: file.name, file });
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Cover Letters</h3>
      <input type="file" ref={fileInput} onChange={handleUpload} className="mb-2" />
      <ul>
        {coverLetters.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}



