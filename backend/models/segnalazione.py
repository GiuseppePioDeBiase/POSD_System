from backend.config.db import conn_db
from backend.models import BaseMessage
from flask import request, jsonify

db = conn_db()
segnalazioneCollection = db['Segnalazione']


class Segnalazione(BaseMessage):
    def __init__(self, oggetto, messaggio, ip_pubblico, id=None):
        super().__init__(oggetto, messaggio, ip_pubblico, id, segnalazioneCollection)

    @classmethod
    def insertSegnalazione(cls):
        dati = request.json

        if not cls.validate(dati.get('oggetto', ''), dati.get('messaggio', '')):
            return jsonify({"successo": False, "messaggio": "Segnalazione non valida!"}), 400

        segnalazione = cls(
            oggetto=dati['oggetto'],
            messaggio=dati['messaggio'],
            ip_pubblico=request.remote_addr
        )

        segnalazioneCollection.insert_one(segnalazione.to_json())
        return jsonify({"successo": True, "messaggio": "Segnalazione ricevuta!"}), 201
