from pymongo import MongoClient
from flask import jsonify
from bson.objectid import ObjectId

# Variabili di inizializzazione di MongoDB
client = MongoClient('localhost', 27017)
db = client['GDPR_Patterns']  # Nome del database
patternCollection = db['Pattern']  # Uso della collezione Pattern
privacyByDesign = db['PrivacyByDesign']

def getPosdKnowledgeBase():
    collection = (patternCollection.find({}, {'_id': False}))
    return jsonify(list(collection))

def getArticleStrategies(strategies):
    query = {"Strategies": {"$regex": strategies, "$options": "i"}}  # Ricerca regex case-insensitive
    collection = (patternCollection.find(query, {'_id': False}))
    return jsonify(list(collection))

def getPrivacyByDesign():
    collection = (privacyByDesign.find({}, {'_id': False}))
    return jsonify(list(collection))