from flask import Blueprint

# Importa i blueprint dei vari controller
from .feedback_routes import feedback_bp
from .pattern_routes import pattern_bp
from .privacy_by_design_routes import privacy_by_design_bp
from .segnalazione_routes import segnalazione_bp
from .utente_routes import utente_bp
from .amministratore_di_sistema_routes import amministratore_bp
from .ciso_routes import ciso_bp

# Crea il blueprint principale
routes = Blueprint('routes', __name__)

# Registra i blueprint dei vari controller
routes.register_blueprint(feedback_bp)
routes.register_blueprint(pattern_bp)
routes.register_blueprint(privacy_by_design_bp)
routes.register_blueprint(segnalazione_bp)
routes.register_blueprint(utente_bp)
routes.register_blueprint(amministratore_bp)
routes.register_blueprint(ciso_bp)
