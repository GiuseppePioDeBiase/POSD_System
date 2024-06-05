from bson import ObjectId

from backend.config.db import conn_db
from backend.models.message_reporting.base_message import BaseMessage
from flask import request, jsonify

db = conn_db()
segnalazioneCollection = db['Segnalazioni']


class Segnalazione(BaseMessage):
    def __init__(self, oggetto, messaggio, mail):
        super().__init__(oggetto, messaggio)
        self.mail = mail

    @classmethod
    def insertSegnalazione(cls, mail):
        dati = request.json

        if not cls.validate(dati.get('oggetto', ''), dati.get('messaggio', '')):
            return jsonify({"successo": False, "messaggio": "Segnalazione non valida!"}), 400

        segnalazione = cls(
            oggetto=dati['oggetto'],
            messaggio=dati['messaggio'],
            mail=mail
        )

        segnalazioneCollection.insert_one(segnalazione.to_json())
        return jsonify({"successo": True, "messaggio": "Segnalazione ricevuta!"}), 201

    @classmethod
    def getAllSegnalazioni(cls):
        collection = segnalazioneCollection.find({}, {'data_ora': False, "ip_pubblico": False})
        segnalazioni = []
        for segnalazione in collection:
            segnalazione['_id'] = str(segnalazione['_id'])  # Converti l'ObjectID in stringa
            segnalazioni.append(segnalazione)
        return jsonify(segnalazioni)

    @classmethod
    def statusSegnalazione(cls):
        dati = request.json

        segnalazione_id = dati.get('_id')
        nuovo_stato = dati.get('stato')

        if not ObjectId.is_valid(segnalazione_id):
            return jsonify({"successo": False, "messaggio": "ID segnalazione non valido!"}), 400

        result = segnalazioneCollection.update_one(
            {"_id": ObjectId(segnalazione_id)},
            {"$set": {"stato": nuovo_stato}}
        )

        if result.matched_count == 0:
            return jsonify({"successo": False, "messaggio": "Segnalazione non trovata!"}), 404

        return jsonify({"successo": True, "messaggio": "Stato della segnalazione aggiornato!"}), 200

    def to_json(self):
        base_json = super().to_json()
        base_json.update({
            "mail": self.mail,
            "_id": str(self._id) if hasattr(self, '_id') else None  # Assicurati che l'ObjectID sia convertito
        })
        return base_json
