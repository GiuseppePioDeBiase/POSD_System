from backend.models.message_reporting.base_message import BaseMessage
from flask import jsonify, request
from backend.config.db import conn_db

db = conn_db()
feedbackCollection = db['Feedback']


class Feedback(BaseMessage):
    def __init__(self, oggetto, messaggio, mail):
        super().__init__(oggetto, messaggio, mail)

    @classmethod
    def insertFeedback(cls, mail):
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
