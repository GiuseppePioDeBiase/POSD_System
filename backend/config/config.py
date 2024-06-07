from flask import Flask
import secrets
from datetime import timedelta
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_wtf import CSRFProtect

def create_app():
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = secrets.token_urlsafe(256) #Genero una chiave segreta casuale sicura da 256 bit
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1) # Durata vita token
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=1) # Il token cambia ogni giorno
    CORS(app)
    JWTManager(app)
    CSRFProtect(app)
    return app
