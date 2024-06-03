from flask import Blueprint
from backend.models.attors import Utente

utente_bp = Blueprint('utente_bp', __name__)

@utente_bp.route('/api/register', methods=['POST'])
def register_user():
    return Utente.registrati()

@utente_bp.route('/api/login', methods=['POST'])
def login_user():
    return Utente.login()

@utente_bp.route('/api/profilo', methods=['GET'])
def get_user_profile():
    return Utente.getNomeCognomeEmail()

@utente_bp.after_request
def after_request(response):
    return Utente.refresh_expiring_jwts(response)

@utente_bp.route('/api/logout', methods=['POST'])
def logout_user():
    return Utente.logout()
