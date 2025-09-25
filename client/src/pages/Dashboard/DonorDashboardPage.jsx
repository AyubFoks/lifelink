import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DonorDashboardPage() {
  const { user } = useAuth();                       // ← name, bloodGroup from login/register
  const [requests, setRequests]   = useState(initialRequests);
  const [totalDonations, setTotal] = useState(() => Number(localStorage.getItem('lifelink-total')) || 0);
  const [livesSaved, setLives]     = useState(() => Number(localStorage.getItem('lifelink-lives')) || 0);
  const [nextAppt, setNextAppt]    = useState(() => localStorage.getItem('lifelink-nextAppt') || null);

  /* -------- persist stats -------- */
  useEffect(() => {
    localStorage.setItem('lifelink-total', totalDonations);
    localStorage.setItem('lifelink-lives', livesSaved);
    if (nextAppt) localStorage.setItem('lifelink-nextAppt', nextAppt);
  }, [totalDonations, livesSaved, nextAppt]);

  /* -------- accept → book appointment -------- */
  const acceptRequest = (id, hospital) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 7); // 7 days from now
    const formatted = newDate.toLocaleDateString('en-CA'); // YYYY-MM-DD
    setNextAppt(`${formatted} - 10:00 AM at ${hospital}`);
    setRequests(reqs =>
      reqs.map(r => (r.id === id ? { ...r, status: 'Accepted' } : r))
    );
  };

  /* -------- mark fulfilled → update impact -------- */
  const markFulfilled = (id, units) => {
    setRequests(reqs =>
      reqs.map(r => (r.id === id ? { ...r, status: 'Fulfilled' } : r))
    );
    setTotal(prev => prev + units);
    setLives(prev => prev + units * 3); // 1 unit ≈ 3 lives
  };

  /* -------- status badge colours -------- */
  const badge = (s) => {
    switch (s) {
      case 'Fulfilled': return 'bg-green-100 text-green-700';
      case 'Accepted':  return 'bg-blue-100 text-blue-700';
      case 'Pending':   return 'bg-yellow-100 text-yellow-700';
      default:          return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* -------- WELCOME BANNER -------- */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Donor'}!</h1>
        <p className="mt-2 text-lg">Ready to make a difference today?</p>
      </div>

      {/* -------- STATS CARDS -------- */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-500 text-sm">Total Donations</p>
          <p className="text-3xl font-bold text-black">{totalDonations}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-500 text-sm">Lives Saved</p>
          <p className="text-3xl font-bold text-black">{livesSaved}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <p className="text-gray-500 text-sm">Blood Type</p>
          <p className="text-3xl font-bold text-black">{user?.bloodGroup || '—'}</p>
        </div>
      </div>

      {/* -------- NEXT APPOINTMENT -------- */}
      {nextAppt && (
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-black mb-2">Next Appointment</h2>
          <p className="text-gray-700">{nextAppt}</p>
          <Link to="/requests" className="inline-block mt-3 text-red-600 hover:underline">View Details</Link>
        </div>
      )}

      {/* -------- CURRENT REQUESTS -------- */}
      <section className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">Recent Requests</h2>
          <Link to="/requests" className="text-sm text-red-600 hover:underline">See all →</Link>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-2 text-sm font-medium text-gray-600">ID</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Resource</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Units</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Hospital</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Status</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-black">{req.id}</td>
                  <td className="py-3 text-sm text-black">{req.resource}</td>
                  <td className="py-3 text-sm text-black">{req.units}</td>
                  <td className="py-3 text-sm text-black">{req.hospital}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge(req.status)}`}>{req.status}</span>
                  </td>
                  <td className="py-3">
                    {req.status === 'Pending' && (
                      <button
                        onClick={() => acceptRequest(req.id, req.hospital)}
                        className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Accept
                      </button>
                    )}
                    {req.status === 'Accepted' && (
                      <button
                        onClick={() => markFulfilled(req.id, req.units)}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Mark Fulfilled
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* -------- QUICK ACTIONS -------- */}
      <section className="mt-8 flex flex-wrap gap-4">
        <Link to="/requests" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition">Browse Requests</Link>
        <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition">Update Profile</button>
        <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition">Donation History</button>
      </section>
    </div>
  );
}