from flask import Flask, jsonify
from flask_cors import CORS
from entity.Utente import Utente
from entity.Feedback import Feedback
from entity.Pattern import Pattern
from entity.PrivacyByDesign import PrivacyByDesign
from datetime import datetime
import urllib.parse
import platform
import socket

app = Flask(__name__)
CORS(app)

@app.route('/')
def start():
    # Get the current date and time
    now = datetime.now()
    current_time = now.strftime("%A %Y-%m-%d - %H:%M:%S")

    # Get the local network IP
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)

    # Collect system information
    system_info = {
        "python_version": platform.python_version(),
        "system": platform.system(),
        "node": platform.node(),
        "release": platform.release(),
        "version": platform.version(),
        "machine": platform.machine(),
        "processor": platform.processor(),
        "local_ip": local_ip  # Include the local IP address
    }

    # Create a response with the collected information
    response = {
        "message": "Start session",
        "current_time": current_time,
        "system_info": system_info
    }

    return jsonify(response)

@app.route('/api/privacybydesign', methods=['GET'])
def homePage():
    return PrivacyByDesign.getPrivacyByDesign()

@app.route('/api/pattern/strategies=<string:strategies>', methods=['GET'])
def patternsByStrategies(strategies):
    return Pattern.getPatternStrategies(strategies)

@app.route('/api/pattern/privacybydesign=<string:privacybydesign>', methods=['GET'])
def privacyByDesign(privacybydesign):
    return Pattern.getPatternByPrivacyByDesign(urllib.parse.unquote(privacybydesign))

@app.route('/api/feedback', methods=['POST'])
def insertFeedback():
    return Feedback.insertFeedback()

@app.route('/api/register', methods=['POST'])
def registerUser():
    return Utente.registrati()

@app.route('/api/login', methods=['POST'])
def loginUser():
    return Utente.login()

@app.route('/api/profilo', methods=['GET'])
def profilo():
    return Utente.getNomeCognomeEmail()

@app.route('/api/pattern', methods=['GET'])
def getAllPatterns():
    return Pattern.getAllPatterns()

@app.route('/api/pattern/names', methods=['GET'])
def getPatternNames():
    return Pattern.getPatternByName()

if __name__ == '__main__':
    app.run()
