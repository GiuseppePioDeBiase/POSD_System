from flask import Blueprint
from backend.models.privacy_by_design import PrivacyByDesign

privacy_by_design_bp = Blueprint('privacy_by_design_bp', __name__)


@privacy_by_design_bp.route('/api/privacybydesign', methods=['GET'])
def get_privacy_by_design():
    return PrivacyByDesign.getPrivacyByDesign()
