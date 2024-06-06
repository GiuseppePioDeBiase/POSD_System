import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
} from '@mui/material';

const SceltaSegnalazione = ({ token }) => {
  const subject = "Segnalazione Numero: #";
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const [registrazioneSuccess, setRegistrazioneSuccess] = useState(false);
  const [registrazioneForm, setRegistrazioneForm] = useState({ nome: '', cognome: '', ruolo: 'CISO', password: '' });

  const validateForm = () => {
    if (message.trim() === '') {
      setStatus('Il messaggio non può essere vuoto!');
      return false;
    }
    setStatus(null);
    return true;
  };

  const registrami = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/api/registrazione', registrazioneForm)
      .then(() => {
        setRegistrazioneSuccess(true);
        setRegistrazioneForm({ nome: '', cognome: '', ruolo: 'CISO', password: '' });
        setError('');
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.messaggio);
          console.log(error.response);
        }
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setRegistrazioneForm((prevNote) => ({ ...prevNote, [name]: value }));
  };

  return (

    <Box sx={{ display: 'flex', justifyContent: 'space-between' ,backgroundColor: 'white', mb: 3}}>
      <Box>
        <Typography variant="h6">Dati Utente</Typography>
        <TextField
          onChange={handleChange}
          autoComplete="off"
          type="text"
          label="Nome"
          placeholder="Inserisci nome..."
          fullWidth
          name="nome"
          value={registrazioneForm.nome}
          sx={{ mb: 1 }}
        />
        <TextField
          onChange={handleChange}
          autoComplete="off"
          type="text"
          label="Cognome"
          placeholder="Inserisci cognome..."
          fullWidth
          name="cognome"
          value={registrazioneForm.cognome}
          sx={{ mb: 1 }}
        />
        <Select
          onChange={handleChange}
          label="Ruolo"
          fullWidth
          name="ruolo"
          value={registrazioneForm.ruolo}
          sx={{ mb: 1 }}
        >
          <MenuItem value="CISO">CISO</MenuItem>
          <MenuItem value="Amministratore di sistema">Amministratore di sistema</MenuItem>
        </Select>
        {registrazioneSuccess && <Typography variant="body2" sx={{ color: 'success.main' }}>Registrazione completata con successo!</Typography>}
      </Box>
      <Box>
        <Typography variant="h6">Altri Dati</Typography>
        <TextField
          onChange={handleChange}
          autoComplete="off"
          type="password"
          label="Password"
          placeholder="Inserisci password..."
          fullWidth
          name="password"
          value={registrazioneForm.password}
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" sx={{ color: 'error.main', mb: 1 }}>{error}</Typography>
      </Box>
      <Button variant="contained" onClick={registrami}>Conferma Registrazione</Button>
    </Box>
  );
};

SceltaSegnalazione.propTypes = {

  token: PropTypes.string.isRequired
};

export default SceltaSegnalazione;
