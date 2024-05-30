from flask import jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity
from datetime import datetime, timezone, timedelta
from backend.config import create_app
import urllib.parse
import platform
import socket
import json

app = create_app()

@app.route('/')
def start():
    now = datetime.now()
    current_time = now.strftime("%A %Y-%m-%d - %H:%M:%S")

    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)

    system_info = {
        "python_version": platform.python_version(),
        "system": platform.system(),
        "node": platform.node(),
        "release": platform.release(),
        "version": platform.version(),
        "machine": platform.machine(),
        "processor": platform.processor(),
        "local_ip": local_ip
    }

    response = {
        "message": "Start session",
        "current_time": current_time,
        "system_info": system_info
    }

    return jsonify(response)

@app.route('/api/privacybydesign', methods=['GET'])
def homePage():
    from entity.PrivacyByDesign import PrivacyByDesign
    return PrivacyByDesign.getPrivacyByDesign()

@app.route('/api/pattern/strategies=<string:strategies>', methods=['GET'])
def patternsByStrategies(strategies):
    from entity.Pattern import Pattern
    return Pattern.getPatternStrategies(strategies)

@app.route('/api/pattern/privacybydesign=<string:privacybydesign>', methods=['GET'])
def privacyByDesign(privacybydesign):
    from entity.Pattern import Pattern
    return Pattern.getPatternByPrivacyByDesign(urllib.parse.unquote(privacybydesign))

@app.route('/api/feedback', methods=['POST'])
def insertFeedback():
    from entity.Feedback import Feedback
    return Feedback.insertFeedback()

@app.route('/api/register', methods=['POST'])
def registerUser():
    from entity.Utente import Utente
    return Utente.registrati()

@app.route('/api/login', methods=['POST'])
def loginUser():
    from entity.Utente import Utente
    return Utente.login()

@app.route('/api/profilo', methods=['GET'])
def profilo():
    from entity.Utente import Utente
    return Utente.getNomeCognomeEmail()

@app.route('/api/pattern', methods=['GET'])
def getAllPatterns():
    from entity.Pattern import Pattern
    return Pattern.getAllPatterns()

@app.route('/api/pattern/mvc=<string:mvc>', methods=['GET'])
def getByMVC(mvc):
    from entity.Pattern import Pattern
    return Pattern.getPatternByCollocazioneMVC(mvc)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"] # Questa linea estrae il timestamp di scadenza (exp) dal token JWT corrente.
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30)) # Questo calcola un timestamp che rappresenta 30 minuti nel futuro.
        if target_timestamp > exp_timestamp: # Se il timestamp calcolato è maggiore del timestamp di scadenza del token JWT, significa che il token scadrà entro i prossimi 30 minuti.
            access_token = create_access_token(identity=get_jwt_identity()) # Se il token è vicino alla scadenza, viene creato un nuovo token JWT per la stessa identità dell'utente.
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)  # Questa parte del codice controlla se i dati della risposta sono un dizionario (JSON). Se lo sono, aggiunge il nuovo token JWT ai dati della risposta e aggiorna il corpo della risposta.
        return response
    except (RuntimeError, KeyError):
        return response

if __name__ == '__main__':
    app.run()
