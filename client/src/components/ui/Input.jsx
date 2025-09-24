import React from "react";

export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-red-200"
        {...props}
      />
    </div>
  );
}
