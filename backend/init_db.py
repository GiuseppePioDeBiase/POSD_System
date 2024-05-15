# Inizializzo e creo il database del GDPR

import sqlite3

connesione = sqlite3.connect('POSD_Knowledge_Base.db')
with open('POSD_Knowledge_Base.sql') as f:
    connesione.executescript(f.read())
connesione.commit()
connesione.close()