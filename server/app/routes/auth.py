from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from ..models.user import User
from ..models.hospital import Hospital
from .. import db

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not all(k in data for k in ['email', 'password', 'fullName', 'bloodType', 'location']):
        return jsonify({'message': 'Missing required fields'}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User with this email already exists'}), 409
    new_user = User(
        email=data['email'],
        full_name=data['fullName'],
        blood_type=data['bloodType'],
        location=data['location']
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Donor registered successfully'}), 201

@auth_bp.route('/register-hospital', methods=['POST'])
def register_hospital():
    data = request.get_json()
    if not all(k in data for k in ['email', 'password', 'hospitalName', 'hospitalAddress', 'hospitalContact']):
        return jsonify({'message': 'Missing required fields'}), 400
    if User.query.filter_by(email=data['email']).first() or Hospital.query.filter_by(name=data['hospitalName']).first():
        return jsonify({'message': 'Account or hospital with these details already exists'}), 409
    
    new_hospital = Hospital(
        name=data['hospitalName'],
        address=data['hospitalAddress'],
        contact_info=data['hospitalContact'],
        verified_status=False
    )
    db.session.add(new_hospital)
    db.session.flush()

    new_admin = User(
        email=data['email'],
        full_name=data.get('fullName', 'Hospital Admin'),
        role='hospital_admin',
        hospital_id=new_hospital.id
    )
    new_admin.set_password(data['password'])
    db.session.add(new_admin)
    db.session.commit()
    
    return jsonify({'message': 'Hospital and admin account registered. Awaiting verification.'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('password'):
        return jsonify({'message': 'Missing required fields'}), 400

    password = data.get('password')
    
    login_identifier = data.get('email') or data.get('hospitalName')

    if not login_identifier:
        return jsonify({'message': 'Missing email or hospital name'}), 400

    
    user = User.query.filter_by(email=login_identifier).first()

    
    if not user:
        hospital = Hospital.query.filter_by(name=login_identifier).first()
        if hospital:
           
            user = User.query.filter_by(hospital_id=hospital.id, role='hospital_admin').first()

    if user and user.verify_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify({'message': 'Invalid email or password'}), 401
    
@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify(message="User not found"), 404


@auth_bp.route('/profile', methods=['PATCH'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    data = request.get_json() or {}
   
    allowed = ['full_name', 'blood_type', 'location', 'email']
    changed = False
    if 'email' in data and data['email'] != user.email:
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Email already in use'}), 409
        user.email = data['email']
        changed = True
    if 'full_name' in data and data['full_name'] != user.full_name:
        user.full_name = data['full_name']
        changed = True
    if 'blood_type' in data and data['blood_type'] != user.blood_type:
        user.blood_type = data['blood_type']
        changed = True
    if 'location' in data and data['location'] != user.location:
        user.location = data['location']
        changed = True

    if changed:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'Profile updated', 'user': user.to_dict()}), 200
    return jsonify({'message': 'No changes detected'}), 200