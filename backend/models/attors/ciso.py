import uuid
from bson import Binary
from flask import request, jsonify
from backend.models.attors.utente import Utente, utenti
from backend.models.attors.ruolo import Ruolo


class Ciso(Utente):
    def __init__(self, nome, cognome, email, password, genere,):
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

        # Salva il binario nel database MongoDB
        licenza_id = str(uuid.uuid4())
        utenti.update_one({"email": mail}, {"$set": {"licenza": Binary(licenza_binario), "licenza_id": licenza_id}})

        # Rispondi con il percorso della licenza
        licenza_url = f"/licenza/{licenza_id}"  # Per esempio, un endpoint per servire la licenza
        return jsonify(
            {"successo": True, "messaggio": "Licenza caricata con successo!", "licenza_url": licenza_url}), 200

