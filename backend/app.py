from flask import Flask, jsonify
from db import patternCollection

app = Flask(__name__)

@app.route('/')
def hello_world():
    collection = list(patternCollection.find({}, {'_id': False, 'Pattern': True, 'Description Pattern': True}).limit(7))
    return jsonify(collection)

@app.route('/api/posd-knowledge-base')
def get_posd_knowledge_base():
    collection = list(patternCollection.find({}, {'_id': False}))
    return jsonify(collection) # da ordinare

@app.route('/api/posd-knowledge-base/strategies=<string:strategies>', methods=['GET'])
def get_article_strategies(strategies):
    query = {"Strategies": {"$regex": strategies, "$options": "i"}}  # Ricerca regex case-insensitive
    collection = list(patternCollection.find(query, {'_id': False}))
    return jsonify(collection) # da ordinare

if __name__ == '__main__':
    app.run()
