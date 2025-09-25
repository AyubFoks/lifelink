import React from 'react';
import PropTypes from 'prop-types';

const DonorHistory = ({ donations }) => {
  return (
    <div className="donor-history">
      <h2>Your Donation History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hospital</th>
            <th>Donation Type</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td>{new Date(donation.date).toLocaleDateString()}</td>
              <td>{donation.hospital}</td>
              <td>{donation.donationType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DonorHistory.propTypes = {
  donations: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      hospital: PropTypes.string.isRequired,
      donationType: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DonorHistory;
