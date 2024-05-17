import sqlite3, os

def getConnssione():
    # Path del database
    db_path = os.path.join(os.path.dirname(__file__),'db','POSD_Knowledge_Base.db') #os.path.join --> percorso di progetto
    # Connessione al database
    connessione = sqlite3.connect(db_path)
    connessione.row_factory = sqlite3.Row
    return connessione
def process_query_results(table):
    results = []
    for row in table:
        result_row = [value for value in row]
        results.append(result_row)
    return results
