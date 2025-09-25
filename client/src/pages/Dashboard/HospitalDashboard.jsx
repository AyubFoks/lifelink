// Mock data, replace with API calls
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar.jsx";
import Footer from "../../components/common/Footer/Footer.jsx";
import Button from "../../components/ui/Button.jsx";
import authService from "../../services/authService";

// Mock data, replace with API calls
const inventoryData = [
  { resource: "Blood Type A+", qty: 15, status: "Available", updated: "2025-09-19" },
  { resource: "Blood Type O-", qty: 3, status: "Low", updated: "2025-09-24" },
  { resource: "Platelets", qty: 22, status: "Available", updated: "2025-09-22" },
  { resource: "Plasma", qty: 5, status: "Low", updated: "2025-09-23" },
];

const requestData = [
    { id: "REQ-01-001", resource: "Blood Type A+", qty: 10, status: "Fulfilled", updated: "2025-08-21" },
    { id: "REQ-01-002", resource: "Blood Type O-", qty: 5, status: "Pending", updated: "2025-09-23" },
    { id: "REQ-01-003", resource: "Platelets", qty: 8, status: "Pending", updated: "2025-09-24" },
];

const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
        case 'available':
        case 'fulfilled':
            return 'bg-green-100 text-green-800';
        case 'low':
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function HospitalDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      const res = await authService.get('/requests?status=all');
      if (res?.data) {
        // filter requests to this user's hospital
        const hospitalId = user?.hospital_id || user?.hospital?.id;
        const filtered = res.data.filter(r => r.hospital_id === hospitalId);
        setRequests(filtered);
      }
      setLoading(false);
    };
    if (user && user.role === 'hospital_admin') loadRequests();
  }, [user]);

  useEffect(() => {
    const loadAppointments = async () => {
      // fetch scheduled donations for this hospital
      const res = await authService.get('/donations/hospital?status=Scheduled');
      if (res?.data) setAppointments(res.data);
    };
    if (user && user.role === 'hospital_admin') loadAppointments();
  }, [user]);

  if (!user || user.role !== 'hospital_admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 font-bold">Unauthorized access.</p>
        <Link to="/login/hospital">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  // The hospital info is now nested inside the user object
  const hospitalName = user.hospital ? user.hospital.name : "Your Hospital";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-12 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center gap-10">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{hospitalName} Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage blood inventory and requests.</p>
              </div>
              <div className="flex gap-4">
                <Button className= "text-white py-2 px-3" onClick={() => navigate("/request-donation")}>Request Donation</Button>
                <Button className= "text-white py-2 px-3" variant="secondary"  onClick={() => navigate("/dashboard/hospital/requests")}>View Requests</Button>
              </div>
            </div>
          </header>

          {/* Current Inventory Section */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Current Inventory</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.resource}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qty} Units</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                            {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          {/* Recent Requests Section */}
          {/* Oncoming (Scheduled) Appointments */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Scheduled Appointments</h2>
            {appointments.length === 0 ? (
              <p>No scheduled appointments.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((a) => (
                      <tr key={a.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{a.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.request_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.donor?.full_name || `Donor ${a.donor_id}`}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.appointment_date ? new Date(a.appointment_date).toLocaleString() : 'Not scheduled'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button
                            className= "text-white py-2 px-3"
                            variant="secondary"
                            onClick={async () => {
                              if (!confirm('Mark this donation as fulfilled? This will mark the request fulfilled and remove the appointment.')) return;
                              const res = await authService.post(`/donations/${a.id}/fulfill`);
                              if (res?.data) {
                                // remove from appointments list
                                setAppointments(prev => prev.filter(x => x.id !== a.id));
                                // refresh requests list
                                const rres = await authService.get('/requests?status=all');
                                if (rres?.data) {
                                  const hospitalId = user?.hospital_id || user?.hospital?.id;
                                  setRequests(rres.data.filter(r => r.hospital_id === hospitalId));
                                }
                              } else {
                                alert(res?.error?.message || 'Failed to fulfill donation');
                              }
                            }}
                          >
                            Fulfill
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Requests</h2>
            <div className="overflow-x-auto">
              {loading ? (
                <p>Loading requests...</p>
              ) : requests.length === 0 ? (
                <p>No requests found for your hospital.</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((req) => (
                      <tr key={req.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.patient_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.blood_type_needed}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{req.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

