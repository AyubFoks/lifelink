import React from "react";
import PropTypes from "prop-types";
import "../styles/components.css";
import hospitalIcon from '../../assets/images/general-hospital.png';

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
    urgency,
    dateNeeded,
    onAccept,
    onDecline,
    onShare,
}) => {
    // Determine the label to show in the top-right: prefer urgency, fall back to status
    const label = (urgency || status || '').toString();
    const labelClass = label.toLowerCase();

    return (
    <div className={`bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full ${labelClass}`}>
        <div>
            <div className="flex items-start gap-3 mb-3">
                <img src={hospitalIcon} alt="Hospital Icon" className="h-10 w-10 object-contain" />
                <div className="flex-1">
                    <div className="font-semibold text-gray-800">{hospitalName}</div>
                    <div className="text-sm text-gray-500">{location}</div>
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded ${"status status-" + labelClass}`}>{label}</div>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
                <div><span className="font-medium">Donation Type:</span> {donationType}</div>
                <div><span className="font-medium">Blood Type(s):</span> {bloodTypes.join(", ")}</div>
                <div><span className="font-medium">Needed Before:</span> {dateNeeded}</div>
            </div>
        </div>

        <div className="mt-4 flex gap-2">
            <button onClick={onAccept} className="flex-1 bg-[#921223] hover:bg-[#921223]/70 text-white py-2 rounded">Accept</button>
            <button onClick={onDecline} className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded">Decline</button>
        </div>
    </div>
    );
};

RequestCard.propTypes = {
    hospitalName: PropTypes.string.isRequired,
    bloodTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    donationType: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.string,
    urgency: PropTypes.string,
    dateNeeded: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default RequestCard;