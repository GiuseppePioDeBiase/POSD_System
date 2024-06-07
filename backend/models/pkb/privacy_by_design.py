from flask import jsonify
from backend.config.db import conn_db

# Connessione al database MongoDB
db = conn_db()
privacyByDesignCollection = db['PrivacyByDesign']  # Collezione PrivacyByDesign

class privacy_by_design:
    def __init__(self, id, title, description):
        self.id = id
        self.title = title
        self.description = description

    @classmethod
    def get_privacy_by_design(cls):
        query_result = privacyByDesignCollection.find({}, {'_id': False})
        return jsonify(list(query_result))
