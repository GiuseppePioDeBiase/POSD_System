import datetime
from bson import ObjectId
from backend.config.db import conn_db
from backend.models.message_reporting.base_message import BaseMessage
from flask import request, jsonify

db = conn_db()

segnalazioneCollection = db['Segnalazioni']
segnalazioniAccettate = db['Segnalazioni accettate']
segnalazioniRifiutate = db['Segnalazioni rifiutate']


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

        stato = dati.get('stato')
        if stato is None or not isinstance(stato, bool):
            return jsonify({"successo": False, "messaggio": "Stato non valido!"}), 400

        id_segnalazione = ObjectId(dati.get('_id'))

        messaggio = dati.get('messaggio')

        data_ora_modifica = datetime.datetime.now().strftime("%A %d-%m-%Y - %H:%M:%S")

        if stato:  # Se lo stato è True (accettato)
            segnalazione = segnalazioneCollection.find_one_and_delete({"_id": id_segnalazione})
            if segnalazione:
                segnalazione['data_ora_modifica'] = data_ora_modifica
                segnalazioniAccettate.insert_one({**segnalazione, "messaggio": messaggio})
                return jsonify({"successo": True, "messaggio": "Segnalazione accettata!"}), 200
            else:
                return jsonify({"successo": False, "messaggio": "Segnalazione non trovata!"}), 404
        else:  # Se lo stato è False (rifiutato)
            segnalazione = segnalazioneCollection.find_one_and_delete({"_id": id_segnalazione})
            if segnalazione:
                segnalazione['data_ora_modifica'] = data_ora_modifica
                segnalazioniRifiutate.insert_one({**segnalazione, "messaggio": messaggio})
                return jsonify({"successo": True, "messaggio": "Segnalazione rimossa!"}), 200
            else:
                return jsonify({"successo": False, "messaggio": "Segnalazione non trovata!"}), 404

    def to_json(self):
        base_json = super().to_json()
        base_json.update({
            "mail": self.mail,
            #"_id": str(self._id) if hasattr(self, '_id') else None  # Assicurati che l'ObjectID sia convertito
        })
        return base_json
