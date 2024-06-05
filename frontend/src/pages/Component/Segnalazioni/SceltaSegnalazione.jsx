import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, TextField, TextareaAutosize } from '@mui/material';

const SceltaSegnalazione = ({ messaggio, id }) => {
  const subject = "Segnalazione Numero: #" + id;
  const [message, setMessage] = useState(messaggio);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (message.trim() === '') {
      setStatus('Il messaggio non può essere vuoto!');
      return false;
    }
    setStatus(null);
    return true;
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/updatesegnalazione', {
        _id: id,
        messaggio: message,
        stato: true
      });
      setStatus(response.data.messaggio);
      navigate(0);
    } catch (error) {
      if (error.response && error.response.data.messaggio) {
        setStatus(error.response.data.messaggio);
      }
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/updatesegnalazione', {
        _id: id,
        messaggio: message,
        stato: false
      });
      setStatus(response.data.messaggio);
    } catch (error) {
      if (error.response && error.response.data.messaggio) {
        setStatus(error.response.data.messaggio);
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', boxShadow: 3, borderRadius: 2, p: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>Segnalazione</Typography>
      <form>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>Oggetto</Typography>
          <TextField
            type="text"
            id="subject"
            name="subject"
            value={subject}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            sx={{ mt: 1 }}
            required
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>Messaggio</Typography>
          <TextareaAutosize
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            minRows={8}
            style={{
              width: '100%',
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.23)',
              padding: 8,
              fontSize: 16,
              fontFamily: 'Roboto, sans-serif',
            }}
            required
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Button
              type="button"
              onClick={handleAccept}
              variant="contained"
              color="primary"
              sx={{ borderRadius: '50px', py: 1.5, px: 4, textTransform: 'none' }}
            >
              Accetta
            </Button>
            {status && <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>{status}</Typography>}
          </Box>
          <Box>
            <Button
              type="button"
              onClick={handleReject}
              variant="contained"
              color="secondary"
              sx={{ borderRadius: '50px', py: 1.5, px: 4, textTransform: 'none' }}
            >
              Rifiuta
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

SceltaSegnalazione.propTypes = {
  messaggio: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default SceltaSegnalazione;
