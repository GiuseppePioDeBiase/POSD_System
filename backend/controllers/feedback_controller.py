from flask import Blueprint
from backend.models.message_reporting import Feedback

feedback_bp = Blueprint('feedback_bp', __name__)


@feedback_bp.route('/api/feedback', methods=['POST'])
def add_feedback():
    return Feedback.insertFeedback()
