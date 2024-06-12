import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
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
        dati = request.json

        if not cls.validate(dati.get('oggetto', ''), dati.get('messaggio', '')):
            return jsonify({"successo": False, "messaggio": "Segnalazione non valida!"}), 400

        segnalazione = cls(oggetto=dati['oggetto'], messaggio=dati['messaggio'], mail=mail)
        segnalazioneCollection.insert_one(segnalazione.to_json())
        return jsonify({"successo": True, "messaggio": "Segnalazione ricevuta!"}), 201

    @classmethod
    def getAllSegnalazioni(cls):
        collection = segnalazioneCollection.find({}, {'data_ora': False, "ip_pubblico": False})
        return cls.convert_object_ids(collection)

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
        segnalazione.update({
            'id_ciso': ObjectId(id_ciso['_id']) if id_ciso else None,
            'data_ora_modifica': data_ora_modifica,
            'stato': "ACCETTATO" if stato else "RIFIUTATO",
            'messaggio': messaggio
        })

        collection = segnalazioniAccettate if stato else segnalazioniRifiutate
        collection.insert_one(segnalazione)

        messaggio_finale = "Segnalazione accettata!" if stato else "Segnalazione rifiutata!"
        return jsonify({"successo": True, "messaggio": messaggio_finale}), 200

    def to_json(self):
        base_json = super().to_json()
        base_json.update({"mail": self.mail})
        return base_json

    @classmethod
    def getSegnalazioniAccettateAmministratore(cls, mail):
        amministratore = utenti.find_one({"email": mail})
        if not amministratore or amministratore['ruolo'] != Ruolo.AMMINISTRATORE_DI_SISTEMA.value:
            return jsonify({"successo": False, "messaggio": "L'amministratore non esiste o non ha i privilegi necessari per visualizzare le segnalazioni."}), 403

        collection = segnalazioniAccettate.find({}, {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True, 'id_ciso': True, "_id": False})
        return cls.convert_object_ids(collection, "id_ciso")

    @classmethod
    def storicoUtente(cls, mail):
        if not cls.collections_exist(['Segnalazioni accettate', 'Segnalazioni rifiutate']):
            return jsonify({"error": "Una delle collezioni non esiste"}), 500

        try:
            accettate = list(segnalazioniAccettate.find({"mail": mail}, {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True, "_id": False, "stato": True, "id_ciso": True}))
            rifiutate = list(segnalazioniRifiutate.find({"mail": mail}, {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True, "_id": False, "stato": True, "id_ciso": True}))
        except PyMongoError as e:
            return jsonify({"error": f"Database error: {str(e)}"}), 500

        storico = cls.convert_object_ids(accettate + rifiutate, "id_ciso")
        return jsonify(storico)

    @classmethod
    def storicoCiso(cls, mail):
        if not cls.collections_exist(['Segnalazioni accettate', 'Segnalazioni rifiutate']):
            return jsonify({"error": "Una delle collezioni non esiste"}), 500

        try:
            ciso = utenti.find_one({"email": mail}, {"_id": True})
            if not ciso:
                return jsonify({"error": "CISO non trovato"}), 404

            accettate = list(segnalazioniAccettate.find({"id_ciso": ciso['_id']}, {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True, "_id": False, "stato": True, "mail": True}))
            rifiutate = list(segnalazioniRifiutate.find({"id_ciso": ciso['_id']}, {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True, "_id": False, "stato": True, "mail": True}))
        except PyMongoError as e:
            return jsonify({"error": f"Database error: {str(e)}"}), 500

        storico = cls.convert_object_ids(accettate + rifiutate)
        return jsonify(storico)

    @staticmethod
    def convert_object_ids(collection, id_field="id_ciso"):
        result = []
        for document in collection:
            if id_field in document:
                document[id_field] = str(document[id_field])
            result.append(document)
        return jsonify(result)

    @staticmethod
    def collections_exist(collection_names):
        existing_collections = db.list_collection_names()
        return all(name in existing_collections for name in collection_names)
