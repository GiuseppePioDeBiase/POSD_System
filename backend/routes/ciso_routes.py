from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.attors.ciso import Ciso

ciso_bp = Blueprint('ciso_bp', __name__)

@ciso_bp.route('/api/caricalicenza', methods=['POST'])
@jwt_required()
def carica_licenza():
    return Ciso.carica_licenza(mail=get_jwt_identity())

@ciso_bp.route('/api/licenza', methods=['GET'])
@jwt_required()
def recupera_licenza():
    return Ciso.recupera_licenza(mail=get_jwt_identity())
