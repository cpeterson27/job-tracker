import React, { useState, useEffect } from "react";
import { getAllItems, addItem, deleteItem } from "../utils/db";
import { CoverLetterContext } from "./CoverLetterContext";

export const CoverLetterProvider = ({ children }) => {
  const [coverLetters, setCoverLetters] = useState([]);

  // Load all cover letters on mount
  useEffect(() => {
    async function loadCoverLetters() {
      const all = await getAllItems("coverLetters");
      setCoverLetters(all);
    }
    loadCoverLetters();
  }, []);

  // Add a new cover letter
  const addCoverLetter = async (coverLetter) => {
    const id = await addItem("coverLetters", coverLetter);
    setCoverLetters([...coverLetters, { ...coverLetter, id }]);
  };

  // Delete a cover letter
  const deleteCoverLetter = async (id) => {
    await deleteItem("coverLetters", id);
    setCoverLetters(coverLetters.filter((c) => c.id !== id));
  };

  return (
    <CoverLetterContext.Provider
      value={{ coverLetters, addCoverLetter, deleteCoverLetter }}
    >
      {children}
    </CoverLetterContext.Provider>
  );
};




