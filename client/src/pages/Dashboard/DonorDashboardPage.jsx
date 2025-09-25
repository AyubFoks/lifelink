import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import logo from '../../assets/logos/LifeLink-Logo.svg'
// import Card from '../../components/ui/RequestCard';
import Button from '../../components/ui/Button';
// import Input from '../../components/ui/Input';
// import './DonorDashboardPage.css';

export default function DonorDashboardPage() {
  const { user } = useAuth();   // ✅ use user, not donor
  // const { donor, setNextAppointment, recordDonation } = useAuth();
  // const [form, setForm] = useState({ date: '', time: '', location: '' });
  // const [message, setMessage] = useState('');


  //purity, this was just to test if i connected everything correctly, now we need te backend
  //use user and not donor from authcontext

  if (!user) {
    return (
      <div className="dashboard-center">
        <img src={logo} alt="LifeLink Logo" className="logo" />
        <p>No donor profile found.</p>
        <Link to="/register/donor">
          <Button variant="primary">Register now</Button>
        </Link>
      </div>
    );
  }

  if (user.role !== "donor") {
    return <p>Unauthorized: Not a donor account</p>;
  }

  return (
    <h1>{user.name} Dashboard</h1>
  );

  


  // const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  // const handleSchedule = (e) => {
  //   e.preventDefault();
  //   if (!form.date || !form.time) {
  //     setMessage('Please select date and time.');
  //     return;
  //   }
  //   const scheduledAt = new Date(`${form.date}T${form.time}`);
  //   if (scheduledAt <= new Date()) {
  //     setMessage('Choose a future date/time.');
  //     return;
  //   }
  //   const appt = {
  //     date: form.date,
  //     time: form.time,
  //     location: form.location || 'Your chosen clinic',
  //     scheduledAt: scheduledAt.toISOString(),
  //   };
  //   setNextAppointment(appt);
  //   setMessage('Appointment scheduled!');
  //   setForm({ date: '', time: '', location: '' });
  // };

  // const handleCompleteDonation = () => {
  //   recordDonation({ count: 1 });
  //   setMessage('Donation recorded. Thank you!');
  // };

  // return (
  //   // <div className="dashboard">
  //   //   <div className="logo-container">
  //   //     <img src={LifelinkLogo} alt="LifeLink Logo" className="logo" />
  //   //   </div>

  //   //   <div className="banner">
  //   //     <h1>Welcome, {donor.name}!</h1>
  //   //     <p>Ready to make a difference today?</p>
  //   //   </div>

  //   //   <div className="stats-grid">
  //   //     <Card><p>Total Donations</p><h3>{donor.totalDonations}</h3></Card>
  //   //     <Card><p>Lives Saved</p><h3>{donor.livesSaved}</h3></Card>
  //   //     <Card><p>Blood Type</p><h3>{donor.bloodType}</h3></Card>
  //   //   </div>

  //   //   <Card>
  //   //     <h2>Next Appointment</h2>
  //   //     {donor.nextAppointment ? (
  //   //       <div className="appointment-display">
  //   //         <div>
  //   //           <p>{new Date(donor.nextAppointment.scheduledAt).toLocaleString()}</p>
  //   //           <p>{donor.nextAppointment.location}</p>
  //   //         </div>
  //   //         <div>
  //   //           <Button variant="primary" onClick={handleCompleteDonation}>Mark Donation Complete</Button>
  //   //           <Button variant="secondary" onClick={() => setNextAppointment(null)}>Cancel</Button>
  //   //         </div>
  //   //       </div>
  //   //     ) : (
  //   //       <form onSubmit={handleSchedule} className="appointment-form">
  //   //         <Input type="date" name="date" value={form.date} onChange={handleChange} />
  //   //         <Input type="time" name="time" value={form.time} onChange={handleChange} />
  //   //         <Input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
  //   //         <Button type="submit" variant="primary">Schedule Appointment</Button>
  //   //         <Link to="/requests">
  //   //           <Button variant="secondary">Browse Requests</Button>
  //   //         </Link>
  //   //       </form>
  //   //     )}
  //   //     {message && <p className="status-message">{message}</p>}
  //   //   </Card>

  //   //   <Card>
  //   //     <h2>Quick Actions</h2>
  //   //     <div className="actions">
  //   //       <Link to="/requests"><Button variant="secondary">Browse Requests</Button></Link>
  //   //       <Button variant="secondary">Update Profile</Button>
  //   //       <Button variant="secondary">Donation History</Button>
  //   //     </div>
  //   //   </Card>
  //   // </div>
  //   <h1>{donor.name} dashboard</h1>
  // );
}
