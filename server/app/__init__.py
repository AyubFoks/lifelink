import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class=Config):
    """Creates and configures an instance of the Flask application."""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    app.url_map.strict_slashes = False

   
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    
    frontend_url = os.environ.get('FRONTEND_URL')
    allowed_origins = ["http://localhost:5173"]
    if frontend_url:
        allowed_origins.append(frontend_url)
    
    CORS(app,
         resources={r"/api/*": {"origins": allowed_origins}},
         supports_credentials=True,
         expose_headers=["Authorization"],
         allow_headers=["Content-Type", "Authorization"])

    
    @app.route("/")
    def home():
        return "Welcome to LifeLink API!"

  
    from .routes.auth import auth_bp
    from .routes.requests import requests_bp
    from .routes.donations import donations_bp
    from .routes.hospitals import hospitals_bp
    from .routes.admin import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(requests_bp, url_prefix='/api/requests')
    app.register_blueprint(donations_bp, url_prefix='/api/donations')
    app.register_blueprint(hospitals_bp, url_prefix='/api/hospitals')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    return app
