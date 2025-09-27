import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";
import Navbar from '../../components/common/Navbar/Navbar.jsx';
import Footer from '../../components/common/Footer/Footer.jsx';
import Button from '../../components/ui/Button.jsx';
import authService from '../../services/authService';

// Helper component for stat cards
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="mr-4 text-red-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

// Helper component for section cards
const DashboardCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mt-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

export default function DonorDashboardPage() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      const res = await authService.get('/donations/history');
      if (res?.data) {
        setDonations(res.data);
      }
      setLoading(false);
    };
    loadHistory();
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading donor profile...</p>
      </div>
    );
  }

  if (user.role !== "donor") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 font-bold">Unauthorized: Not a donor account.</p>
        <Link to="/login/donor">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  const completed = donations.filter(d => d.status === 'Completed');
  const scheduled = donations.filter(d => d.status === 'Scheduled');
  const pending = donations.filter(d => d.status === 'Pending');

  const totalDonations = completed.length || (user.donations?.filter(d => d.status === 'Completed').length || 0);
  const livesSaved = totalDonations * 3; // Assuming 1 donation saves 3 lives

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-12 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.full_name}!</h1>
            <p className="text-gray-600 mt-2">Ready to make a difference today?</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <StatCard title="Total Donations" value={totalDonations} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>} />
            <StatCard title="Lives Saved" value={livesSaved} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
            <StatCard title="Blood Type" value={user.blood_type} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path fill="#FFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>} />
          </div>

          {/* Appointment Section */}
          <DashboardCard title="Schedule Your Next Appointment">
            <p className="text-gray-600 mb-4">Your accepted requests waiting for scheduling will appear below. Pick a time to confirm your appointment.</p>
            {pending.length > 0 ? (
              <div className="space-y-3">
                {pending.map(d => (
                  <div key={d.id} className="bg-white p-3 rounded border flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Request #{d.request_id}</div>
                      <div className="text-sm text-gray-500">{d.request?.blood_type_needed} — {d.request?.hospital?.name}</div>
                    </div>
                    <div>
                      <Link to={`/donations/schedule/${d.id}`}><Button className="text-white py-2 px-3">Schedule</Button></Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No appointments to schedule right now. Browse requests to accept one.</p>
            )}
          </DashboardCard>

          {/* Donation History Preview */}
          <DashboardCard title="Scheduled Appointments">
            {scheduled.length === 0 ? (
              <p>No scheduled appointments.</p>
            ) : (
              <ul>
                {scheduled.map(d => (
                  <li key={d.id} className="py-2 border-b">Request #{d.request_id} — {d.request?.hospital?.name} — {new Date(d.appointment_date).toLocaleString()}</li>
                ))}
              </ul>
            )}
          </DashboardCard>

          <DashboardCard title="Recent Donations">
            {loading ? (
              <p>Loading donations...</p>
            ) : completed.length === 0 ? (
              <p>No completed donations yet.</p>
            ) : (
              <ul>
                {completed.slice(0, 5).map((d) => (
                  <li key={d.id} className="py-2 border-b">Request #{d.request_id} — {d.status} — {new Date(d.donation_date).toLocaleDateString()}</li>
                ))}
              </ul>
            )}
            <div className="mt-4">
              <Link to="/donations/history"><Button className="text-white py-2 px-3" variant="secondary">View full history</Button></Link>
            </div>
          </DashboardCard>

          {/* Quick Actions */}
          <DashboardCard title="Quick Actions">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/requests"><Button variant="secondary" className="w-full text-white px-3 py-2">Browse Requests</Button></Link>
              <Link to="/profile"><Button variant="secondary" className="w-full text-white px-3 py-2">Update Profile</Button></Link>
              <Link to="/donations/history"><Button variant="secondary" className="w-full text-white px-3 py-2">View Donation History</Button></Link>
            </div>
          </DashboardCard>

        </div>
      </main>
      <Footer />
    </div>
  );
}

