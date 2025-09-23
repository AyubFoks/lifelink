from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from ..models.hospital import Hospital

hospitals_bp = Blueprint('hospitals_bp', __name__)

#gets a list of all hospitals.
@hospitals_bp.route('/', methods=['GET'])
@jwt_required()
def get_hospitals():
    """Gets a list of all hospitals, serialized with to_dict."""

    hospitals = Hospital.query.all()
    return jsonify([h.to_dict() for h in hospitals]), 200

#gets details for a single hospital by its ID.
@hospitals_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_hospital(id):
    """Gets a single hospital's details, serialized with to_dict."""
    hospital = Hospital.query.get_or_404(id)
    return jsonify(hospital.to_dict()), 200