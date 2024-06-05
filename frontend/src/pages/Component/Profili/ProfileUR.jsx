import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Button, Avatar } from '@mui/material';

export default function ProfiloUR({ token }) {
  const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
  const [password, setPassword] = useState('');
  const [confermaPassword, setConfermaPassword] = useState('');
  const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfilo = async () => {
      try {
        if (!token) {
          throw new Error("Token non disponibile");
        }

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
        setError('Errore durante il recupero del profilo');
      }
    };

    fetchProfilo();
  }, [token]);

  const toggleModificaProfilo = () => {
    setModificaProfiloVisibile(!modificaProfiloVisibile);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfermaPasswordChange = (event) => {
    setConfermaPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password !== confermaPassword) {
      setError("Le password non corrispondono!");

    }

    // Qui inserisci la logica per inviare le modifiche del profilo
  };

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item lg={4} xs={12}>
          <Card sx={{ mb: 4, mx: 5 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" sx={{ width: 150, height: 150, mx: 'auto', mb: 4 }} />
              <Typography variant="h6" gutterBottom>Bentornato</Typography>
              <Typography variant="h4" gutterBottom>{profilo.nome}</Typography>
              <Typography variant="subtitle1">{profilo.ruolo}</Typography>
              <Button variant="contained" color="warning" sx={{ mt: 3 }} onClick={toggleModificaProfilo}>Modifica profilo</Button>
            </CardContent>
            <CardMedia
              component="img"
              image="/logo.png"
              alt="logo"
              sx={{ width: 50, mx: 'auto', mb: 4 }}
            />
          </Card>
        </Grid>
        <Grid item lg={8} xs={12}>
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

          {modificaProfiloVisibile && (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6">Modifica Profilo</Typography>
                <TextField
                  label="Password"
                  type="password"
                  placeholder="Modifica password..."
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handlePasswordChange}
                />
                <TextField
                  label="Conferma Password"
                  type="password"
                  placeholder="Conferma password..."
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleConfermaPasswordChange}
                />
                <div>
                  <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={toggleModificaProfilo}>
                    Annulla
                  </Button>
                  <Button variant="contained" color="success" onClick={handleSubmit}>
                    Conferma modifiche
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

ProfiloUR.propTypes = {
  token: PropTypes.string.isRequired
};
