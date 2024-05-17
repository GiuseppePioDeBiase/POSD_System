from flask import Flask, jsonify
import utils

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/api/posd-knowledge-base')
def get_posd_knowledge_base():
    connessione = utils.getConnssione()
    table = connessione.execute('SELECT * FROM GDPR_Patterns').fetchall()
    connessione.close()

    results = utils.process_query_results(table)
    return jsonify(results)

@app.route('/api/posd-knowledge-base/strategies=<string:strategies>', methods=['GET'])
def get_article_strategies(strategies):
    connessione = utils.getConnssione()
    query = 'SELECT * FROM GDPR_Patterns WHERE Strategies LIKE  ?'
    table = connessione.execute(query, (f'%{strategies}%',)).fetchall()
    connessione.close()

    results = utils.process_query_results(table)

    return jsonify(results)

if __name__ == '__main__':
    app.run()
