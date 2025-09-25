import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import authService from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

export default function HospitalRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await authService.get('/requests?status=all');
      if (res?.data) {
        const hospitalId = user?.hospital_id || user?.hospital?.id;
        setRequests(res.data.filter(r => r.hospital_id === hospitalId));
      }
      setLoading(false);
    };
    if (user && user.role === 'hospital_admin') load();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Hospital Requests</h1>
            <div className="flex gap-2">
              <Link to="/dashboard/hospital"><Button className= "text-white py-2 px-3" variant="secondary">Back to Dashboard</Button></Link>
              <Link to="/request-donation"><Button className= "text-white py-2 px-3">Request Donation</Button></Link>
            </div>
          </header>

          <div className="bg-white p-6 rounded shadow">
            {loading ? (
              <p>Loading requests...</p>
            ) : requests.length === 0 ? (
              <p>No requests found for your hospital.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map(r => (
                    <tr key={r.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.patient_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.blood_type_needed}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.status}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
