import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";

export default function JobCard({ job, onEdit }) {
  const { deleteJob, toggleFavorite } = useContext(JobContext);

  const getStatusColor = () => {
    switch (job.status) {
      case "applied":
        return "bg-yellow-100 text-yellow-800";
      case "interviewed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow hover:scale-105 transform transition duration-200 bg-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{job.title}</h3>
        <button onClick={() => toggleFavorite(job.id)} className="text-red-500 text-xl">
          {job.favorite ? "❤️" : "🤍"}
        </button>
      </div>

      <p className="text-sm text-gray-700 mb-2">{job.description || "No description"}</p>

      {job.appliedDate && (
        <p className="text-xs text-gray-500 mb-2">Applied: {job.appliedDate}</p>
      )}

      {/* Status badge */}
      <p className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-3 ${getStatusColor()}`}>
        {job.status || "None"}
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => onEdit(job)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => deleteJob(job.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}


























































