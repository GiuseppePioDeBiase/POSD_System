from backend.models.message_reporting.base_message import BaseMessage
from flask import jsonify, request
from backend.config.db import conn_db

db = conn_db()
feedbackCollection = db['InserisciFeedback']


class Feedback(BaseMessage):
    def __init__(self, oggetto, messaggio, mail):
        super().__init__(oggetto, messaggio, mail)

    @classmethod
    def insertFeedback(cls): # Inserire la mail quando viene rilasciato un feedback
        dati = request.json

        if not cls.validate(dati.get('oggetto', ''), dati.get('messaggio', '')):
            return jsonify({"successo": False, "messaggio": "InserisciFeedback non valido!"}), 400

        feedback = cls(
            oggetto=dati['oggetto'],
            messaggio=dati['messaggio'],
        )

        feedbackCollection.insert_one(feedback.to_json())
        return jsonify({"successo": True, "messaggio": "InserisciFeedback ricevuto!"}), 201
