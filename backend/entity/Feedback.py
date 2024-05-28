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
            # Se non viene passato nessun id, legge l'ultimo del db; se il db è vuoto, l'id è 1
            ultimo_feedback = feedbackCollection.find_one(sort=[("id", -1)])
            ultimo_id = ultimo_feedback["id"] if ultimo_feedback else 0
            self.id = ultimo_id + 1

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

    @classmethod
    def insertFeedback(cls):
        dati = request.json

        stringa_non_valida = re.compile(
            r'^\s*$'  # solo spazi bianchi
            r'|^(.)\1*$'  # singolo carattere ripetuto
            r'|^[0-9]+$'  # solo numeri
            r'|^[^\w\s]+$'  # solo caratteri speciali
            r'|^[^\w\s].*[^\w\s]$'  # inizia e termina con caratteri non alfanumerici o spazi
        )

        if stringa_non_valida.match(dati.get('oggetto', '')) or stringa_non_valida.match(dati.get('messaggio', '')):
            return jsonify({"successo": False,
                            "messaggio": "Feedback non valido!"}), 400

        feedback = cls(
            oggetto=dati['oggetto'],
            messaggio=dati['messaggio'],
            ip_pubblico=request.remote_addr
        )

        feedbackCollection.insert_one(feedback.to_json())
        return jsonify({"successo": True, "messaggio": "Feedback ricevuto!"}), 201
