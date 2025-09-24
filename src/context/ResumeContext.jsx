import React, { useState, useEffect } from "react";
import { getAllItems, addItem, deleteItem } from "../utils/db";
import ResumeContext from "./ResumeContext";

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    async function loadResumes() {
      const all = await getAllItems("resumes");
      setResumes(all);
    }
    loadResumes();
  }, []);

  const addResume = async (resume) => {
    const id = await addItem("resumes", resume);
    setResumes([...resumes, { ...resume, id }]);
  };

  const deleteResume = async (id) => {
    await deleteItem("resumes", id);
    setResumes(resumes.filter((r) => r.id !== id));
  };

  return (
    <ResumeContext.Provider value={{ resumes, addResume, deleteResume }}>
      {children}
    </ResumeContext.Provider>
  );
};









