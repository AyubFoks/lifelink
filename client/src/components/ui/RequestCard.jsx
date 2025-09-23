import React from "react";
import PropTypes from "prop-types";
import "../styles/components.css";

/**
 * RequestCard displays a single blood request's details.
 * @param {Object} props
 * @param {string} props.hospitalName - Name of the hospital making the request
 * @param {string[]} props.bloodTypes - Array of blood types needed
 * @param {string} props.donationType - Type of donation ("Whole Blood", "Plasma", "Platelets", "Double Red Cells")
 * @param {string} props.location - Location of the hospital
 * @param {string} props.status - Current status (e.g., "Urgent", "Open", "Fulfilled")
 * @param {string} props.dateNeeded - Date when blood is needed
 * @param {function} [props.onClick] - Optional click handler
 */
const RequestCard = ({
    hospitalName,
    bloodTypes,
    donationType,
    location,
    status,
    dateNeeded,
    onClick,
}) => (
    <div className={`request-card ${status.toLowerCase()}`} onClick={onClick}>
        <div className="request-card-header">
            <img src="/hospital-icon.png" alt="Hospital Icon" className="hospital-icon" />
            <span className="hospital-name">{hospitalName}</span>
            <span className={`status status-${status.toLowerCase()}`}>{status}</span>
        </div>
        <div className="request-card-body">
            <div>
                <strong>Donation Type:</strong> {donationType}
            </div>
            <div>
                <strong>Blood Type(s):</strong> {bloodTypes.join(", ")}
            </div>
            <div>
                <strong>Location:</strong> {location}
            </div>
            <div>
                <strong>Needed Before:</strong> {dateNeeded}
            </div>
        </div>
        <div className="request-card-footer">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-secondary">Decline</button>
            <button className="btn btn-share">Share</button>
        </div>
    </div>
);

RequestCard.propTypes = {
    hospitalName: PropTypes.string.isRequired,
    bloodTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    donationType: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    dateNeeded: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default RequestCard;