from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models.user import User
from ..models.blood_request import BloodRequest
from .. import db

requests_bp = Blueprint('requests_bp', __name__)


@requests_bp.route('/', methods=['POST'])
@jwt_required()
def create_request():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role != 'hospital_admin':
        return jsonify({'message': 'Access forbidden: Only hospital administrators can create requests.'}), 403
    if not user.hospital or not user.hospital.verified_status:
        return jsonify({'message': 'Your hospital is pending verification and cannot create requests.'}), 403
    data = request.get_json()
    if not all(key in data for key in ['patient_name', 'blood_type_needed', 'quantity']):
        return jsonify({'message': 'Missing required fields'}), 400
    new_request = BloodRequest(
        patient_name=data['patient_name'],
        blood_type_needed=data['blood_type_needed'],
        quantity=data['quantity'],
        urgency_level=data.get('urgency_level', 'Normal'),
        hospital_id=user.hospital_id
    )
    db.session.add(new_request)
    db.session.commit()
    return jsonify({'message': 'Blood request created successfully', 'request': new_request.to_dict()}), 201

@requests_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_requests():
    requests = BloodRequest.query.order_by(BloodRequest.created_at.desc()).all()
    return jsonify([req.to_dict() for req in requests]), 200

@requests_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_request(id):
    req = BloodRequest.query.get_or_404(id)
    return jsonify(req.to_dict()), 200