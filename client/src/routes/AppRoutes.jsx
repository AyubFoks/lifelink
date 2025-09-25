import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DonorDashboardPage from "../pages/Dashboard/DonorDashboardPage";
import HospitalDashboard from "../pages/Dashboard/HospitalDashboard";
import RequestsPage from "../pages/RequestsPage";
import DonationRequestForm from "../pages/DonationRequestForm";
import ScheduleAppointment from "../pages/ScheduleAppointment";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/requests" element={<RequestsPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['donor']} />}>
          <Route path="/dashboard/donor" element={<DonorDashboardPage />} />
          <Route path="/donations/schedule/:id" element={<ScheduleAppointment />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={['hospital_admin']} />}>
          <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
          <Route path="/request-donation" element={<DonationRequestForm />} />
        </Route>

        {/* Add a fallback for any other routes or a 404 page */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
