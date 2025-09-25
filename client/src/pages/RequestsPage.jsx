import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import RequestCard from '../components/cards/RequestCard.jsx';
import authService from '../services/authService.js';
import Navbar from '../components/common/Navbar/Navbar.jsx';
import Footer from '../components/common/Footer/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function RequestsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // only fetch Pending requests (available for donors)
        const res = await authService.get('/requests?status=Pending');
        if (res?.error) {
          console.error('Failed to load requests:', res.error);
          setError(res.error.message || 'Failed to load requests');
        } else if (res?.data) {
          setRequests(res.data);
        } else {
          console.debug('Requests API returned no data', res);
          setError('No data returned from server');
        }
      } catch (err) {
        console.error('Requests fetch error', err);
        setError(err?.message || 'Unexpected error');
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleAccept = async (requestId) => {
    // create a donation for this request
    const res = await authService.post('/donations', { request_id: requestId });
    if (res?.data) {
      // Remove the accepted request from the current list so it disappears for this donor immediately
      setRequests((prev) => prev.filter(r => r.id !== requestId));
      // navigate to donor dashboard to see scheduled donation
      navigate('/dashboard/donor');
    } else {
      alert(res?.error?.message || 'Failed to accept request');
    }
  };

  const handleDecline = (id) => {
    // currently no API for declining on client side; simply remove from view
    setRequests((prev) => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start" style={{ marginTop: '4.5rem' }}>
          <Button
            variant="secondary"
            className="mb-6 ml-2 text-white py-2 px-3"
            onClick={() => navigate('/dashboard/donor')}
          >
            &larr; Back to Dashboard
          </Button>
        </div>
      </div>
      <main className="flex-1 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-3">
            <h1 className="text-3xl font-bold text-black">Donation Requests</h1>
            <div className="inline-flex items-center gap-2">
              <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">{requests.filter(r => r.status === 'Pending').length} active</span>
              <span className="text-sm text-gray-500">available requests</span>
            </div>
          </header>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-100 rounded">{error}</div>
          )}

          <div>
            {loading ? (
              <p>Loading requests...</p>
            ) : requests.length === 0 ? (
              <p>No requests available.</p>
            ) : (
              // Responsive grid: 1 column mobile, 2 sm, 3 md, 4 lg
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {requests.map((req) => (
                  <div key={req.id} className="flex">
                    <div className="w-full flex flex-col">
                      <RequestCard
                        hospitalName={req.hospital?.name || 'Unknown Hospital'}
                        bloodTypes={[req.blood_type_needed]}
                        donationType="Whole Blood"
                        location={req.hospital?.address || ''}
                        status={req.status}
                        urgency={req.urgency_level || req.urgency || req.urgencyLevel || req.status}
                        dateNeeded={new Date(req.created_at).toLocaleDateString()}
                        onAccept={() => handleAccept(req.id)}
                        onDecline={() => handleDecline(req.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}