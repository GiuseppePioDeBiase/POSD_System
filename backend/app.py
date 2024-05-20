from flask import Flask
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def homePage():
    return db.getPrivacyByDesign()

@app.route('/api/posd-knowledge-base')
def showDB():
    return db.getPosdKnowledgeBase()

@app.route('/api/posd-knowledge-base/strategies=<string:strategies>', methods=['GET'])
def patternsByStrategies(strategies):
    return db.getArticleStrategies(strategies)

if __name__ == '__main__':
    app.run()
