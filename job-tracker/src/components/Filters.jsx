import React from "react";

export default function Filters({ selected, setSelected }) {
  const statuses = [
    { key: "all", label: "All" },
    { key: "favorites", label: "Favorites" },
    { key: "applied", label: "Applied" },
    { key: "interviewed", label: "Interviewed" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {statuses.map(s => (
        <button
          key={s.key}
          onClick={() => setSelected(s.key)}
          className={`px-3 py-2 rounded ${selected === s.key ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}


