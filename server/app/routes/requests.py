from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.blood_request import BloodRequest
from ..models.hospital import Hospital
from .. import db

requests_bp = Blueprint('requests_bp', __name__)

#@jwt_required() protects this route, ensuring only authenticated users can access it.
@requests_bp.route('/', methods=['POST'])
@jwt_required()
def create_request():
    """
    Creates a new blood request.
    includes an authorization check to ensure only users with the 'hospital_admin' role can create requests.
    """
    #Get the identity from the JWT.
    current_user_id = get_jwt_identity()
    
    #find the user in the database.
    user = User.query.get(current_user_id)
    
    #denies access if the user is not a hospital administrator
    if not user or user.role != 'hospital_admin':
        
        return jsonify({'message': 'Access forbidden: Only hospital administrators can create requests.'}), 403
    
    data = request.get_json()
    current_user_id = get_jwt_identity()
    if not all(key in data for key in ['patient_name', 'blood_type_needed', 'quantity', 'hospital_id']):
        return jsonify({'message': 'Missing required fields'}), 400

    new_request = BloodRequest(
        patient_name=data['patient_name'],
        blood_type_needed=data['blood_type_needed'],
        quantity=data['quantity'],
        urgency_level=data.get('urgency_level', 'Normal'),
        hospital_id=data['hospital_id']
    )
    db.session.add(new_request)
    db.session.commit()
    return jsonify({'message': 'Blood request created successfully', 'request_id': new_request.id}), 201


@requests_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_requests():
    """Gets all blood requests, serialized using the model's to_dict method."""
    #Query the database for all requests.
    requests = BloodRequest.query.order_by(BloodRequest.created_at.desc()).all()
    
    return jsonify([req.to_dict() for req in requests]), 200

#gets a single blood request by its ID
@requests_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_request(id):
    """Gets a single blood request, serialized using the model's to_dict method."""
    #finds the request or return a 404 error.
    req = BloodRequest.query.get_or_404(id)
    
    return jsonify(req.to_dict()), 200

#updates a blood request
@requests_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_request(id):
    req = BloodRequest.query.get_or_404(id)
    data = request.get_json()
    req.status = data.get('status', req.status)
    req.quantity = data.get('quantity', req.quantity)
    db.session.commit()
    return jsonify({'message': 'Blood request updated successfully'}), 200

@requests_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_request(id):
    req = BloodRequest.query.get_or_404(id)
    db.session.delete(req)
    db.session.commit()
    return jsonify({'message': 'Blood request deleted successfully'}), 200