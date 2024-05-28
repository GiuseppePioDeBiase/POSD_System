from flask import request, jsonify
from werkzeug.security import generate_password_hash
from bson import ObjectId
from backend.db import conn_db
import re

db = conn_db()  # Connessione al database MongoDB
utenti = db['Utenti']  # Nome della collezione


class Utente:
    def __init__(self, nome, cognome, email, password):
        self.id = ObjectId()  # Genera un nuovo ObjectId
        self.nome = nome
        self.cognome = cognome
        self.email = email
        self.password = generate_password_hash(password)  # Hash della password per la sicurezza

    def to_json(self):
        return {
            "_id": str(self.id),
            "nome": self.nome,
            "cognome": self.cognome,
            "email": self.email,
            "password": self.password
        }

    @staticmethod
    def valida_email(email):
        regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(regex, email) is not None

    @staticmethod
    def valida_password(password):
        # La password deve avere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero
        if len(password) < 8:
            return False
        if not re.search(r'[A-Z]', password):
            return False
        if not re.search(r'[a-z]', password):
            return False
        if not re.search(r'\d', password):  # Verifica che la password contenga almeno un numero.
            return False
        return True

    @staticmethod
    def valida_nome_cognome(nome_cognome):
        # Il nome e il cognome devono contenere lettere (comprese lettere accentate), numeri, apostrofi, trattini e spazi
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

        # Controlla se tutti i campi sono presenti e non vuoti
        if not all([nome, cognome, email, password]):
            return jsonify({"successo": False, "messaggio": "Tutti i campi sono obbligatori!"}), 400

        # Verifica la validità dell'email
        if not cls.valida_email(email):
            return jsonify({"successo": False, "messaggio": "Email non valida!"}), 400

        # Verifica la validità del nome
        if not cls.valida_nome_cognome(nome):
            return jsonify({"successo": False,
                            "messaggio": "Nome non valido! Deve contenere solo lettere, apostrofi, trattini e spazi."}), 400

        # Verifica la validità del cognome
        if not cls.valida_nome_cognome(cognome):
            return jsonify({"successo": False,
                            "messaggio": "Cognome non valido! Deve contenere solo lettere, apostrofi, trattini e spazi."}), 400

        if not cls.valida_password(password):
            return jsonify({"successo": False,
                            "messaggio": "Password non valida! Deve avere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero."}), 400

        # Controlla se l'utente esiste già
        if utenti.find_one({"email": email}):
            return jsonify({"successo": False, "messaggio": "L'utente è già registrato!"}), 400

        # Crea un'istanza della classe Utente
        try:
            utente = cls(
                nome=nome,
                cognome=cognome,
                email=email,
                password=password
            )

            utenti.insert_one(utente.to_json())
        except Exception as e:
            return jsonify(
                {"successo": False, "messaggio": f"Errore durante la registrazione dell'utente: {str(e)}"}), 500

        return jsonify({"successo": True, "messaggio": "Utente registrato con successo!"}), 201
