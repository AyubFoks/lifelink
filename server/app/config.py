import os
from dotenv import load_dotenv


load_dotenv()

class Config:
    """
    Application configuration settings.
    This class reads environment variables and sets them as Flask configuration attributes.
    """
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JSONIFY_PRETTYPRINT_REGULAR = False