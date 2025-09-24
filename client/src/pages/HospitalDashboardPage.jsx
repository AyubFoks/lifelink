import React, { useState } from 'react';
import RequestForm from '../components/hospital/RequestForm';
import RequestRow from '../components/hospital/RequestRow';

/* ----------  LOGO IMPORT  ---------- */
import LifelinkLogo from '../assets/logos/lifelink-full-logo.svg';

export default function HospitalDashboardPage() {
  /* ----------  Dummy Seed Data  ---------- */
  const [requests, setRequests] = useState([
    { id: 'REQ-01-001', patientBloodGroup: 'A+', facility: 'National Hospital', location: 'Nairobi', units: 10, status: 'Fulfilled', urgent: false, updatedAt: '2025-08-21' },
    { id: 'REQ-01-002', patientBloodGroup: 'O-', facility: 'National Hospital', location: 'Nairobi', units: 5, status: 'Pending', urgent: true, updatedAt: '2025-09-03' },
  ]);

  /* ----------  Handlers  ---------- */
  const addRequest = (req) => setRequests([req, ...requests]);
  const updateStatus = (id, newStatus) =>
    setRequests(requests.map(r => (r.id === id ? { ...r, status: newStatus } : r)));

  /* ----------  Navigation Items  ---------- */
  const navItems = [
    { label: 'Dashboard', href: '/hospital-dashboard' },
    { label: 'Requests', href: '/hospital/requests' },
    { label: 'Patients', href: '/hospital/patients' },
    { label: 'Settings', href: '/hospital/settings' },
  ];

  return (
    <div>
      {/* ----------  SIDE NAVBAR  ---------- */}
      <aside>
        <img src={LifelinkLogo} alt="LifeLink Logo" />
        <h3>Hospital Admin</h3>
        <ul>
          {navItems.map(item => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </aside>

      {/* ----------  MAIN CONTENT  ---------- */}
      <main>
        <h1>Hospital Dashboard</h1>

        {/* ----------  REQUEST FORM  ---------- */}
        <section>
          <h2>Request Donation</h2>
          <RequestForm onSubmit={addRequest} />
        </section>

        {/* ----------  RECENT REQUESTS  ---------- */}
        <section>
          <h2>Recent Requests</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Blood Group</th>
                <th>Facility</th>
                <th>Location</th>
                <th>Units</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <RequestRow key={r.id} data={r} onStatusChange={updateStatus} />
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
