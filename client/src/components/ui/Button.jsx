import React from "react";

export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 rounded-md shadow-sm bg-red-700 text-white font-semibold hover:opacity-95 ${className}`}
    >
      {children}
    </button>
  );
}
