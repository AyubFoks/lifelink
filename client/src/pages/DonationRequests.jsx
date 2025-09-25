import React from 'react';

export default function DonationRequests({ data, onStatusChange }) {
  const { id, patientBloodGroup, facility, location, units, urgent, status } = data;

  return (
    <tr>
      {/* Request ID */}
      <td>{id}</td>

      {/* Blood Group */}
      <td>{patientBloodGroup}</td>

      {/* Facility / Hospital */}
      <td>{facility}</td>

      {/* Location */}
      <td>{location}</td>

      {/* Units Needed */}
      <td>{units}</td>

      {/* Urgency */}
      <td>{urgent ? 'URGENT' : 'Normal'}</td>

      {/* Status Dropdown */}
      <td>
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
        >
          <option>Pending</option>
          <option>Ongoing</option>
          <option>Fulfilled</option>
        </select>
      </td>

      {/* Action Button */}
      <td>
        <button onClick={() => onStatusChange(id, 'Fulfilled')}>
          Mark Fulfilled
        </button>
      </td>
    </tr>
  );
}
