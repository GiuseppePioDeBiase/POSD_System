from flask import Flask
from flask_cors import CORS
import urllib.parse
from entity.Pattern import Pattern
from entity.PrivacyByDesign import PrivacyByDesign

app = Flask(__name__)
CORS(app) # Visibilità API

@app.route('/', methods=['GET'])
def start():
    return 'Bella brò'

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
