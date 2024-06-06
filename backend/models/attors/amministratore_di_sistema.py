from datetime import datetime
from flask import jsonify, request
from backend.config.db import conn_db
from backend.models.attors.utente import Utente, utenti
from backend.models.attors.ruolo import Ruolo

db = conn_db()  # Connessione al database MongoDB
utenti_eliminati = db['Utenti eleminati']  # Nome della collezione


class AmministratoreDiSistema(Utente):
    def __init__(self, nome, cognome, email, password, genere):
        super().__init__(nome, cognome, email, password, genere, ruolo=Ruolo.AMMINISTRATORE_DI_SISTEMA.value)

    @classmethod
    def visualizza_utenti(cls, mail):
        try:
            # Trova tutti gli utenti tranne l'utente richiedente
            lista_utenti = list(utenti.find({"email": {"$ne": mail}}, {"password": False, "_id": False}))
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
