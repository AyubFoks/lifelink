import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import HospitalDashboard from "./pages/Dashboard/HospitalDashboard";
import DonorDashboardPage from "./pages/Dashboard/DonorDashboardPage";
import About from "./components/common/About";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/register/:role" element={<Register />} />  
          <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
          <Route path="/dashboard/donor" element={<DonorDashboardPage />} />
          {/* note to self to add protected routes */}
        </Routes>
      </main>
    </div>
  );
}
