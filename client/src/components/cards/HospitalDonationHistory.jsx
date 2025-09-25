import React from 'react';
import PropTypes from 'prop-types';

const HospitalDonationHistory = ({ donations }) => {
  return (
    <div className="hospital-donation-history">
      <h2>Donation History</h2>
      <ul>
        {donations.map((donation, index) => (
          <li key={index}>
            <span>{new Date(donation.date).toLocaleDateString()}</span>
            <span>{donation.donationType}</span>
            <span>{donation.donorName}</span>
            <span>{donation.bloodGroup}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

HospitalDonationHistory.propTypes = {
  donations: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      donationType: PropTypes.string.isRequired,
      donorName: PropTypes.string.isRequired,
      bloodGroup: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HospitalDonationHistory;
