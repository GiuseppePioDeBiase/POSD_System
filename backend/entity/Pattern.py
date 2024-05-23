from flask import jsonify
from backend.db import conn_db

# Connessione al database MongoDB
db = conn_db()
patternCollection = db['Pattern']  # Collezione Pattern

class Pattern:
    def __init__(self, id, pattern_name, strategies, description, context, mvc_placement,
                 iso_phase, gdpr_compliance, privacy_by_design, owasp_categories,
                 cwe_top_25, examples):
        self.id = id
        self.pattern_name = pattern_name
        self.strategies = strategies
        self.description = description
        self.context = context
        self.mvc_placement = mvc_placement
        self.iso_phase = iso_phase
        self.gdpr_compliance = gdpr_compliance
        self.privacy_by_design = privacy_by_design
        self.owasp_categories = owasp_categories
        self.cwe_top_25 = cwe_top_25
        self.examples = examples

    @staticmethod
    def getPatternStrategies(strategies):
        query = {"Strategies": {"$regex": strategies, "$options": "i"}}
        collection = patternCollection.find(query, {'_id': False})
        return jsonify(list(collection))

    @staticmethod
    def getPatternByPrivacyByDesign(privacybydesign):
        query = {"Privacy By Design Principles": {"$regex": privacybydesign, "$options": "i"}}
        collection = patternCollection.find(query, {'_id': False})
        return jsonify(list(collection))