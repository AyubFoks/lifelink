import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/videos/blood_donation2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken video and improve text visibility */}
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-20"></div>

      {/* Content on top of the video */}
      <div className="relative z-30 p-5 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Connecting Donors, Hospitals & Patients
        </h1>
        <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8">
          LifeLink bridges the gap between donors, hospitals, and patients, making life-saving resources accessible to those in need.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login/donor"
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            For Donors
          </Link>
          <Link
            to="/login/hospital"
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            For Hospitals
          </Link>
        </div>
      </div>
    </div>
  );
}