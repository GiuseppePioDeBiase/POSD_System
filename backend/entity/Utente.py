from werkzeug.security import generate_password_hash
from pymongo import MongoClient
from flask import request, jsonify
import re

# Variabili di inizializzazione di MongoDB
conn = MongoClient('localhost', 27017)
db = conn['POSD_System']  # Nome del database
utenti = db['Utenti'] # Nome della collezione

class Utente:
    def __init__(self, id, nome, cognome, email, password):
        self.id = id
        self.nome = nome
        self.cognome = cognome
        self.email = email
        self.password = generate_password_hash(password)  # Hash della password per la sicurezza


    def to_json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "cognome": self.cognome,
            "email": self.email,
            "password": self.password
        }
def registrati():
    data = request.get_json()  # Ottieni i dati dal corpo della richiesta
    nome = data.get('nome')
    cognome = data.get('cognome')
    email = data.get('email')
    password = data.get('password')

    # Controlla se tutti i campi sono presenti
    if not nome or not cognome or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    # Verifica la validità dell'email
    if not valida_email(email):
        return jsonify({"error": "Invalid email address"}), 400

    # Verifica la validità della password
    if not valida_password(password):
        return jsonify({"error": "Password does not meet criteria"}), 400

    # Controlla se l'utente esiste già
    if utenti.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    # Genera ID per il nuovo utente
    ultimo_utente = utenti.find_one(sort=[("id", -1)])  # Trova l'utente con l'ID più alto
    if ultimo_utente:
        nuovo_id = ultimo_utente["id"] + 1  # Incrementa l'ID
    else:
        nuovo_id = 1  # Se non ci sono utenti, l'ID è 1

    # Crea un'istanza della classe Utente
    utente = Utente(nuovo_id, nome, cognome, email, password)
    utenti.insert_one(utente.to_json())  # Inserisci l'utente nel database
    return jsonify({"message": "Utente registrato con successo"}), 201

def valida_email(email):
    # Controllo basico di validità dell'email
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def valida_password(password):
    # La password deve avere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero
    if len(password) < 8:
        return "Password troppo corta"
    if not re.search(r"[A-Z]", password):
        return "La password deve contenere almeno una lettera maiuscola"
    if not re.search(r"[a-z]", password):
        return "La password deve contenere almeno una lettera minuscola"
    if not re.search(r"[0-9]", password):
        return "La password deve contenere almeno un numero"
    return password  # La password è valida


