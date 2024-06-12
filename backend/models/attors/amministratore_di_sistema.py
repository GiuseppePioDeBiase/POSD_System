from datetime import datetime
from flask import jsonify, request
from backend.config.db import conn_db
from backend.models.attors.utente import Utente, utenti
from backend.models.attors.ruolo import Ruolo
from backend.models.message_reporting.segnalazione import segnalazioniAccettate

db = conn_db()  # Connessione al database MongoDB
utenti_eliminati = db['Utenti eliminati']  # Nome della collezione


class AmministratoreDiSistema(Utente):
    def __init__(self, nome, cognome, email, password, genere):
        super().__init__(nome, cognome, email, password, genere, ruolo=Ruolo.AMMINISTRATORE_DI_SISTEMA.value)

    @classmethod
    def visualizza_utenti(cls, mail):
        try:
            amministratore = utenti.find_one({"email": mail})
            if amministratore is None or amministratore['ruolo'] != Ruolo.AMMINISTRATORE_DI_SISTEMA.value:
                return jsonify({
                    "successo": False,
                    "messaggio": "L'amministratore non esiste o non ha i privilegi necessari per eliminare utenti."
                }), 403

            # Trova tutti gli utenti tranne l'utente richiedente
            lista_utenti = list(utenti.find(
                {"email": {"$ne": mail}},
                {
                    "_id": False,  # Escludi il campo _id
                    "nome": True,  # Includi il campo nome
                    "cognome": True,  # Includi il campo cognome
                    "email": True,  # Includi il campo email
                    "password": True,  # Includi il campo password
                    "ruolo": True,  # Includi il campo ruolo
                    "genere": True  # Includi il campo genere
                }
            ))

            utenti_json = [utente for utente in lista_utenti]
            return jsonify({
                "successo": True,
                "utenti": utenti_json
            }), 200
        except Exception as e:
            return jsonify({
                "successo": False,
                "messaggio": f"Errore durante il recupero degli utenti: {str(e)}"
            }), 500

    @classmethod
    def elimina_utente(cls, mail_amministratore, mail_utente):
        try:
            # Verifica se l'amministratore esiste nel database
            amministratore = utenti.find_one({"email": mail_amministratore})
            if amministratore is None or amministratore['ruolo'] != Ruolo.AMMINISTRATORE_DI_SISTEMA.value:
                return jsonify({
                    "successo": False,
                    "messaggio": "L'amministratore non esiste o non ha i privilegi necessari per eliminare utenti."
                }), 403

            # Trova l'utente da eliminare
            utente_da_elim = utenti.find_one({"email": mail_utente})
            if utente_da_elim is None:
                return jsonify({
                    "successo": False,
                    "messaggio": "L'utente specificato non esiste."
                }), 404

            # Salva le informazioni dell'utente eliminato nella collezione "Utenti_eliminati"
            utente_eliminato = {
                "email_amministratore": mail_amministratore,
                "data_ora_eliminazione": datetime.now().strftime("%A %d-%m-%Y - %H:%M:%S"),
                "ip_pubblico": request.remote_addr,
                **utente_da_elim  # Tutte le informazioni dell'utente
            }
            utenti_eliminati.insert_one(utente_eliminato)

            # Rimuovi l'utente dal database degli utenti
            utenti.delete_one({"email": mail_utente})

            return jsonify({
                "successo": True,
                "messaggio": "Utente eliminato con successo."
            }), 200

        except Exception as e:
            return jsonify({
                "successo": False,
                "messaggio": f"Errore durante l'eliminazione dell'utente: {str(e)}"
            }), 500

    @classmethod
    def getSegnalazioniAccettateAmministratore(cls, mail):
        amministratore = utenti.find_one({"email": mail})
        if not amministratore or amministratore['ruolo'] != Ruolo.AMMINISTRATORE_DI_SISTEMA.value:
            return jsonify({"successo": False,
                            "messaggio": "L'amministratore non esiste o non ha i privilegi necessari per visualizzare "
                                         "le segnalazioni."}), 403

        collection = segnalazioniAccettate.find({}, {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True,
                                                     'id_ciso': True, "_id": False})
        return cls.convert_object_ids(collection, "id_ciso")
