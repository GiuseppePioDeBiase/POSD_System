from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.attors.amministratore_di_sistema import AmministratoreDiSistema

amministratore_bp = Blueprint('amministratore_bp', __name__)

@amministratore_bp.route('/api/allutenti', methods=['GET'])
@jwt_required()
def all_utenti():
    return AmministratoreDiSistema.visualizza_utenti(mail=get_jwt_identity())
