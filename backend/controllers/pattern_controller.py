from flask import Blueprint
from backend.models.pkb.pattern import Pattern
import urllib.parse

pattern_bp = Blueprint('pattern_bp', __name__)


@pattern_bp.route('/api/pattern/privacybydesign=<string:privacybydesign>', methods=['GET'])
def privacy_by_design(privacybydesign):
    return Pattern.get_pattern_by_privacy_by_design(urllib.parse.unquote(privacybydesign))

@pattern_bp.route('/api/pattern', methods=['GET'])
def get_all_patterns():
    return Pattern.get_all_patterns()
