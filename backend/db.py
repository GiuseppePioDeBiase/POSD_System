from pymongo import MongoClient
from flask import jsonify

# Variabili di inizializzazione di MongoDB
client = MongoClient('localhost', 27017)
db = client['GDPR_Patterns']  # Nome del database
patternCollection = db['Pattern']  # Uso della collezione Pattern


def get_posd_knowledge_base():
    collection = (patternCollection.find({}, {'_id': False}))
    return jsonify(list(collection))

def get_article_strategies(strategies):
    query = {"Strategies": {"$regex": strategies, "$options": "i"}}  # Ricerca regex case-insensitive
    collection = (patternCollection.find(query, {'_id': False}))
    return jsonify(list(collection))

def get_unique_PrivacyByDesign():
    unique_principles = {}
    all_documents = patternCollection.find({}, {'_id': False, 'Privacy By Design Principles': True})

    for document in all_documents:
        principles = document['Privacy By Design Principles'].split(', ')
        for principle in principles:
            unique_principles[principle] = True

    return jsonify(list(unique_principles.keys()))
