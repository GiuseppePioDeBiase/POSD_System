from flask import Flask
from flask_cors import CORS
import urllib.parse # Questo decodifica qualsiasi carattere codificato nel parametro URL.
import db

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def homePage():
    return db.getPrivacyByDesign()

@app.route('/api/pattern')
def showDB():
    return db.getPosdKnowledgeBase()

@app.route('/api/pattern/strategies=<string:strategies>', methods=['GET'])
def patternsByStrategies(strategies):
    return db.getArticleStrategies(strategies)

@app.route('/api/pattern/privacybydesign=<string:privacybydesign>', methods=['GET'])
def privacyByDesign(privacybydesign):
    decoded_privacybydesign = urllib.parse.unquote(privacybydesign)
    print(decoded_privacybydesign)  # Stampa il valore decodificato per il debug
    return db.getPatternByPrivacyByDesign(decoded_privacybydesign)

if __name__ == '__main__':
    app.run()
