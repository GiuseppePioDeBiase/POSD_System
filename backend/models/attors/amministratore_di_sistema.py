from backend.models.attors.utente import Utente
from backend.models.attors.ruolo import Ruolo


class AmministratoreDiSistema(Utente):
    def __init__(self, nome, cognome, email, password):
        super().__init__(nome, cognome, email, password, ruolo=Ruolo.AMMINISTRATORE_DI_SISTEMA)