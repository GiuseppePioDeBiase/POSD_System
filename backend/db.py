from pymongo import MongoClient

# Variabili di inizializzazione di MongoDB
client = MongoClient('localhost', 27017)
db = client['GDPR_Patterns']  # Nome del database
patternCollection = db['Pattern']  # Uso della collezione Pattern

__all__ = ['patternCollection']