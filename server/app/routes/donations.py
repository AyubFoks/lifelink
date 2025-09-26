from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models.donation import Donation
from ..models.user import User
from ..models.blood_request import BloodRequest
from .. import db

donations_bp = Blueprint('donations_bp', __name__)


@donations_bp.route('/', methods=['POST'])
@jwt_required()
def create_donation():
    donor_id = get_jwt_identity()
    user = User.query.get(donor_id)
    if user.role != 'donor':
        return jsonify({'message': 'Only donors can accept requests.'}), 403
    data = request.get_json()
    if not data or not data.get('request_id'):
        return jsonify({'message': 'Request ID is required'}), 400
    
    req = BloodRequest.query.get(data['request_id'])
    if not req:
        return jsonify({'message': 'Blood request not found'}), 404
    if req.status != 'Pending':
        return jsonify({'message': 'This request is no longer available'}), 400

    
    new_donation = Donation(donor_id=donor_id, request_id=req.id, status='Pending')
    req.status = 'Reserved'
    db.session.add(new_donation)
    db.session.add(req)
    db.session.commit()
    return jsonify({'message': 'Donation scheduled successfully', 'donation': new_donation.to_dict(), 'request': req.to_dict()}), 201


@donations_bp.route('/<int:donation_id>', methods=['PATCH'])
@jwt_required()
def update_donation(donation_id):
    """Used by donor to schedule an appointment for an accepted donation.
    Expects JSON: { appointment_date: <iso-string> }
    Changes donation.status -> 'Scheduled' and sets appointment_date.
    """
    user_id = get_jwt_identity()
    donation = Donation.query.get_or_404(donation_id)
    if donation.donor_id != user_id:
        return jsonify({'message': 'Access forbidden: Not your donation'}), 403
    data = request.get_json() or {}
    appt = data.get('appointment_date')
    if not appt:
        return jsonify({'message': 'appointment_date is required'}), 400
    try:
        from dateutil import parser
        dt = parser.isoparse(appt)
    except Exception:
        return jsonify({'message': 'Invalid appointment_date format; use ISO format'}), 400
    donation.appointment_date = dt
    donation.status = 'Scheduled'
    
    donation.request.status = 'Scheduled'
    db.session.add(donation)
    db.session.add(donation.request)
    db.session.commit()
    return jsonify({'message': 'Appointment scheduled', 'donation': donation.to_dict()}), 200


@donations_bp.route('/<int:donation_id>/complete', methods=['POST'])
@jwt_required()
def complete_donation(donation_id):
    """Mark donation as Completed (donor attended). Only donor can mark their donation complete."""
    user_id = get_jwt_identity()
    donation = Donation.query.get_or_404(donation_id)
    if donation.donor_id != user_id:
        return jsonify({'message': 'Access forbidden: Not your donation'}), 403
    donation.status = 'Completed'
    donation.request.status = 'Fulfilled'
    db.session.add(donation)
    db.session.add(donation.request)
    db.session.commit()
    return jsonify({'message': 'Donation marked completed', 'donation': donation.to_dict()}), 200

@donations_bp.route('/history', methods=['GET'])
@jwt_required()
def get_donation_history():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    return jsonify([d.to_dict() for d in user.donations]), 200


@donations_bp.route('/<int:donation_id>/fulfill', methods=['POST'])
@jwt_required()
def fulfill_donation(donation_id):
    """Allow a hospital admin to mark a scheduled donation as fulfilled.
    The hospital admin must belong to the hospital owning the request.
    """
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    donation = Donation.query.get_or_404(donation_id)
    
    if user.role != 'hospital_admin':
        return jsonify({'message': 'Access forbidden: Only hospital admins can fulfill donations.'}), 403
    hospital_id = user.hospital_id or (user.hospital.id if user.hospital else None)
    if not hospital_id or donation.request.hospital_id != hospital_id:
        return jsonify({'message': 'Access forbidden: Donation does not belong to your hospital.'}), 403
    
    donation.status = 'Completed'
    donation.request.status = 'Fulfilled'
    db.session.add(donation)
    db.session.add(donation.request)
    db.session.commit()
    return jsonify({'message': 'Donation fulfilled', 'donation': donation.to_dict()}), 200


@donations_bp.route('/hospital', methods=['GET'])
@jwt_required()
def get_hospital_donations():
    """Return donations for the authenticated hospital admin's hospital.
    Optional query param: status (e.g., 'Scheduled') to filter.
    """
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    if user.role != 'hospital_admin':
        return jsonify({'message': 'Access forbidden: Only hospital admins can access this endpoint.'}), 403
    hospital_id = user.hospital_id or (user.hospital.id if user.hospital else None)
    if not hospital_id:
        return jsonify({'message': 'Your account is not associated with a hospital.'}), 400
    status_filter = request.args.get('status')
    query = Donation.query.join(Donation.request).filter(BloodRequest.hospital_id == hospital_id)
    if status_filter:
        query = query.filter(Donation.status == status_filter)
    donations = query.order_by(Donation.appointment_date.asc().nulls_last()).all()
    return jsonify([d.to_dict() for d in donations]), 200