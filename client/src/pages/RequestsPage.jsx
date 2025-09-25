import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { globalRequests, updateRequestStatus } from "../../utils/requestStore";

export default function RequestsPage() {
  const navigate = useNavigate();

  const handleAccept = (id) => {
    updateRequestStatus(id, 'Accepted');
    navigate('/dashboard'); // ← donor books appointment on dashboard
  };

  const handleDecline = (id) => {
    updateRequestStatus(id, 'Declined');
  };

  const badge = (s) => {
    switch (s) {
      case 'Pending':   return 'bg-yellow-100 text-yellow-700';
      case 'Accepted':  return 'bg-blue-100 text-blue-700';
      case 'Declined':  return 'bg-gray-100 text-gray-700';
      case 'Fulfilled': return 'bg-green-100 text-green-700';
      default:          return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* -------- HEADER -------- */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">Donation Requests</h1>
        <span className="text-sm text-gray-500">{globalRequests.filter(r => r.status === 'Pending').length} active requests</span>
      </header>

      {/* -------- REQUEST CARDS (URGENT first) -------- */}
      <div className="space-y-6">
        {globalRequests
          .sort((a, b) => b.urgent - a.urgent) // urgent on top
          .map((req) => (
            <article
              key={req.id}
              className="bg-white border border-gray-200 rounded-xl p-6 relative hover:shadow-lg transition"
            >
              {req.urgent && (
                <span className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full">URGENT</span>
              )}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* LEFT: info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black mb-1">{req.resource}</h3>
                  <p className="text-sm text-gray-600">{req.hospital}</p>
                  <p className="text-sm text-gray-500">{req.location}</p>
                  <p className="text-sm text-gray-500 mt-2">Units needed: <span className="font-medium text-black">{req.units}</span></p>
                </div>

                {/* RIGHT: status + buttons */}
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge(req.status)}`}>{req.status}</span>

                  {req.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(req.id)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {req.status === 'Accepted' && (
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Book Appointment
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}