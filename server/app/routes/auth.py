from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from ..models.user import User
from .. import db

#creates a blueprint to structure a Flask application into components.
auth_bp = Blueprint('auth_bp', __name__)

#donor registration
@auth_bp.route('/register', methods=['POST'])
def register():
    # Get the JSON data sent from the client.
    data = request.get_json()
    
    #extract user details from the JSON data.
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('fullName')
    blood_type = data.get('bloodType')
    location = data.get('location')

    #basic validation to ensure all required fields are present.
    if not all([email, password, full_name, blood_type, location]):
        return jsonify({'message': 'Missing required fields'}), 400

    #Check if a user with the given email already exists in the database.
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User with this email already exists'}), 409

    #if new user
    new_user = User(
        email=email,
        full_name=full_name,
        blood_type=blood_type,
        location=location
    )
    
    new_user.password = password
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()

    
    if user and user.verify_password(password):
        #if credentials are valid, create a JWT access token for the user.
        #The identity of the token is set to the user's ID.
        access_token = create_access_token(identity=user.id)
        
        return jsonify(access_token=access_token), 200
    
    return jsonify({'message': 'Invalid email or password'}), 401


@auth_bp.route('/register-hospital', methods=['POST'])
def register_hospital():
    """
    Handles registration for a new hospital and its administrator account.
    This is the ONLY way a user with the 'hospital_admin' role should be created.
    """
    data = request.get_json()
    
    admin_email = data.get('email')
    admin_password = data.get('password')
    admin_full_name = data.get('fullName')
    hospital_name = data.get('hospitalName')
    hospital_address = data.get('hospitalAddress')
    hospital_contact = data.get('hospitalContact')
    
    #validates that all required fields are present.
    if not all([admin_email, admin_password, admin_full_name, hospital_name, hospital_address, hospital_contact]):
        return jsonify({'message': 'Missing required fields for hospital registration'}), 400
        
    if User.query.filter_by(email=admin_email).first():
        return jsonify({'message': 'An account with this email already exists'}), 409
    if Hospital.query.filter_by(name=hospital_name).first():
        return jsonify({'message': 'A hospital with this name is already registered'}), 409
        
    new_hospital = Hospital(
        name=hospital_name,
        address=hospital_address,
        contact_info=hospital_contact,
        verified_status=False 
    )
    db.session.add(new_hospital)
    
    #creates the new User record for the administrator.
    new_admin = User(
        email=admin_email,
        full_name=admin_full_name,
        role='hospital_admin',
        blood_type='N/A',
        location=hospital_address
    )
    new_admin.password = admin_password
    db.session.add(new_admin)
    
    db.session.commit()
    
    return jsonify({'message': 'Hospital and admin account registered successfully. Awaiting verification.'}), 201