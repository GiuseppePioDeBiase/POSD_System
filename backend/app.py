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

    results = []
    for row in table:
        result_row = [value for value in row]
        results.append(result_row)

    # Restituire i risultati come JSON
    return jsonify(results)

if __name__ == '__main__':
    app.run()