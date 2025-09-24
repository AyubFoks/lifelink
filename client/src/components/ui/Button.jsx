import React from "react";

export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-[4px] px-[7px] rounded-[8px] shadow-sm bg-[#921223] font-semibold hover:opacity-95 ${className}`}
    >
      {children}
    </button>
  );
}
