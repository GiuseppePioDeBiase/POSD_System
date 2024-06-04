from flask import Flask
import secrets
from datetime import timedelta
from flask_cors import CORS
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    CORS(app)
    JWTManager(app)
    app.config["JWT_SECRET_KEY"] = secrets.token_urlsafe(256) #Genero una chiave segreta casuale sicura da 256 bit
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30) # Durata vita token
    return app
