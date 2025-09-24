from app import db, bcrypt
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    """
    User model for donors and hospital admins.
    """

    __tablename__ = 'users'

    # Exclude password_hash and relationships that would cause circular refs
    serialize_rules = ('-password_hash', '-donations', '-hospital.users')

    # --- Columns ---
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    blood_type = db.Column(db.String(10), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    availability = db.Column(db.Boolean, default=True)
    role = db.Column(db.String(50), nullable=False, default='donor')

    # Foreign key only used if the user is a hospital_admin
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=True)

    # --- Relationships ---
    # hospital_admin -> Hospital
    hospital = db.relationship('Hospital', back_populates='users')
    # donor -> Donation
    donations = db.relationship('Donation', back_populates='donor')

    # --- Password property ---
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.full_name} ({self.email})>"
