import { useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Avatar,
    MenuItem,
    Alert,
    Box
} from '@mui/material';
import SegnalazioneAS from '../Segnalazioni/SegnalazioneAS.jsx';
import UtentiRegistrati from './UtentiRegistrati.jsx'; // Import the new component

const ProfiloAS = ({ token }) => {
    const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
    const [aggiungiProfiloVisibile, setAggiungiProfiloVisibile] = useState(false);
    const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '' });
    const [modificaProfiloForm, setModificaProfiloForm] = useState({ nome: '', cognome: '', email: '', password: '' });
    const [registrazioneForm, setRegistrazioneForm] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        ruolo: 'CISO'
    });
    const [registrazioneSuccess, setRegistrazioneSuccess] = useState(false);
    const [error, setError] = useState('');
    const [segnalazioniVisibile, setSegnalazioniVisibile] = useState(false);
    const [utentiVisibile, setUtentiVisibile] = useState(false); // State for displaying user list

    const toggleModificaProfilo = () => {
        setModificaProfiloVisibile(!modificaProfiloVisibile);
        setAggiungiProfiloVisibile(false);
        setSegnalazioniVisibile(false);
        setUtentiVisibile(false);
        setError('');
    };



    const toggleSegnalazioniApprovate = () => {
        setSegnalazioniVisibile(!segnalazioniVisibile);
        setModificaProfiloVisibile(false);
        setAggiungiProfiloVisibile(false);
        setUtentiVisibile(false);
    };

    const toggleAggiungiProfilo = () => {
        setAggiungiProfiloVisibile(!aggiungiProfiloVisibile);
        setModificaProfiloVisibile(false);
        setSegnalazioniVisibile(false);
        setUtentiVisibile(false);
        setError('');
    };

    const toggleUtentiVisibili = () => {
        setUtentiVisibile(!utentiVisibile);
        setModificaProfiloVisibile(false);
        setSegnalazioniVisibile(false);
        setAggiungiProfiloVisibile(false);
    };


    const registrami = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/api/registrazione', registrazioneForm)
            .then(() => {
                setRegistrazioneSuccess(true);
                setRegistrazioneForm({ nome: '', cognome: '', email: '', password: '', ruolo: 'CISO' });
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

    const handleModificaProfiloChange = (event) => {
        const { value, name } = event.target;
        setModificaProfiloForm((prevNote) => ({ ...prevNote, [name]: value }));
    };

    const aggiornaProfilo = (event) => {
        event.preventDefault();
        if (!token) {
            console.error('Token non disponibile');
            return;
        }
        axios.put('http://127.0.0.1:5000/api/profilo', modificaProfiloForm, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
            .then((response) => {
                setProfilo(response.data);
                toggleModificaProfilo();
            })
            .catch((error) => {
                console.error('Errore durante l\'aggiornamento del profilo:', error);
                setError('Errore durante l\'aggiornamento del profilo');
            });
    };



    useEffect(() => {
        const fetchProfilo = async () => {
            if (!token) {
                console.error('Token non disponibile');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/profilo', {
                    method: 'GET',
                    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
                });
                const data = await response.json();
                setProfilo(data);
                setModificaProfiloForm({nome: data.nome, cognome: data.cognome, email: data.email, password: ''});
            } catch (error) {
                console.error('Errore durante il recupero del profilo:', error);
                setError('Errore durante il recupero del profilo');
            }
        };

        fetchProfilo();
    }, [token]);

    return (
        <Container sx={{ py: 5 }}>
            <Grid container spacing={4}>
                <Grid item lg={4} xs={12}>
                    <Card sx={{ mb: 4, mx: 5 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Avatar src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                sx={{ width: 150, height: 150, mx: 'auto', mb: 4 }} />
                            <Typography variant="h6" gutterBottom>Bentornato</Typography>
                            <Typography variant="h4" gutterBottom>{profilo.nome}</Typography>
                            <Typography variant="subtitle1">{profilo.ruolo}</Typography>
                            <Box sx={{ mt: 5 }}>
                                <Button variant="contained" color="warning" onClick={toggleSegnalazioniApprovate}
                                    sx={{ mb: 2 }}>
                                    Segnalazioni
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleModificaProfilo}
                                    sx={{ mb: 2 }}>
                                    Modifica profilo
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleAggiungiProfilo} sx={{ mb: 2 }}>
                                    Aggiungi profilo
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleUtentiVisibili} sx={{ mb: 2 }}>
                                    Visualizza utenti
                                </Button>
                            </Box>
                        </CardContent>
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
                                <Grid item xs={12}>
                                    <hr />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Cognome</Typography>
                                </Grid>
                                                                <Grid item xs={9}>
                                    <Typography variant="body1" color="text.secondary">{profilo.cognome}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Email</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1" color="text.secondary">{profilo.email}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr />
                                </Grid>
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
                        <Card sx={{mb: 3}}>
                            <CardContent>
                                <Typography variant="h6">Modifica Profilo</Typography>
                                <TextField label="Nome" name="nome" value={modificaProfiloForm.nome}
                                           onChange={handleModificaProfiloChange} fullWidth sx={{mb: 2}}/>
                                <TextField label="Cognome" name="cognome" value={modificaProfiloForm.cognome}
                                           onChange={handleModificaProfiloChange} fullWidth sx={{mb: 2}}/>
                                <TextField label="Email" name="email" value={modificaProfiloForm.email}
                                           onChange={handleModificaProfiloChange} fullWidth sx={{mb: 2}}/>
                                <TextField label="Password" name="password" type="password"
                                           value={modificaProfiloForm.password} onChange={handleModificaProfiloChange}
                                           fullWidth sx={{mb: 2}}/>
                                <Button variant="contained" color="warning" onClick={aggiornaProfilo}>Salva
                                    Modifiche</Button>
                                {error && <Alert severity="error" sx={{mt: 2}}>{error}</Alert>}
                            </CardContent>
                        </Card>
                    )}

                     {aggiungiProfiloVisibile && (
                        <Card sx={{mb: 3}}>
                            <CardContent>
                                <Typography variant="h6">Aggiungi Profilo</Typography>
                                <form onSubmit={registrami}>
                                    <TextField label="Nome" name="nome" value={registrazioneForm.nome}
                                               onChange={handleChange} fullWidth sx={{mb: 2}}/>
                                    <TextField label="Cognome" name="cognome" value={registrazioneForm.cognome}
                                               onChange={handleChange} fullWidth sx={{mb: 2}}/>
                                    <TextField label="Email" name="email" value={registrazioneForm.email}
                                               onChange={handleChange} fullWidth sx={{mb: 2}}/>
                                    <TextField label="Password" name="password" type="password"
                                               value={registrazioneForm.password} onChange={handleChange}
                                               fullWidth sx={{mb: 2}}/>
                                    <TextField select label="Ruolo" name="ruolo" value={registrazioneForm.ruolo}
                                               onChange={handleChange} fullWidth sx={{mb: 2}}>
                                        <MenuItem value="CISO">CISO</MenuItem>
                                        <MenuItem value="Amministratore di sistema">Amministratore di Sistema</MenuItem>
                                    </TextField>
                                    <Button variant="contained" color="warning" type="submit">Registrati</Button>
                                </form>
                                {registrazioneSuccess && (
                                    <Alert severity="success" sx={{mt: 2}}>Registrazione avvenuta con successo!</Alert>
                                )}
                                {error && <Alert severity="error" sx={{mt: 2}}>{error}</Alert>}
                            </CardContent>
                        </Card>
                    )}

                 {segnalazioniVisibile && ( <SegnalazioneAS token={token} /> )}

                    {utentiVisibile && (
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6">Lista Utenti Registrati</Typography>
                                <UtentiRegistrati token={token} />
                            </CardContent>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

ProfiloAS.propTypes = {
    token: PropTypes.string.isRequired
};

export default ProfiloAS;
