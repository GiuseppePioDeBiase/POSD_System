from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.message_reporting.segnalazione import Segnalazione

segnalazione_bp = Blueprint('segnalazione_bp', __name__)


@segnalazione_bp.route('/api/segnalazione', methods=['POST'])
@jwt_required()
def add_segnalazione():
    return Segnalazione.insertSegnalazione(mail=get_jwt_identity())

@segnalazione_bp.route('/api/allsegnalazioni', methods=['GET'])
@jwt_required()
def get_all_segnalazioni():
    return Segnalazione.getAllSegnalazioni(mail=get_jwt_identity())

@segnalazione_bp.route('/api/updatesegnalazione', methods=['POST'])
@jwt_required()
def status_segnalazione():
    return Segnalazione.statusSegnalazioneCiso(mail=get_jwt_identity())

@segnalazione_bp.route('/api/allsegnalazioniaccettate', methods=['GET'])
@jwt_required()
def get_all_segnalazioni_accettate_amministratore():
    return Segnalazione.getSegnalazioniAccettateAmministratore(mail=get_jwt_identity())

@segnalazione_bp.route('/api/storicoutente', methods=['GET'])
@jwt_required()
def get_storico_utente():
    return Segnalazione.storicoUtente(mail=get_jwt_identity())

@segnalazione_bp.route('/api/storiciso', methods=['GET'])
@jwt_required()
def get_storiciso():
    return Segnalazione.storicoUtente(mail=get_jwt_identity())
