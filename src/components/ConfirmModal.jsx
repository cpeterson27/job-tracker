import React from "react";

export default function ConfirmModal({ message = "Are you sure?", onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-sm shadow">
        <h3 className="text-lg font-semibold mb-4">Confirm</h3>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={onCancel}>Cancel</button>
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}



