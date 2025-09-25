import React, { useState } from "react";
import PropTypes from "prop-types";
import ScheduleDonation from "./ScheduleDonation";
import "../styles/components.css";
import "../../assets/images/general-hospital.png";

const RequestCard = ({ request, hospital, onClick }) => {
    const [isScheduling, setIsScheduling] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);

    const handleAccept = () => {
        setIsScheduling(true);
    };

    const handleScheduleSuccess = () => {
        setIsScheduled(true);
        setIsScheduling(false);
    };

    if (isScheduling) {
        return <ScheduleDonation request={request} hospital={hospital} onScheduleSuccess={handleScheduleSuccess} />;
    }

    return (
        <div
            className={`request-card ${request.urgency.toLowerCase()}`}
            onClick={onClick}
        >
            <div className="request-card-header">
                <img
                    src="/client/src/assets/images/general-hospital.png"
                    alt="Hospital Icon"
                    className="hospital-icon"
                />
                <div className={`status status-${request.urgency.toLowerCase()}`}>
                    {request.urgency}
                </div>
                <div className="donation-type">{request.donation_type} | Type: {request.blood_type}</div>
                <div className="hospital-name">at {hospital.name}</div>
            </div>
            <div className="request-card-body">
                <div>
                    <strong>Donation Type:</strong> {request.donation_type}
                </div>
                <div>
                    <strong>Blood Type(s):</strong> {request.blood_type}
                </div>
                <div>
                    <strong>Location:</strong> {hospital.address}
                </div>
                <div>
                    <strong>Needed Before:</strong> {request.date_needed}
                </div>
            </div>
            <div className="request-card-footer">
                {isScheduled ? (
                    <span className="scheduled-notice">Scheduled!</span>
                ) : (
                    <>
                        <button className="btn btn-primary" onClick={handleAccept}>
                            Accept
                        </button>
                        <button className="btn btn-share">Share</button>
                    </>
                )}
            </div>
        </div>
    );
};

RequestCard.propTypes = {
    request: PropTypes.object.isRequired,
    hospital: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default RequestCard;