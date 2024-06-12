import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import SimpleTable from "../Componenti globali/SimpleTable.jsx";

const columns = [
  { width: 70, label: 'Seleziona', dataKey: 'checkbox' },
  { width: 220, label: 'Nome', dataKey: 'nome' },
  { width: 200, label: 'Cognome', dataKey: 'cognome' },
  { width: 300, label: 'Email', dataKey: 'email' },
  { width: 150, label: 'Ruolo', dataKey: 'ruolo' },
];

export default function ReactVirtualizedTable({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allutenti', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.utenti.map((user, index) => ({ ...user, id: index }))); // Ensure unique IDs
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleCheckboxChange = (id) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  const handleRemoveProfile = async () => {
    try {
      const user = users.find((u) => u.id === selectedRow);
      if (!user) {
        setMessage("Utente non trovato."); // Imposta il messaggio di errore
        return;
      }
      const response = await axios.delete(`http://localhost:5000/api/eliminautente=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter((u) => u.id !== selectedRow));
      setSelectedRow(null);
      setMessage(response.data.message); // Imposta il messaggio dal backend
    } catch (error) {
      setMessage(error.response?.data?.message || "Errore durante la rimozione dell'utente."); // Imposta il messaggio di errore dal backend
    }
  };

  const enhancedUsers = users.map(user => ({
    ...user,
    checkbox: (
      <Checkbox
        checked={selectedRow === user.id}
        onChange={() => handleCheckboxChange(user.id)}
      />
    )
  }));

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  return (
    <Paper >
      <SimpleTable columns={columns} rows={enhancedUsers} handleCellClick={null} />
      {selectedRow !== null && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveProfile}
            sx={{ mt: 2, mr: 2 }}
          >
            Rimuovi Profilo
          </Button>
          {message && <div>{message}</div>} {/* Visualizza il messaggio */}
        </>
      )}
    </Paper>
  );
}

ReactVirtualizedTable.propTypes = {
  token: PropTypes.string.isRequired
};
