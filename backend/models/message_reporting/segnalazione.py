from backend.config.db import conn_db
from backend.models.message_reporting.base_message import BaseMessage
from flask import request, jsonify

db = conn_db()
segnalazioneCollection = db['Segnalazione']


class Segnalazione(BaseMessage):
    def __init__(self, oggetto, messaggio, ip_pubblico, mail):
        super().__init__(oggetto, messaggio, ip_pubblico, mail)
        self.mail = mail

    @classmethod
    def insertSegnalazione(cls, mail):
        dati = request.json

        if not cls.validate(dati.get('oggetto', ''), dati.get('messaggio', '')):
            return jsonify({"successo": False, "messaggio": "Segnalazione non valida!"}), 400

        segnalazione = cls(
            oggetto=dati['oggetto'],
            messaggio=dati['messaggio'],
            ip_pubblico=request.remote_addr,
            mail=mail
        )

        segnalazioneCollection.insert_one(segnalazione.to_json())
        return jsonify({"successo": True, "messaggio": "Segnalazione ricevuta!"}), 201

    def to_json(self):
        base_json = super().to_json()
        base_json.update({
            "mail": self.mail
        })
        return base_json
