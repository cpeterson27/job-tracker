import React, { useState, useEffect } from "react";
import { getAllItems, addItem, deleteItem, updateItem } from "../utils/db";
import { JobContext } from "./JobContext";

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function loadJobs() {
      const all = await getAllItems("jobs");
      setJobs(all);
    }
    loadJobs();
  }, []);

  const addJob = async (job) => {
    const id = await addItem("jobs", job);
    setJobs([...jobs, { ...job, id }]);
  };

  const deleteJob = async (id) => {
    await deleteItem("jobs", id);
    setJobs(jobs.filter((j) => j.id !== id));
  };

  const updateJob = async (id, updatedJob) => {
    await updateItem("jobs", { ...updatedJob, id });
    setJobs(jobs.map((j) => (j.id === id ? { ...updatedJob, id } : j)));
  };

  const toggleFavorite = async (id) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === id) {
          const updatedJob = { ...job, favorite: !job.favorite };
          updateItem("jobs", updatedJob); // persist in IndexedDB
          return updatedJob;
        }
        return job;
      })
    );
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob, updateJob, toggleFavorite }}>
      {children}
    </JobContext.Provider>
  );
};
