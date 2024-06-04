from backend.config.db import conn_db
from backend.models.message_reporting.base_message import BaseMessage
from flask import request, jsonify

db = conn_db()
segnalazioneCollection = db['SegnalazioneCISO']


class Segnalazione(BaseMessage):
    def __init__(self, oggetto, messaggio, ip_pubblico):
        super().__init__(oggetto, messaggio, ip_pubblico)

    @classmethod
    def insertSegnalazione(cls):
        dati = request.json

        if not cls.validate(dati.get('oggetto', ''), dati.get('messaggio', '')):
            return jsonify({"successo": False, "messaggio": "SegnalazioneCISO non valida!"}), 400

        segnalazione = cls(
            oggetto=dati['oggetto'],
            messaggio=dati['messaggio'],
            ip_pubblico=request.remote_addr
        )

        segnalazioneCollection.insert_one(segnalazione.to_json())
        return jsonify({"successo": True, "messaggio": "SegnalazioneCISO ricevuta!"}), 201
