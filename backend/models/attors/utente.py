import base64
from datetime import datetime, timedelta, timezone
from bson import Binary
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies
from flask import request, jsonify, json
from pymongo.errors import PyMongoError
from werkzeug.security import generate_password_hash, check_password_hash
from backend.config.db import conn_db
import regex
from backend.models.attors.ruolo import Ruolo

db = conn_db()  # Connessione al database MongoDB
utenti = db['Utenti']  # Nome della collezione
no_data = "Nessun dato fornito!"


class Utente:
    def __init__(self, nome, cognome, email, password, genere, ruolo):
        self.nome = nome
        self.cognome = cognome
        self.email = email
        self.password = generate_password_hash(password)  # Hash della password per la sicurezza
        self.genere = genere
        self.ruolo = ruolo

    def to_json(self):
        return {
            "nome": self.nome,
            "cognome": self.cognome,
            "email": self.email,
            "password": self.password,
            "genere": self.genere,
            "ruolo": self.ruolo
        }

    @staticmethod
    def valida_email(email):
        regex_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return regex.match(regex_pattern, email) is not None

    @staticmethod
    def valida_password(password):
        if len(password) < 8:
            return False
        if not regex.search(r'[A-Z]', password):
            return False
        if not regex.search(r'[a-z]', password):
            return False
        if not regex.search(r'\d', password):
            return False
        return True

    @staticmethod
    def valida_nome_cognome(nome_cognome):
        regex_pattern = r"^[\p{L}\p{M}' -]+$"
        return regex.fullmatch(regex_pattern, nome_cognome) is not None

    @classmethod
    def registrati(cls):
        dati = request.json
        if not dati:
            return jsonify({"successo": False, "messaggio": no_data}), 400

        nome = dati.get('nome')
        cognome = dati.get('cognome')
        email = dati.get('email')
        password = dati.get('password')
        genere = dati.get('genere')

        if not dati.get('ruolo'):
            ruolo = Ruolo.UTENTE.value
        else:
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
            from backend.models.attors.ciso import Ciso
            if ruolo == Ruolo.CISO.value:
                utente = Ciso(nome, cognome, email, password, genere)
            elif ruolo == Ruolo.AMMINISTRATORE_DI_SISTEMA.value:
                from backend.models.attors.amministratore_di_sistema import AmministratoreDiSistema
                utente = AmministratoreDiSistema(nome, cognome, email, password, genere)
            elif ruolo == Ruolo.UTENTE.value:
                utente = cls(nome, cognome, email, password, genere, ruolo=Ruolo.UTENTE.value)
            else:
                return jsonify({"successo": False, "messaggio": f"Ruolo: {ruolo} non valido!"}), 400
            utenti.insert_one(utente.to_json())
        except Exception as e:
            return jsonify(
                {"successo": False, "messaggio": f"Errore durante la registrazione dell'utente: {str(e)}"}), 500

        return jsonify({
            "successo": True,
            "messaggio": "Utente registrato con successo!",
            "ruolo": utente.ruolo,
            "token": create_access_token(identity=email)
        }), 200

    @classmethod
    def login(cls):
        dati = request.json
        if dati is None or 'email' not in dati or 'password' not in dati:
            return jsonify({"successo": False, "messaggio": no_data}), 400

        email = dati.get('email')
        password = dati.get('password')

        if not email.strip() and not password.strip():
            return jsonify({"successo": False, "messaggio": no_data}), 400

        if not email.strip():
            return jsonify({"successo": False, "messaggio": "L'email è obbligatoria!"}), 400

        if not password.strip():
            return jsonify({"successo": False, "messaggio": "La password è obbligatoria!"}), 400

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
        response = jsonify({"msg": "GestioneLogout eseguito con successo!"})
        unset_jwt_cookies(response)
        return response, 200

    @classmethod
    def get_data_user(cls, mail):
        if not mail:
            return jsonify({"successo": False, "messaggio": "Email non fornita!"}), 400

        utente = utenti.find_one({"email": mail})
        if not utente:
            return jsonify({"successo": False, "messaggio": "Utente non trovato!"}), 404

        foto_profilo_base64 = base64.b64encode(utente['foto_profilo']).decode('utf-8') \
            if 'foto_profilo' in utente else None

        return jsonify({
            "successo": True,
            "nome": utente.get('nome'),
            "cognome": utente.get('cognome'),
            "email": utente.get('email'),
            "ruolo": utente.get('ruolo'),
            "genere": utente.get('genere'),
            "foto_profilo": foto_profilo_base64
        }), 200

    @classmethod
    def carica_foto(cls, mail):
        if 'foto' not in request.files:
            return jsonify({"successo": False, "messaggio": "Nessun file fornito!"}), 400

        foto = request.files['foto']
        if foto.filename == '':
            return jsonify({"successo": False, "messaggio": "Nessun file selezionato!"}), 400

        # Leggi il file come binario
        foto_binario = foto.read()

        # Salva il binario nel database MongoDB
        utenti.update_one({"email": mail}, {"$set": {"foto_profilo": Binary(foto_binario)}})

        return jsonify({"successo": True, "messaggio": "Foto caricata con successo!"}), 200

    @classmethod
    def storico_utente(cls, mail):
        try:
            utente = utenti.find_one({"email": mail})
            if not utente or utente['ruolo'] != Ruolo.UTENTE.value:
                return jsonify({"successo": False,
                                "messaggio": "L'utente non esiste o non ha i privilegi necessari per visualizzare le "
                                             "segnalazioni."}), 403

            from backend.models.message_reporting.segnalazione import segnalazioniAccettate
            accettate = list(segnalazioniAccettate.find({"mail": mail},
                                                        {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True,
                                                         "_id": False, "stato": True, "id_ciso": True}))
            from backend.models.message_reporting.segnalazione import segnalazioniRifiutate
            rifiutate = list(segnalazioniRifiutate.find({"mail": mail},
                                                        {'oggetto': True, 'messaggio': True, 'data_ora_modifica': True,
                                                         "_id": False, "stato": True, "id_ciso": True}))
        except PyMongoError as e:
            return jsonify({"error": f"Database error: {str(e)}"}), 500

        storico = cls.convert_object_ids(accettate + rifiutate, "id_ciso")
        return jsonify(storico)

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

    @staticmethod
    def convert_object_ids(collection, id_field="id_ciso"):
        result = []
        for document in collection:
            if id_field in document:
                document[id_field] = str(document[id_field])
            result.append(document)
        return result
