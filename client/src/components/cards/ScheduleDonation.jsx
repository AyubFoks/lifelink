import React, { useState } from 'react';

const ScheduleDonation = ({ request, hospital, onScheduleSuccess }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const generateTimeOptions = () => {
    const hours = [];
    for (let i = 8; i <= 20; i++) { // 8 AM to 8 PM
      const hour = i < 10 ? `0${i}` : `${i}`;
      hours.push(`${hour}:00`);
    }
    return hours;
  };

  const handleSchedule = () => {
    // For now, just log the appointment details
    console.log('Scheduling donation for:', {
      requestId: request.id,
      hospitalId: hospital.id,
      appointmentDate,
      appointmentTime,
    });
    // Here you would typically make an API call to save the appointment
    // On success:
    if (onScheduleSuccess) {
      onScheduleSuccess();
    }
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
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="schedule-input"
        />
        <select
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          className="schedule-input"
        >
          <option value="">Select Time</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <button onClick={handleSchedule}>Schedule Appointment</button>
      </div>
    </div>
  );
};

export default ScheduleDonation;
