import React from "react";
import icon from '../../assets/images/lifelink-welcome-icon.svg'

export default function SuccessScreen({ user }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-[#FDFBF9]">
      {/* Example GIF */}
      <img
        src={icon}
        alt="Success"
        className="w-40 h-40 mb-6"
      />

      {/* Message */}
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {user?.full_name || user?.name || user?.adminName || user?.email || "User"}!
      </h1>

      {/* Spinner */}
      <div className="mt-4 w-10 h-10 border-4 border-[#921223] border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-600">Loading your dashboard...</p>
    </div>
  );
}
