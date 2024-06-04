from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.message_reporting.segnalazione import Segnalazione

segnalazione_bp = Blueprint('segnalazione_bp', __name__)


@segnalazione_bp.route('/api/segnalazione', methods=['POST'])
@jwt_required()
def add_segnalazione():
    return Segnalazione.insertSegnalazione(email=get_jwt_identity())
