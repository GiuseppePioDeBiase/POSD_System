import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from backend.config.db import conn_db
from backend.models.message_reporting.base_message import BaseMessage
from flask import request, jsonify
from backend.models.attors.utente import utenti

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
    def statusSegnalazione(cls, mail):
        dati = request.json

        stato = dati.get('stato')
        if stato is None or not isinstance(stato, bool):
            return jsonify({"successo": False, "messaggio": "Stato non valido!"}), 400

        id_segnalazione = ObjectId(dati.get('_id'))
        messaggio = dati.get('messaggio')
        data_ora_modifica = datetime.datetime.now().strftime("%A %d-%m-%Y - %H:%M:%S")

        segnalazione = segnalazioneCollection.find_one_and_delete({"_id": id_segnalazione})

        if not segnalazione:
            return jsonify({"successo": False, "messaggio": "Segnalazione non trovata!"}), 404

        id_ciso = utenti.find_one({"email": mail}, {"_id": True})

        segnalazione['id_ciso'] = str(id_ciso['_id']) if id_ciso else None
        segnalazione['data_ora_modifica'] = data_ora_modifica
        segnalazione['stato'] = "ACCETTATO" if stato else "RIFIUTATO"
        collection = segnalazioniAccettate if stato else segnalazioniRifiutate
        collection.insert_one({**segnalazione, "messaggio": messaggio})

        messaggio_finale = "Segnalazione accettata!" if stato else "Segnalazione rifiutata!"
        return jsonify({"successo": True, "messaggio": messaggio_finale}), 200

    def to_json(self):
        base_json = super().to_json()
        base_json.update({
            "mail": self.mail,
        })
        return base_json

    @classmethod
    def getSegnalazioniAccettate(cls):
        collection = segnalazioniAccettate.find({}, {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True, "_id": False})
        return jsonify(list(collection))

    @classmethod
    def storicoUtente(cls, email):

        try:
            if 'Segnalazioni accettate' not in db.list_collection_names():
                return jsonify({"error": "Collezione 'Segnalazioni accettate' non esiste"}), 500

            if 'Segnalazioni rifiutate' not in db.list_collection_names():
                return jsonify({"error": "Collezione 'Segnalazioni rifiutate' non esiste"}), 500

            accettate = list(segnalazioniAccettate.find({"mail": email},
                                                        {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True,
                                                         "_id": False, "stato": True}))
            rifiutate = list(segnalazioniRifiutate.find({"mail": email},
                                                        {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True,
                                                         "_id": False, "stato": True}))

        except PyMongoError as e:
            return jsonify({"error": f"Database error: {str(e)}"}), 500

        # Combine results
        storico = []
        storico.extend(accettate)
        storico.extend(rifiutate)

        return jsonify(storico)
