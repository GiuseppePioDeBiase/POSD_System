from flask import Flask, request
import db

app = Flask(__name__)

@app.route('/')
def homePage():
    return db.get_unique_PrivacyByDesign()

@app.route('/api/posd-knowledge-base')
def showDB():
    return db.get_posd_knowledge_base()

@app.route('/api/posd-knowledge-base/strategies=<string:strategies>', methods=['GET'])
def patternsByStrategies(strategies):
    return db.get_article_strategies(strategies)

if __name__ == '__main__':
    app.run()
