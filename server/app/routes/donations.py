from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.donation import Donation
from ..models.user import User
from .. import db

donations_bp = Blueprint('donations_bp', __name__)

#creates a donation
@donations_bp.route('/', methods=['POST'])
@jwt_required()
def create_donation():
    donor_id = get_jwt_identity()
    data = request.get_json()
    request_id = data.get('request_id')

    if not request_id:
        return jsonify({'message': 'Request ID is required'}), 400

    new_donation = Donation(donor_id=donor_id, request_id=request_id)
    db.session.add(new_donation)
    db.session.commit()
    return jsonify({'message': 'Donation scheduled successfully', 'donation_id': new_donation.id}), 201

#gets donation history for the current user
@donations_bp.route('/history', methods=['GET'])
@jwt_required()
def get_donation_history():
    """Gets the donation history for the current user, serialized with to_dict."""
    
    donor_id = get_jwt_identity()
    user = User.query.get_or_404(donor_id)
    
    history = [donation.to_dict() for donation in user.donations]
        
    return jsonify(history), 200