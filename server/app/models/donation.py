from datetime import datetime
from app import db
from sqlalchemy_serializer import SerializerMixin

class Donation(db.Model, SerializerMixin):
    """
    Donation association model – links a donor (User) to a BloodRequest.
    """

    __tablename__ = 'donations'

    serialize_rules = ('-donor.donations', '-request.donations')
   
    id = db.Column(db.Integer, primary_key=True)

    donation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=False, default='Scheduled')

    # Optional appointment date/time set when donor schedules an appointment
    appointment_date = db.Column(db.DateTime, nullable=True)

    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    request_id = db.Column(db.Integer, db.ForeignKey('blood_requests.id'), nullable=False)

    donor = db.relationship('User', back_populates='donations')
    request = db.relationship('BloodRequest', back_populates='donations')

    def __repr__(self):
        return f"<Donation id={self.id} donor_id={self.donor_id} request_id={self.request_id}>"
