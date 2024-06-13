from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.message_reporting.feedback import Feedback

feedback_bp = Blueprint('feedback_bp', __name__)


@feedback_bp.route('/api/feedback', methods=['POST'])
@jwt_required()
def add_feedback():
    return Feedback.insertFeedback(mail=get_jwt_identity())
