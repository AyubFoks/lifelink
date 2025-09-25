import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar/Navbar.jsx';
import Footer from '../components/common/Footer/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import authService from '../services/authService';
import DonationHistoryItem from '../components/cards/DonationHistoryItem.jsx';
import Button from '../components/ui/Button.jsx';
import { useNavigate } from 'react-router-dom';

export default function DonationsHistory() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await authService.get('/donations/history');
      if (res?.data) setDonations(res.data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Button variant="secondary" className="mb-4 text-white px-3 py-2" onClick={() => navigate('/dashboard/donor')}>&larr; Back to Dashboard</Button>
          <h1 className="text-2xl font-bold mb-6">Donation History</h1>
          {loading ? (
            <p>Loading...</p>
          ) : donations.length === 0 ? (
            <p>No donation history yet.</p>
          ) : (
            donations.map((d) => (
              <div key={d.id} className="mb-4">
                <DonationHistoryItem donation={{
                  date: d.donation_date,
                  status: d.status,
                  recipientName: d.request?.patient_name || `Request ${d.request_id}`,
                  bloodType: d.request?.blood_type_needed || '-',
                  location: d.request?.hospital?.name || '-',
                }} />
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
