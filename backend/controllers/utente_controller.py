from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.attors import Utente

utente_bp = Blueprint('utente_bp', __name__)

@utente_bp.route('/api/registrazione', methods=['POST'])
def register_user():
    return Utente.registrati()

@utente_bp.route('/api/login', methods=['POST'])
def login_user():
    return Utente.login()


@utente_bp.route('/api/profilo', methods=['GET'])
@jwt_required()
def get_user_profile():
    return Utente.getNomeCognomeRuolo(email=get_jwt_identity())

@utente_bp.after_request
def after_request(response):
    return Utente.refresh_expiring_jwts(response)

@utente_bp.route('/api/logout', methods=['POST'])
def logout_user():
    return Utente.logout()
