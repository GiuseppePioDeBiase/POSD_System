from pymongo import MongoClient
from flask import jsonify
from bson.objectid import ObjectId

# Variabili di inizializzazione di MongoDB
client = MongoClient('localhost', 27017)
db = client['GDPR_Patterns']  # Nome del database
patternCollection = db['Pattern']  # Uso della collezione Pattern

def getPosdKnowledgeBase():
    collection = (patternCollection.find({}, {'_id': False}))
    return jsonify(list(collection))

def getArticleStrategies(strategies):
    query = {"Strategies": {"$regex": strategies, "$options": "i"}}  # Ricerca regex case-insensitive
    collection = (patternCollection.find(query, {'_id': False}))
    return jsonify(list(collection))

def getUniquePrivacyByDesign():
    unique_principles = {}
    all_documents = patternCollection.find({}, {'_id': True, 'Privacy By Design Principles': True})

    for document in all_documents:
        doc_id = str(document['_id'])
        principles = document['Privacy By Design Principles'].split(', ')
        for principle in principles:
            unique_principles[principle] = str(unique_principles.get(principle, ObjectId()))

    results = []
    for principle, unique_id in unique_principles.items():
        results.append({
            '_id': unique_id,
            'principle': principle
        })

    # Restituisce i risultati e imposta la politica CORS
    response = jsonify(results)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')

    return response
