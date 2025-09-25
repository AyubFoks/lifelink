import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';
import Button from '../components/ui/Button';
import authService from '../services/authService';

export default function ScheduleAppointment(){
  const { id } = useParams();
  const nav = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true);
      // Fetch donor's donation history and find the donation by id (simple approach)
      const res = await authService.get('/donations/history');
      if(res?.data){
        const found = res.data.find(d => String(d.id) === String(id));
        setDonation(found);
      }
      setLoading(false);
    }
    load();
  },[id]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError(null);
    if(!appointmentDate) return setError('Please choose a date and time');
    const res = await authService.patch(`/donations/${id}`, { appointment_date: appointmentDate });
    if(res?.error){
      setError(res.error.message || 'Failed to schedule');
      return;
    }
    nav('/dashboard/donor');
  }

  if(loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if(!donation) return <div className="min-h-screen flex items-center justify-center">Donation not found</div>

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Schedule Appointment for Request #{donation.request_id}</h2>
          <p className="mb-4">Hospital: {donation.request?.hospital?.name}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              Choose date & time
              <input type="datetime-local" value={appointmentDate} onChange={e=>setAppointmentDate(e.target.value)} className="w-full p-2 border rounded mt-1" />
            </label>
            {error && <div className="text-red-600">{error}</div>}
            <div className="flex gap-2">
              <Button type="submit">Confirm Appointment</Button>
              <Button variant="secondary" onClick={()=>nav('/dashboard/donor')}>Cancel</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
