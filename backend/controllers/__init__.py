from flask import Blueprint

# Importa i blueprint dei vari controller
from .feedback_controller import feedback_bp
from .pattern_controller import pattern_bp
from .privacy_by_design_controller import privacy_by_design_bp
from .segnalazione_controller import segnalazione_bp
from .utente_controller import utente_bp
from .amministratore_di_sistema_controller import amministratore_bp

# Crea il blueprint principale
controllers_bp = Blueprint('controllers', __name__)

# Registra i blueprint dei vari controller
controllers_bp.register_blueprint(feedback_bp)
controllers_bp.register_blueprint(pattern_bp)
controllers_bp.register_blueprint(privacy_by_design_bp)
controllers_bp.register_blueprint(segnalazione_bp)
controllers_bp.register_blueprint(utente_bp)
controllers_bp.register_blueprint(amministratore_bp)
