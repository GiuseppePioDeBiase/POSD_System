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
        regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$'
        return re.match(regex, password) is not None

    @staticmethod
    def valida_nome_cognome(nome_cognome):
        # Il nome e il cognome devono contenere solo lettere (comprese lettere accentate), apostrofi, trattini e spazi
        regex = r"^[a-zA-Zà-ÿÀ-Ÿ' -]+$"
        return re.match(regex, nome_cognome) is not None

    @classmethod
    def registrati(cls):
        dati = request.json
        if not dati:
            return jsonify({"errore": "Nessun dato fornito!"}), 400

        nome = dati.get('nome')
        cognome = dati.get('cognome')
        email = dati.get('email')
        password = dati.get('password')

        # Controlla se tutti i campi sono presenti e non vuoti
        if not all([nome, cognome, email, password]):
            return jsonify({"errore": "Tutti i campi sono obbligatori"}), 400

        # Verifica la validità dell'email
        if not cls.valida_email(email):
            return jsonify({"errore": "Email non valida!"}), 400

        # Verifica la validità del nome
        if not cls.valida_nome_cognome(nome):
            return jsonify({"errore": "Nome non valido! Deve contenere solo lettere, apostrofi, trattini e spazi."}), 400

        # Verifica la validità del cognome
        if not cls.valida_nome_cognome(cognome):
            return jsonify({"errore": "Cognome non valido! Deve contenere solo lettere, apostrofi, trattini e spazi."}), 400

        # Controlla se l'utente esiste già
        if utenti.find_one({"email": email}):
            return jsonify({"errore": "L'utente è già registrato!"}), 400

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
            return jsonify({"errore": f"Errore durante la registrazione dell'utente: {str(e)}"}), 500

        return jsonify({"messaggio": "Utente registrato con successo!"}), 201