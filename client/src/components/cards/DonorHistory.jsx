import React from 'react';
import PropTypes from 'prop-types';

const DonorHistory = ({ donations }) => {
  return (
    <div className="donor-history">
      <h2>Your Donation History</h2>
      <ul>
        {donations.map((donation, index) => (
          <li key={index}>
            <span>{new Date(donation.date).toLocaleDateString()}</span>
            <span>{donation.hospital}</span>
            <span>{donation.donationType}</span>
          </li>
        ))}
      </ul>
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
