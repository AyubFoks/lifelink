from app import db
from sqlalchemy_serializer import SerializerMixin

class Hospital(db.Model, SerializerMixin):
    """Hospital model."""

    __tablename__ = 'hospitals'

    serialize_rules = (
        '-requests.hospital', 
        '-users.hospital'      
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    contact_info = db.Column(db.String(100), nullable=False)
    verified_status = db.Column(db.Boolean, default=False)

    requests = db.relationship(
        'BloodRequest',
        back_populates='hospital',
        lazy=True
    )

    users = db.relationship(
        'User',
        back_populates='hospital',
        lazy=True
    )

    def __repr__(self):
        return f"<Hospital {self.name}>"
