from flask import Flask, jsonify
from flask_cors import CORS
import urllib.parse
from entity.Pattern import Pattern
from entity.PrivacyByDesign import PrivacyByDesign
from datetime import datetime
import platform
import socket

app = Flask(__name__)
CORS(app) # Visibilità API

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

if __name__ == '__main__':
    app.run()
