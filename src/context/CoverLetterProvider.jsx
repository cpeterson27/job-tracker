import React, { useState, useEffect } from 'react';
import { getAllItems, addItem, deleteItem } from '../utils/db';
import { CoverLetterContext } from './CoverLetterContext';

export const CoverLetterProvider = ({ children }) => {
  const [coverLetters, setCoverLetters] = useState([]);

  useEffect(() => {
    async function loadCoverLetters() {
      const all = await getAllItems('coverLetters');
      setCoverLetters(all);
    }
    loadCoverLetters();
  }, []);

  const addCoverLetter = async (cl) => {
    const id = await addItem('coverLetters', cl);
    setCoverLetters((prev) => [...prev, { ...cl, id }]);
  };

  const deleteCoverLetter = async (id) => {
    await deleteItem('coverLetters', id);
    setCoverLetters((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CoverLetterContext.Provider value={{ coverLetters, addCoverLetter, deleteCoverLetter }}>
      {children}
    </CoverLetterContext.Provider>
  );
};




