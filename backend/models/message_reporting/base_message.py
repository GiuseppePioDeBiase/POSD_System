import re
from datetime import datetime


class BaseMessage:
    def __init__(self, oggetto, messaggio, ip_pubblico):
        self.oggetto = oggetto
        self.messaggio = messaggio
        self.data_ora = datetime.now().strftime("%A %d-%m-%Y - %H:%M:%S")
        self.ip_pubblico = ip_pubblico

    def to_json(self):
        return {
            "oggetto": self.oggetto,
            "messaggio": self.messaggio,
            "data_ora": self.data_ora,
            "ip_pubblico": self.ip_pubblico
        }

    @classmethod
    def validate(cls, oggetto, messaggio):
        stringa_non_valida = re.compile(
            r'^\s*$'  # solo spazi bianchi
            r'|^(.)\1*$'  # singolo carattere ripetuto
            r'|^[0-9]+$'  # solo numeri
            r'|^[^\w\s]+$'  # solo caratteri speciali
            r'|^[^\w\s].*[^\w\s]$'  # inizia e termina con caratteri non alfanumerici o spazi
        )
        if stringa_non_valida.match(oggetto) or stringa_non_valida.match(messaggio):
            return False
        return True
