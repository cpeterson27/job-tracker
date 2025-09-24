import React, { useState, useEffect } from "react";
import { getAllItems, addItem, deleteItem, updateItem } from "../utils/db";
import { CoverLetterContext } from "./CoverLetterContext";

export const CoverLetterProvider = ({ children }) => {
  const [coverLetters, setCoverLetters] = useState([]);

  useEffect(() => {
    async function loadCoverLetters() {
      const all = await getAllItems("coverLetters");
      setCoverLetters(all);
    }
    loadCoverLetters();
  }, []);

  const addCoverLetter = async (cl) => {
    const id = await addItem("coverLetters", cl);
    setCoverLetters([...coverLetters, { ...cl, id }]);
  };

  const deleteCoverLetter = async (id) => {
    await deleteItem("coverLetters", id);
    setCoverLetters(coverLetters.filter((c) => c.id !== id));
  };

  const updateCoverLetter = async (id, updatedCL) => {
    await updateItem("coverLetters", { ...updatedCL, id });
    setCoverLetters(coverLetters.map((c) => (c.id === id ? { ...updatedCL, id } : c)));
  };

  return (
    <CoverLetterContext.Provider value={{ coverLetters, addCoverLetter, deleteCoverLetter, updateCoverLetter }}>
      {children}
    </CoverLetterContext.Provider>
  );
};
