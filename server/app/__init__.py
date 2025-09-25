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
    # Prevent Flask from redirecting requests that differ only by a trailing slash.
    # This avoids returning 3xx redirects for preflight OPTIONS requests which
    # the browser will block during CORS checks.
    app.url_map.strict_slashes = False

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Configure CORS to allow the frontend dev server and expose the Authorization header
    # This enables preflight (OPTIONS) requests to succeed and allows the browser to send
    # the Authorization header with requests.
    CORS(app,
         resources={r"/api/*": {"origins": ["http://localhost:5173"]}},
         supports_credentials=True,
         expose_headers=["Authorization"],
         allow_headers=["Content-Type", "Authorization"])

    # Ensure we never send redirects for API endpoints (helps preflight checks)
    # Note: Flask-CORS is configured above and will add the appropriate
    # Access-Control-* headers. Avoid setting these headers manually here
    # because it can create duplicate header values (which browsers reject).
    # If additional per-response handling is required later, use
    # response.headers[...] = value to replace values rather than .add().

    CORS(app)


    # Example root route
    @app.route("/")
    def home():
        return "Welcome to LifeLink API!"

    # Register blueprints
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
