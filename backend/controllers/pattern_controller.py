from flask import Blueprint
from backend.models.pattern import Pattern
import urllib.parse

pattern_bp = Blueprint('pattern_bp', __name__)

@pattern_bp.route('/api/pattern/strategies=<string:strategies>', methods=['GET'])
def patternsByStrategies(strategies):
    return Pattern.getPatternStrategies(strategies)

@pattern_bp.route('/api/pattern/privacybydesign=<string:privacybydesign>', methods=['GET'])
def privacyByDesign(privacybydesign):
    return Pattern.getPatternByPrivacyByDesign(urllib.parse.unquote(privacybydesign))

@pattern_bp.route('/api/pattern', methods=['GET'])
def getAllPatterns():
    return Pattern.getAllPatterns()

@pattern_bp.route('/api/pattern/mvc=<string:mvc>', methods=['GET'])
def getByMVC(mvc):
    return Pattern.getPatternByCollocazioneMVC(mvc)
