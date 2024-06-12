from backend.config.db import conn_db
from backend.models.attors.ruolo import Ruolo
from backend.models.message_reporting.base_message import BaseMessage
from flask import request, jsonify
from backend.models.attors.utente import utenti

db = conn_db()

segnalazioneCollection = db['Segnalazioni']
segnalazioniAccettate = db['Segnalazioni accettate']
segnalazioniRifiutate = db['Segnalazioni rifiutate']


class Segnalazione(BaseMessage):
    def __init__(self, oggetto, messaggio, mail):
        super().__init__(oggetto, messaggio, mail)

    @classmethod
    def insertSegnalazione(cls, mail):

        utente = utenti.find_one({"email": mail})
        if not utente or utente['ruolo'] != Ruolo.UTENTE.value:
            return jsonify({"successo": False,
                            "messaggio": "L'utente non esiste o non ha i privilegi necessari per visualizzare le "
                                         "segnalazioni."}), 403

        dati = request.json

        if not cls.validate(dati.get('oggetto', ''), dati.get('messaggio', '')):
            return jsonify({"successo": False, "messaggio": "Segnalazione non valida!"}), 400

        segnalazione = cls(oggetto=dati['oggetto'], messaggio=dati['messaggio'], mail=mail)
        segnalazioneCollection.insert_one(segnalazione.to_json())
        return jsonify({"successo": True, "messaggio": "Segnalazione ricevuta!"}), 201

    def to_json(self):
        base_json = super().to_json()
        base_json.update({"mail": self.mail})
        return base_json
