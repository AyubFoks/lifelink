from datetime import datetime
from app import db
from sqlalchemy_serializer import SerializerMixin

class BloodRequest(db.Model, SerializerMixin):
    """
    BloodRequest model – represents a hospital’s request for blood.
    """

    __tablename__ = 'blood_requests'

    # Avoid serializing back-references to prevent infinite loops
    serialize_rules = ('-hospital.requests', '-donations.request')

    # --- Columns ---
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100), nullable=False)
    blood_type_needed = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    urgency_level = db.Column(db.String(50), nullable=False, default='Normal')
    status = db.Column(db.String(50), nullable=False, default='Pending')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Foreign key to the hospital making the request
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=False)

    # --- Relationships ---
    hospital = db.relationship('Hospital', back_populates='requests')
    donations = db.relationship('Donation', back_populates='request', lazy=True)

    def __repr__(self):
        return f"<BloodRequest id={self.id} blood_type={self.blood_type_needed}>"
