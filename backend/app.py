from flask import Flask
import db

app = Flask(__name__)

@app.route('/')
def homePage():
    return db.getUniquePrivacyByDesign()

@app.route('/api/posd-knowledge-base')
def showDB():
    return db.getPosdKnowledgeBase()

@app.route('/api/posd-knowledge-base/strategies=<string:strategies>', methods=['GET'])
def patternsByStrategies(strategies):
    return db.getArticleStrategies(strategies)

if __name__ == '__main__':
    app.run()
    