from flask import jsonify
from backend.models.attors.utente import Utente, utenti
from backend.models.attors.ruolo import Ruolo


class AmministratoreDiSistema(Utente):
    def __init__(self, nome, cognome, email, password):
        super().__init__(nome, cognome, email, password, ruolo=Ruolo.AMMINISTRATORE_DI_SISTEMA)

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
