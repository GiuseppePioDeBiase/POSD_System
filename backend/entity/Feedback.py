import re
from datetime import datetime
from flask import request, jsonify
from backend.db import conn_db

# Connessione al database MongoDB
db = conn_db()
feedbackCollection = db['Feedback']  # Collezione Feedback

class Feedback:
    def __init__(self, oggetto, messaggio, ip_pubblico, id=None):
        if id:
            self.id = id
        else:
            # Se non viene passato nessun id legge l'ultimo del db se il db è vuoto l'id è 1
            last_feedback = feedbackCollection.find_one(sort=[("id", -1)])
            last_id = last_feedback["id"] if last_feedback else 0
            self.id = last_id + 1

        self.oggetto = oggetto
        self.messaggio = messaggio
        self.data_ora = datetime.now().strftime("%A %d-%m-%Y - %H:%M:%S")
        self.ip_pubblico = ip_pubblico

    def to_json(self):
        return {
            "id": self.id,
            "oggetto": self.oggetto,
            "messaggio": self.messaggio,
            "data_ora": self.data_ora,
            "ip_pubblico": self.ip_pubblico
        }

    @staticmethod
    def insertFeedback():
        data = request.json

        invalidString = re.compile(
            r'^\s*$'  # solo spazi bianchi
            r'|^(.)\1*$'  # singolo carattere ripetuto
            r'|^[0-9]+$'  # solo numeri
            r'|^[^\w\s]+$'  # solo caratteri speciali
            r'|^[^\w\s].*[^\w\s]$'  # inizia e termina con caratteri non alfanumerici o spazi
        )

        if invalidString.match(data.get('oggetto', '')) or invalidString.match(data.get('messaggio', '')):
            return jsonify({"success": False,
                            "message": "Feedback non valido!"}), 400

        feedback = Feedback(
            oggetto=data['oggetto'],
            messaggio=data['messaggio'],
            ip_pubblico=request.remote_addr
        )

        feedbackCollection.insert_one(feedback.to_json())
        return jsonify({"success": True, "message": "Feedback ricevuto!"}), 201
