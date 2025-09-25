import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/LandingPage";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import HospitalDashboard from "../pages/HospitalDashboard/HospitalDashboard";
import DonorDashboard from "../pages/DonorDashboard/DonorDashboard";
import { useAuth } from "../context/AuthContext";

// Protected route wrapper
function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/requests" element={<Requests />} />
      <Route
        path="/hospital"
        element={
          <PrivateRoute role="hospital">
            <HospitalDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/create-request" element={
        <ProtectedRoute role="hospital">
          <CreateRequest />
        </ProtectedRoute>
      } />
      <Route
        path="/donor"
        element={
          <PrivateRoute role="donor">
            <DonorDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
