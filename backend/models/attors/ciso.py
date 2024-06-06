import io
from bson import Binary
from flask import request, jsonify, send_file
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
        nome_file = licenza.filename #nome file

        # Salva il binario e il nome del file nel database MongoDB
        utenti.update_one({"email": mail}, {"$set": {"licenza": Binary(licenza_binario), "nome_file": nome_file}})

        # Rispondi con il messaggio di successo
        return jsonify({"successo": True, "messaggio": "Licenza caricata con successo!"}), 200

    @classmethod
    def recupera_licenza(cls, mail):
        user = utenti.find_one({"email": mail}, {"licenza": True, "licenza_nome": True}) # Verifico se c'è una licenza
        if not user or 'licenza' not in user:
            return jsonify({"successo": False, "messaggio": "Licenza non trovata!"}), 404

        licenza_binario = user['licenza']
        licenza_nome = user['licenza_nome'] # nome file
        return send_file(io.BytesIO(licenza_binario), as_attachment=True, attachment_filename=licenza_nome)

