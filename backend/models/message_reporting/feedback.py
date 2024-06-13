from backend.models.attors.ruolo import Ruolo
from backend.models.message_reporting.base_message import BaseMessage
from flask import jsonify, request
from backend.config.db import conn_db

db = conn_db()
feedbackCollection = db['InserisciFeedback']


class Feedback(BaseMessage):
    def __init__(self, oggetto, messaggio, mail):
        super().__init__(oggetto, messaggio)
        self.mail = mail

    @classmethod
    def insertFeedback(cls, mail):
        from backend.models.attors.utente import utenti
        utente = utenti.find_one({"email": mail})
        if not utente or utente['ruolo'] != Ruolo.UTENTE.value:
            return jsonify({"successo": False,
                            "messaggio": "L'utente non esiste o non ha i privilegi necessari per visualizzare le "
                                         "segnalazioni."}), 403

        dati = request.json

        if not cls.validate(dati.get('oggetto', ''), dati.get('messaggio', '')):
            return jsonify({"successo": False, "messaggio": "Feedback non valido!"}), 400

        feedback = cls(
            oggetto=dati['oggetto'],
            messaggio=dati['messaggio'],
            mail=mail
        )

        feedbackCollection.insert_one(feedback.to_json())
        return jsonify({"successo": True, "messaggio": "Feedback ricevuto!"}), 201

    def to_json(self):
        return {
            'oggetto': self.oggetto,
            'messaggio': self.messaggio,
            'mail': self.mail
        }
