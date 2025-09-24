from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, User, Hospital
from functools import wraps

admin_bp = Blueprint('admin_bp', __name__)

#a custom decorator to check for the platform_admin role.
def platform_admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user or user.role != 'platform_admin':
            return jsonify(message="Forbidden: Platform admin access required"), 403
        return fn(*args, **kwargs)
    return wrapper

@admin_bp.route('/hospitals/pending', methods=['GET'])
@platform_admin_required
def get_pending_hospitals():
    """Returns a list of all unverified hospitals for the admin dashboard."""
    pending_hospitals = Hospital.query.filter_by(verified_status=False).all()
    return jsonify([h.to_dict() for h in pending_hospitals]), 200

@admin_bp.route('/hospitals/<int:hospital_id>/verify', methods=['PATCH'])
@platform_admin_required
def verify_hospital(hospital_id):
    """Sets a hospital's verified_status to True."""
    hospital = Hospital.query.get_or_404(hospital_id)
    hospital.verified_status = True
    db.session.commit()
    return jsonify(message=f"Hospital '{hospital.name}' has been successfully verified."), 200