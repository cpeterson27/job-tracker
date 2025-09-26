import React, { useContext, useState } from "react";
import { JobContext } from "../context/JobContext";
import JobCard from "../components/JobCard";
import JobModal from "../components/JobModal";

export default function JobsPage() {
  const { jobs } = useContext(JobContext);
  const [editingJob, setEditingJob] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Combine filter and search logic
  const filteredJobs = jobs.filter((job) => {
    // Filter logic
    let passesFilter;
    if (filter === "all") {
      passesFilter = true;
    } else if (filter === "favorites") {
      passesFilter = job.favorite === true;
    } else {
      passesFilter = job.status === filter;
    }

    if (!passesFilter) return false;

    // Search logic
    const term = searchTerm.toLowerCase();
    const passesSearch =
      job.title?.toLowerCase().includes(term) ||
      job.company?.toLowerCase().includes(term) ||
      job.description?.toLowerCase().includes(term);

    return passesSearch;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Jobs</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by title, company, or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "favorites", "applied", "interviewed", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Job cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={setEditingJob}
            className="transform transition-transform hover:scale-105"
          />
        ))}
      </div>

      {/* Job modal */}
      {editingJob && <JobModal job={editingJob} onClose={() => setEditingJob(null)} />}
    </div>
  );
}
















