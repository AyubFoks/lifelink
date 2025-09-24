# server/app/models/hospital.py

from app import db
from sqlalchemy_serializer import SerializerMixin

class Hospital(db.Model, SerializerMixin):
    """Hospital model."""

    __tablename__ = 'hospitals'

    # Prevent circular references when serializing
    serialize_rules = (
        '-requests.hospital',  # don’t serialize hospital inside each request
        '-users.hospital'      # don’t serialize hospital inside each user
    )

    # --- Columns ---
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    contact_info = db.Column(db.String(100), nullable=False)
    verified_status = db.Column(db.Boolean, default=False)

    # --- Relationships ---
    # link to BloodRequest model (one hospital -> many blood requests)
    requests = db.relationship(
        'BloodRequest',
        back_populates='hospital',
        lazy=True
    )

    # link to User model (one hospital -> many users/admins)
    users = db.relationship(
        'User',
        back_populates='hospital',
        lazy=True
    )

    def __repr__(self):
        return f"<Hospital {self.name}>"
