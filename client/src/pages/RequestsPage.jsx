import React, { useState } from 'react';
import { useDonor } from '../../context/DonorContext';
import LifelinkLogo from '../../assets/logos/lifelink-full-logo.svg';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import './RequestBoard.css';

const sampleRequests = [
  { id: 'r1', patient: 'Alice Smith', bloodTypeNeeded: 'O-', urgency: 'High', hospital: 'City Hospital', notes: 'Trauma unit needs O- urgently.' },
  { id: 'r2', patient: 'Mark Johnson', bloodTypeNeeded: 'A+', urgency: 'Medium', hospital: 'Northside Clinic', notes: 'Planned surgery next week.' },
];

export default function RequestBoard() {
  const { donor, setNextAppointment } = useDonor();
  const [requests, setRequests] = useState(sampleRequests);
  const [scheduling, setScheduling] = useState(null);

  const startScheduling = (id) => {
    if (!donor) return alert('Please register or login.');
    setScheduling({ requestId: id, date: '', time: '' });
  };

  const handleChange = (e) =>
    setScheduling((s) => ({ ...s, [e.target.name]: e.target.value }));

  const confirmSchedule = () => {
    const { requestId, date, time } = scheduling;
    if (!date || !time) return alert('Pick date and time.');
    const scheduledAt = new Date(`${date}T${time}`);
    if (scheduledAt <= new Date()) return alert('Select a future date.');
    const req = requests.find((r) => r.id === requestId);
    setNextAppointment({ date, time, location: req.hospital, scheduledAt: scheduledAt.toISOString() });
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    setScheduling(null);
    alert('Appointment scheduled — check your dashboard.');
  };

  return (
    <div className="container" style={{ display: 'grid', gap: '1rem' }}>
      <h2>Active Requests</h2>
      {items.map((r) => (
        <Card key={r.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{r.patient_name}</strong>
              <div>{r.location || 'Unknown location'}</div>
            </div>
            <div>
              <div><strong>{r.blood_type}</strong></div>
              <div style={{ textTransform: 'capitalize' }}>{r.urgency}</div>
            </div>
          </div>
        </Card>
      ))}
      {!items.length && <p>No requests yet.</p>}
    </div>
  )
}
