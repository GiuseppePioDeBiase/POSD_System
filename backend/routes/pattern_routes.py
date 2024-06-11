from flask import Blueprint
from backend.models.pkb.pattern import Pattern

pattern_bp = Blueprint('pattern_bp', __name__)


@pattern_bp.route('/api/pattern', methods=['GET'])
def get_all_patterns():
    return Pattern.get_all_patterns()
