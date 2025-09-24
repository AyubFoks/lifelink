from app import db, bcrypt
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    """
    User model for donors, hospital admins, and platform admins.
    """

    __tablename__ = 'users'
    
    serialize_rules = ('-password_hash', '-donations', '-hospital.users')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    
    blood_type = db.Column(db.String(10), nullable=True)
    location = db.Column(db.String(100), nullable=True)
    
    availability = db.Column(db.Boolean, default=True)
   
    role = db.Column(db.String(50), nullable=False, default='donor')

   
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=True)

   
    hospital = db.relationship('Hospital', back_populates='users')
    donations = db.relationship('Donation', back_populates='donor')


    @property
    def password(self):
        """Prevent password from being read directly."""
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        """Hash and set the password."""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        """Verify a given password against the stored hash."""
        return bcrypt.check_password_hash(self.password_hash, password)


    def __repr__(self):
        """Provide a developer-friendly representation of the User object."""
        return f"<User {self.full_name} ({self.role})>"

        