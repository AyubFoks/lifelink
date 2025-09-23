import React from "react";
import PropTypes from "prop-types";

function DonationHistoryItem({ donation }) {
    return (
        <div className="donation-history-item">
            <div className="donation-history-item__header">
                <span className="donation-history-item__date">
                    {new Date(donation.date).toLocaleDateString()}
                </span>
                <span className="donation-history-item__status">
                    {donation.status}
                </span>
            </div>
            <div className="donation-history-item__details">
                <div>
                    <strong>Recipient:</strong> {donation.recipientName}
                </div>
                <div>
                    <strong>Blood Type:</strong> {donation.bloodType}
                </div>
                <div>
                    <strong>Location:</strong> {donation.location}
                </div>
            </div>
        </div>
    );
}

DonationHistoryItem.propTypes = {
    donation: PropTypes.shape({
        date: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        recipientName: PropTypes.string.isRequired,
        bloodType: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
    }).isRequired,
};

export default DonationHistoryItem;