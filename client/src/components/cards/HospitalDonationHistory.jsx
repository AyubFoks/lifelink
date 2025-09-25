import React from 'react';
import PropTypes from 'prop-types';

const HospitalDonationHistory = ({ donations }) => {
  return (
    <div className="hospital-donation-history">
      <h2>Donation History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Donation Type</th>
            <th>Donor Name</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td>{new Date(donation.date).toLocaleDateString()}</td>
              <td>{donation.donationType}</td>
              <td>{donation.donorName}</td>
              <td>{donation.bloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
