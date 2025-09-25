import React, { useState } from 'react';

const ScheduleDonation = ({ request, hospital }) => {
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleSchedule = () => {
    // For now, just log the appointment details
    console.log('Scheduling donation for:', {
      requestId: request.id,
      hospitalId: hospital.id,
      appointmentDate,
    });
    // Here you would typically make an API call to save the appointment
  };

  if (!request || !hospital) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-donation-card">
      <h2>Schedule Donation</h2>
      <div className="hospital-details">
        <h3>{hospital.name}</h3>
        <p>{hospital.address}</p>
      </div>
      <div className="request-details">
        <p>Blood Type: {request.blood_type}</p>
        <p>Urgency: {request.urgency}</p>
      </div>
      <div className="schedule-form">
        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <button onClick={handleSchedule}>Schedule Appointment</button>
      </div>
    </div>
  );
};

export default ScheduleDonation;
