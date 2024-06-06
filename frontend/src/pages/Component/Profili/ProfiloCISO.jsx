import { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Avatar, Button, TextField, Grid, Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SegnalazioneCISO from "../Segnalazioni/SegnalazioneCISO.jsx";

export default function ProfiloCISO(props) {
  const navigate = useNavigate();
  const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
  const [password, setPassword] = useState('');
  const [confermaPassword, setConfermaPassword] = useState('');
  const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '' });
  const [aggiungiLicenzaVisibile, setAggiungiLicenzaVisibile] = useState(false);
  const [segnalazioniVisibile, setSegnalazioniVisibile] = useState(false);
  const [file, setFile] = useState(null); // Stato per gestire il file caricato

  useEffect(() => {
    const fetchProfilo = async () => {
      const token = props.token;

      if (!token) {
        console.error("Token non disponibile");
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/profilo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        setProfilo(data);
      } catch (error) {
        console.error("Errore durante il recupero del profilo:", error);
      }
    };

    fetchProfilo();
  }, [props.token]);

  const toggleSegnalazioniVisibile = () => {
    setSegnalazioniVisibile(!segnalazioniVisibile);
    setModificaProfiloVisibile(false);
    setAggiungiLicenzaVisibile(false);
  };

  const toggleAggiungiLicenza = () => {
    setAggiungiLicenzaVisibile(!aggiungiLicenzaVisibile);
    setModificaProfiloVisibile(false);
    setSegnalazioniVisibile(false);
  };

  const toggleModificaProfilo = () => {
    setModificaProfiloVisibile(!modificaProfiloVisibile);
    setAggiungiLicenzaVisibile(false);
    setSegnalazioniVisibile(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfermaPasswordChange = (event) => {
    setConfermaPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password !== confermaPassword) {
      alert("Le password non corrispondono!");
      return;
    }
    navigate(0);
    // Add logic to submit profile changes
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Nessun file selezionato!");
      return;
    }else{
      
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${props.token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Errore: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Errore durante il caricamento del file:", error);
    }
  };

  ProfiloCISO.propTypes = {
    token: PropTypes.string.isRequired
  };

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 4, mx: 5 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                sx={{ width: 150, height: 150, mx: 'auto', my: 2 }}
              />
              <Typography variant="h5" sx={{ mb: 2 }}>
                Bentornato <strong>{profilo.nome}</strong>
              </Typography>
              <Typography variant="subtitle1">{profilo.ruolo}</Typography>
              <Box sx={{ mt: 5 }}>
                <Button variant="contained" color="warning" onClick={toggleSegnalazioniVisibile} sx={{ mb: 2 }}>
                  Segnalazioni
                </Button>
                <Button variant="contained" color="warning" onClick={toggleModificaProfilo} sx={{ mb: 2 }}>
                  Modifica profilo
                </Button>
                <Button variant="contained" color="warning" onClick={toggleAggiungiLicenza}>
                  Titolo di licenza
                </Button>
              </Box>
            </CardContent>
            <Avatar
              src="/logo.png"
              alt="logo"
              sx={{ width: 50, height: 50, mx: 'auto', my: 2 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Nome</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1" color="text.secondary">{profilo.nome}</Typography>
                </Grid>
                <Grid item xs={12}><hr /></Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Cognome</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1" color="text.secondary">{profilo.cognome}</Typography>
                </Grid>
                <Grid item xs={12}><hr /></Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Email</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1" color="text.secondary">{profilo.email}</Typography>
                </Grid>
                <Grid item xs={12}><hr /></Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Ruolo</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1" color="text.secondary">{profilo.ruolo}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid container>
            <Grid item xs={12}>
              <Card sx={{ mb: 4 }}>
                <CardContent >
                  {modificaProfiloVisibile && (
                    <Box>
                      <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 3 }}
                        onChange={handlePasswordChange}
                      />
                      <TextField
                        label="Conferma Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 3 }}
                        onChange={handleConfermaPasswordChange}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="secondary" onClick={toggleModificaProfilo} sx={{ mr: 2 }}>
                          Annulla
                        </Button>
                        <Button variant="contained" color="success" onClick={handleSubmit}>
                          Conferma modifiche
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {segnalazioniVisibile && <SegnalazioneCISO token={props.token} />}

                  {aggiungiLicenzaVisibile && (
                    <Box>

                      <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'block', marginBottom: '16px' }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="secondary" onClick={toggleAggiungiLicenza} sx={{ mr: 2 }}>
                          Annulla
                        </Button>
                        <Button variant="contained" color="success" onClick={handleFileUpload}>
                          Carica Licenza
                        </Button>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
