import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Job Tracker</h1>
      <div className="flex gap-4">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${
              isActive ? "bg-blue-800" : "hover:bg-blue-500"
            }`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${
              isActive ? "bg-blue-800" : "hover:bg-blue-500"
            }`
          }
        >
          Jobs
        </NavLink>
      </div>
    </nav>
  );
}
