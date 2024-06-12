import datetime
import io
from bson import Binary, ObjectId
from flask import request, jsonify, send_file
from pymongo.errors import PyMongoError

from backend.models.attors.utente import Utente, utenti
from backend.models.attors.ruolo import Ruolo
from backend.models.message_reporting.segnalazione import segnalazioneCollection, segnalazioniAccettate, \
    segnalazioniRifiutate


class Ciso(Utente):
    def __init__(self, nome, cognome, email, password, genere):
        super().__init__(nome, cognome, email, password, genere, ruolo=Ruolo.CISO.value)

    @classmethod
    def carica_licenza(cls, mail):
        if 'licenza' not in request.files:
            return jsonify({"successo": False, "messaggio": "Nessun file fornito!"}), 400

        licenza = request.files['licenza']
        if licenza.filename == '':
            return jsonify({"successo": False, "messaggio": "Nessun file selezionato!"}), 400

        # Leggi il file come binario
        licenza_binario = licenza.read()
        nome_file = licenza.filename

        try:
            # Salva il binario e il nome del file nel database MongoDB
            utenti.update_one(
                {"email": mail},
                {"$set": {"licenza": Binary(licenza_binario), "nome_file": nome_file}}
            )
            return jsonify({"successo": True, "messaggio": "Licenza caricata con successo!"}), 200
        except Exception as e:
            return jsonify({"successo": False, "messaggio": str(e)}), 500

    @classmethod
    def recupera_licenza(cls, mail):
        try:
            user = utenti.find_one({"email": mail}, {"licenza": True, "nome_file": True})
            if not user or 'licenza' not in user:
                return jsonify({"successo": False, "messaggio": "Licenza non trovata!"}), 404

            return send_file(
                io.BytesIO(user['licenza']),
                as_attachment=True,
                download_name=user['nome_file']
            ), 200
        except Exception as e:
            return jsonify({"successo": False, "messaggio": str(e)}), 500

    @classmethod
    def getAllSegnalazioni(cls, mail):
        ciso = utenti.find_one({"email": mail})
        if not ciso or ciso['ruolo'] != Ruolo.CISO.value:
            return jsonify({"successo": False,
                            "messaggio": "Il ciso non esiste o non ha i privilegi necessari per visualizzare le "
                                         "segnalazioni."}), 403

        # Retrieve the documents from the collection
        collection = segnalazioneCollection.find({}, {'data_ora': False, "ip_pubblico": False})

        # conversion obj in string
        segnalazioni = []
        for segnalazione in collection:
            segnalazione['_id'] = str(segnalazione['_id'])
            segnalazioni.append(segnalazione)

        return jsonify(segnalazioni)

    @classmethod
    def statusSegnalazioneCiso(cls, mail):

        ciso = utenti.find_one({"email": mail})
        if not ciso or ciso['ruolo'] != Ruolo.CISO.value:
            return jsonify({"successo": False,
                            "messaggio": "Il ciso non esiste o non ha i privilegi necessari per visualizzare le "
                                         "segnalazioni."}), 403

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

    @classmethod
    def storicoCiso(cls, mail):
        try:
            ciso = utenti.find_one({"email": mail})

            if not ciso or ciso['ruolo'] != Ruolo.CISO.value:
                return jsonify({"successo": False,
                                "messaggio": "Il ciso non esiste o non ha i privilegi necessari per visualizzare le "
                                             "segnalazioni."}), 403

            accettate = list(segnalazioniAccettate.find({"id_ciso": ciso['_id']},
                                                        {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True,
                                                         "_id": False, "stato": True, "mail": True}))
            rifiutate = list(segnalazioniRifiutate.find({"id_ciso": ciso['_id']},
                                                        {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True,
                                                         "_id": False, "stato": True, "mail": True}))
        except PyMongoError as e:
            return jsonify({"error": f"Database error: {str(e)}"}), 500

        storico = cls.convert_object_ids(accettate + rifiutate)
        return jsonify(storico)

