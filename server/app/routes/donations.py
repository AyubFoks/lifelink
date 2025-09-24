from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models.donation import Donation
from ..models.user import User
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
    new_donation = Donation(donor_id=donor_id, request_id=data['request_id'])
    db.session.add(new_donation)
    db.session.commit()
    return jsonify({'message': 'Donation scheduled successfully', 'donation': new_donation.to_dict()}), 201

@donations_bp.route('/history', methods=['GET'])
@jwt_required()
def get_donation_history():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    return jsonify([d.to_dict() for d in user.donations]), 200