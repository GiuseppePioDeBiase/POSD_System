import {useState, useEffect} from 'react';
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
import SegnalazioneAS from '../GestioneSegnalazione/SegnalazioniAccettate.jsx';
import UtentiRegistrati from './UtentiRegistrati.jsx';

const GestioneAmministratore = ({token}) => {
    const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
    const [aggiungiProfiloVisibile, setAggiungiProfiloVisibile] = useState(false);
    const [feedbackVisibile,setfeedbackVisibile]=useState(false);

    const [profilo, setProfilo] = useState({nome: '', cognome: '', email: '', ruolo: '', genere: ''});
    const [modificaProfiloForm, setModificaProfiloForm] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        genere: ''
    });
    const [registrazioneForm, setRegistrazioneForm] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        ruolo: 'CISO',
        genere: ''
    });
    const [registrazioneSuccess, setRegistrazioneSuccess] = useState(false);
    const [error, setError] = useState('');
    const [segnalazioniVisibile, setSegnalazioniVisibile] = useState(false);
    const [utentiVisibile, setUtentiVisibile] = useState(false);
    const [avatar, setAvatar] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp');

    const toggleModificaProfilo = () => {
        setModificaProfiloVisibile(!modificaProfiloVisibile);
        setAggiungiProfiloVisibile(false);
        setSegnalazioniVisibile(false);
        setUtentiVisibile(false);
        setfeedbackVisibile(false);
        setError('');
    };

    const toggleSegnalazioniApprovate = () => {
        setSegnalazioniVisibile(!segnalazioniVisibile);
        setModificaProfiloVisibile(false);
        setAggiungiProfiloVisibile(false);
        setUtentiVisibile(false);
        setfeedbackVisibile(false);
    };

    const toggleAggiungiProfilo = () => {
        setAggiungiProfiloVisibile(!aggiungiProfiloVisibile);
        setModificaProfiloVisibile(false);
        setSegnalazioniVisibile(false);
        setUtentiVisibile(false);
        setfeedbackVisibile(false);
        setError('');
    };

    const toggleUtentiVisibili = () => {
        setUtentiVisibile(!utentiVisibile);
        setModificaProfiloVisibile(false);
        setSegnalazioniVisibile(false);
        setAggiungiProfiloVisibile(false);
        setfeedbackVisibile(false);
    };
        const togglefeedbackVisibile = () => {
        setUtentiVisibile(false);
        setModificaProfiloVisibile(false);
        setSegnalazioniVisibile(false);
        setAggiungiProfiloVisibile(false);
        setfeedbackVisibile(!feedbackVisibile);
    };

    const registrami = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/api/registrazione', registrazioneForm)
            .then(() => {
                setRegistrazioneSuccess(true);
                setRegistrazioneForm({nome: '', cognome: '', email: '', password: '', ruolo: 'CISO', genere: ''});
                setError('');
            })
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data.messaggio);
                    console.log(error.response);
                }
            });
    };

    const handleAvatarClick = () => {
        document.getElementById('avatarInput').click();
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const {value, name} = event.target;
        setRegistrazioneForm((prevNote) => ({...prevNote, [name]: value}));
    };

    const handleModificaProfiloChange = (event) => {
        const {value, name} = event.target;
        setModificaProfiloForm((prevNote) => ({...prevNote, [name]: value}));
    };

    const aggiornaProfilo = (event) => {
        event.preventDefault();
        if (!token) {
            console.error('Token non disponibile');
            return;
        }
        axios.put('http://127.0.0.1:5000/api/profilo', modificaProfiloForm, {
            headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
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
                console.log('Dati del profilo:', data);
                setProfilo(data);
                setModificaProfiloForm({
                    nome: data.nome,
                    cognome: data.cognome,
                    email: data.email,
                    password: '',
                    genere: data.genere
                });
            } catch (error) {
                console.error('Errore durante il recupero del profilo:', error);
                setError('Errore durante il recupero del profilo');
            }
        };

        fetchProfilo();
    }, [token]);

    const getWelcomeMessage = () => {
        if (profilo.genere) {
            switch (profilo.genere) {
                case 'Uomo':
                    return 'Bentornato';
                case 'Donna':
                    return 'Bentornata';
                default:
                    return 'Bentornatə';
            }
        } else {
            return 'Bentornatə';
        }
    };

    return (
        <Container sx={{py: 5}}>
            <Grid container spacing={4}>
                <Grid item lg={4} xs={12}>
                    <Card sx={{mb: 4, mx: {xs: 0, md: 5}}}>
                        <CardContent sx={{textAlign: 'center'}}>
                              <Box onClick={handleAvatarClick} sx={{ cursor: 'pointer' }}>
                                <Avatar
                                    src={avatar}
                                    sx={{ width: 150, height: 150, mx: 'auto', mb: 4 }}
                                />
                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    style={{ display: 'none' }}
                                />
                            </Box>
                            <Typography variant="h6" gutterBottom>{getWelcomeMessage()}</Typography>
                            <Typography variant="h4" gutterBottom>{profilo.nome}</Typography>
                            <Typography variant="subtitle1">{profilo.ruolo}</Typography>
                            <Box sx={{mt: 5, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Button variant="contained" color="warning" onClick={toggleSegnalazioniApprovate}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Segnalazioni
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleModificaProfilo}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Modifica profilo
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleAggiungiProfilo}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Aggiungi profilo
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleUtentiVisibili}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Visualizza utenti
                                </Button>
                                <Button variant="contained" color="warning" onClick={togglefeedbackVisibile}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Visualizza feedback
                                </Button>

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item lg={8} xs={12}>
                    <Card sx={{mb: 4}}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Nome</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1" color="text.secondary">{profilo.nome}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Cognome</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1" color="text.secondary">{profilo.cognome}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Email</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1" color="text.secondary">{profilo.email}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Ruolo</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1" color="text.secondary">{profilo.ruolo}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Genere</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1" color="text.secondary">{profilo.genere}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Grid container>
                        <Grid item xs={12}>
                            <Card sx={{mb: 4}}>
                                <CardContent>
                                    {modificaProfiloVisibile && (
                                        <Card sx={{mb: 3}}>
                                            <CardContent>
                                                <Typography variant="h6">Modifica Profilo</Typography>
                                                <TextField label="Nome" name="nome" value={modificaProfiloForm.nome}
                                                           onChange={handleModificaProfiloChange} fullWidth
                                                           sx={{mb: 2}}/>
                                                <TextField label="Cognome" name="cognome"
                                                           value={modificaProfiloForm.cognome}
                                                           onChange={handleModificaProfiloChange} fullWidth
                                                           sx={{mb: 2}}/>
                                                <TextField label="Email" name="email" value={modificaProfiloForm.email}
                                                           onChange={handleModificaProfiloChange} fullWidth
                                                           sx={{mb: 2}}/>
                                                <TextField label="Password" name="password" type="password"
                                                           value={modificaProfiloForm.password}
                                                           onChange={handleModificaProfiloChange}
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
                                                    <TextField label="Cognome" name="cognome"
                                                               value={registrazioneForm.cognome}
                                                               onChange={handleChange} fullWidth sx={{mb: 2}}/>
                                                    <TextField label="Email" name="email"
                                                               value={registrazioneForm.email}
                                                               onChange={handleChange} fullWidth sx={{mb: 2}}/>
                                                    <TextField label="Password" name="password" type="password"
                                                               value={registrazioneForm.password}
                                                               onChange={handleChange}
                                                               fullWidth sx={{mb: 2}}/>
                                                    <TextField select label="Ruolo" name="ruolo"
                                                               value={registrazioneForm.ruolo}
                                                               onChange={handleChange} fullWidth sx={{mb: 2}}>
                                                        <MenuItem value="CISO">CISO</MenuItem>
                                                        <MenuItem value="Amministratore di sistema">Amministratore di
                                                            Sistema</MenuItem>
                                                    </TextField>
                                                    <Button variant="contained" color="warning"
                                                            type="submit">Registrati</Button>
                                                </form>
                                                {registrazioneSuccess && (
                                                    <Alert severity="success" sx={{mt: 2}}>Registrazione avvenuta con
                                                        successo!</Alert>
                                                )}
                                                {error && <Alert severity="error" sx={{mt: 2}}>{error}</Alert>}
                                            </CardContent>
                                        </Card>
                                    )}

                                    {segnalazioniVisibile && (<SegnalazioneAS token={token}/>)}

                                    {utentiVisibile && (
                                        <Card sx={{mb: 3}}>
                                            <CardContent>
                                                <Typography variant="h6">Lista Utenti Registrati</Typography>
                                                <UtentiRegistrati token={token}/>
                                            </CardContent>
                                        </Card>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

GestioneAmministratore.propTypes = {
    token: PropTypes.string.isRequired
};

export default GestioneAmministratore;