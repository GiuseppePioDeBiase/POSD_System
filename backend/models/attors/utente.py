from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies
from flask import request, jsonify, json
from werkzeug.security import generate_password_hash, check_password_hash
from backend.config.db import conn_db
import re
from backend.models.attors.ruolo import Ruolo

db = conn_db()  # Connessione al database MongoDB
utenti = db['Utenti']  # Nome della collezione


class Utente:
    def __init__(self, nome, cognome, email, password, ruolo):
        self.nome = nome
        self.cognome = cognome
        self.email = email
        self.password = generate_password_hash(password)  # Hash della password per la sicurezza
        self.ruolo = Ruolo.UTENTE

    def to_json(self):
        return {
            "nome": self.nome,
            "cognome": self.cognome,
            "email": self.email,
            "password": self.password,
            "ruolo": self.ruolo
        }

    @staticmethod
    def valida_email(email):
        regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(regex, email) is not None

    @staticmethod
    def valida_password(password):
        if len(password) < 8:
            return False
        if not re.search(r'[A-Z]', password):
            return False
        if not re.search(r'[a-z]', password):
            return False
        if not re.search(r'\d', password):
            return False
        return True

    @staticmethod
    def valida_nome_cognome(nome_cognome):
        regex = r"^[a-zA-Zà-ÿÀ-Ÿ0-9' -]+$"
        return re.match(regex, nome_cognome) is not None

    @classmethod
    def registrati(cls):
        dati = request.json
        if not dati:
            return jsonify({"successo": False, "messaggio": "Nessun dato fornito!"}), 400

        nome = dati.get('nome')
        cognome = dati.get('cognome')
        email = dati.get('email')
        password = dati.get('password')
        ruolo = dati.get('ruolo')

        if not all([nome, cognome, email, password]):
            return jsonify({"successo": False, "messaggio": "Tutti i campi sono obbligatori!"}), 400

        if not cls.valida_email(email):
            return jsonify({"successo": False, "messaggio": "Email non valida!"}), 400

        if not cls.valida_nome_cognome(nome):
            return jsonify({"successo": False, "messaggio": "Nome non valido!"}), 400

        if not cls.valida_nome_cognome(cognome):
            return jsonify({"successo": False, "messaggio": "Cognome non valido!"}), 400

        if not cls.valida_password(password):
            return jsonify({"successo": False, "messaggio": "Password non valida!"}), 400

        if utenti.find_one({"email": email}):
            return jsonify({"successo": False, "messaggio": "L'utente è già registrato!"}), 400

        # Crea un'istanza della classe appropriata
        try:
            if ruolo == "ciso":
                from backend.models.attors.ciso import Ciso
                utente = Ciso(nome, cognome, email, password)
            elif ruolo == "amministratore di sistema":
                from backend.models.attors.amministratore_di_sistema import AmministratoreDiSistema
                utente = AmministratoreDiSistema(nome, cognome, email, password)
            elif ruolo == "utente":
                utente = cls(nome, cognome, email, password)
            else:
                return jsonify({"successo": False, "messaggio": f"Ruolo: {ruolo} non valido!"}), 400

            utenti.insert_one(utente.to_json())
        except Exception as e:
            return jsonify({"successo": False, "messaggio": f"Errore durante la registrazione dell'utente: {str(e)}"}), 500

        return jsonify({"successo": True, "messaggio": "Utente registrato con successo!"}), 201

    @classmethod
    def login(cls):
        dati = request.json
        if not dati:
            return jsonify({"successo": False, "messaggio": "Nessun dato fornito!"}), 400

        email = dati.get('email')
        password = dati.get('password')

        if not all([email, password]):
            return jsonify({"successo": False, "messaggio": "Email e password sono obbligatori!"}), 400

        utente = utenti.find_one({"email": email})
        if not utente:
            return jsonify({"successo": False, "messaggio": "L'utente non esiste!"}), 401

        if not check_password_hash(utente['password'], password):
            return jsonify({"successo": False, "messaggio": "Password non corretta!"}), 401

        return jsonify({
            "successo": True,
            "messaggio": "Login eseguito con successo!",
            "token": create_access_token(identity=email),
            "ruolo": utente.get('ruolo')
        }), 200

    @classmethod
    def logout(cls):
        response = jsonify({"msg": "Logout eseguito con successo!"})
        unset_jwt_cookies(response)
        return response, 200

    @classmethod
    def getNomeCognomeEmail(cls):
        dati = request.json
        if not dati:
            return jsonify({"successo": False, "messaggio": "Nessun dato fornito!"}), 400

        email = dati.get('email')
        if not email:
            return jsonify({"successo": False, "messaggio": "Email non fornita!"}), 400

        utente = utenti.find_one({"email": email})
        if not utente:
            return jsonify({"successo": False, "messaggio": "Utente non trovato!"}), 404

        return jsonify({
            "successo": True,
            "nome": utente.get('nome'),
            "cognome": utente.get('cognome'),
            "email": utente.get('email'),
            "ruolo": utente.get('ruolo')
        }), 200

    @staticmethod
    def refresh_expiring_jwts(response):
        try:
            exp_ts = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_ts = datetime.timestamp(now + timedelta(minutes=30))
            if target_ts > exp_ts:
                access_token = create_access_token(identity=get_jwt_identity())
                data = response.get_json()
                if isinstance(data, dict):
                    data["access_token"] = access_token
                    response.data = json.dumps(data)
            return response
        except (RuntimeError, KeyError):
            return response
