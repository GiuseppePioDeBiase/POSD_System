import {useState} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

import {Container, Grid, Card, CardContent, Typography, TextField, Button, Avatar, MenuItem, Alert, Box
} from '@mui/material';
import SegnalazioniAccettate from './SegnalazioniAccettate.jsx';
import UtentiRegistrati from './UtentiRegistrati.jsx';
import { useFetchProfile, handleAvatarChange, getWelcomeMessage, renderDettagliProfilo,handleAvatarClick } from '../GestioneProfili.jsx';

export default function GestioneAmministratore({ token }) {
    const [aggiungiProfiloVisibile, setAggiungiProfiloVisibile] = useState(false);
    const [feedbackVisibile,setfeedbackVisibile]=useState(false);
    const { profilo, error, setError } = useFetchProfile(token);
    const [registrazioneForm, setRegistrazioneForm] = useState({nome: '', cognome: '', email: '', password: '', ruolo: '', genere: ''});
    const [registrazioneSuccess, setRegistrazioneSuccess] = useState(false);
    const [segnalazioniVisibile, setSegnalazioniVisibile] = useState(false);
    const [utentiVisibile, setUtentiVisibile] = useState(false);
    const [avatar, setAvatar] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp');



    const Segnalazioniaccettate = () => {
        setSegnalazioniVisibile(!segnalazioniVisibile);
        setAggiungiProfiloVisibile(false);
        setUtentiVisibile(false);
        setfeedbackVisibile(false);
    };

    const RegistraUtenti = () => {
        setAggiungiProfiloVisibile(!aggiungiProfiloVisibile);
        setSegnalazioniVisibile(false);
        setUtentiVisibile(false);
        setfeedbackVisibile(false);
        setError('');
    };

    const ElencoUtenti = () => {
        setUtentiVisibile(!utentiVisibile);
        setSegnalazioniVisibile(false);
        setAggiungiProfiloVisibile(false);
        setfeedbackVisibile(false);
    };
        const togglefeedbackVisibile = () => {
        setUtentiVisibile(false);
        setSegnalazioniVisibile(false);
        setAggiungiProfiloVisibile(false);
        setfeedbackVisibile(!feedbackVisibile);
    };

    const registrami = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/api/registrazione', registrazioneForm)
            .then(() => {
                setRegistrazioneSuccess(true);
                setRegistrazioneForm({nome: '', cognome: '', email: '', password: '', ruolo: '', genere: ''});
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
        const {value, name} = event.target;
        setRegistrazioneForm((prevNote) => ({...prevNote, [name]: value}));
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
                                    onChange={handleAvatarChange(setAvatar)}
                                    style={{ display: 'none' }}
                                />
                            </Box>
                           <Typography variant="h6" gutterBottom>{getWelcomeMessage(profilo.genere)}</Typography>
                            <Typography variant="h4" gutterBottom>{profilo.nome}</Typography>
                            <Typography variant="subtitle1">{profilo.ruolo}</Typography>
                            <Box sx={{mt: 5, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Button variant="contained" color="warning" onClick={Segnalazioniaccettate}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Segnalazioni
                                </Button>
                                <Button variant="contained" color="warning" onClick={RegistraUtenti}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Aggiungi profilo
                                </Button>
                                <Button variant="contained" color="warning" onClick={ElencoUtenti}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Visualizza utenti
                                </Button>
                                <Button variant="contained" color="warning" onClick={togglefeedbackVisibile}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Visualizza feedback
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

                <Grid item lg={8} xs={12}>
                    <Card sx={{mb: 4}}>
                        <CardContent>
                            <Grid container spacing={2}>
                                {renderDettagliProfilo(profilo)}
                            </Grid>
                        </CardContent>
                    </Card>

                    <Grid container>
                        <Grid item xs={12}>
                            <Card sx={{mb: 4}}>
                                <CardContent>
                                    {segnalazioniVisibile && (<SegnalazioniAccettate token={token} ruolo={profilo.ruolo}/>)}
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
                                                    <TextField select label="genere" name="genere"
                                                               value={registrazioneForm.genere}
                                                               onChange={handleChange} fullWidth sx={{mb: 2}}>
                                                        <MenuItem value="Uomo">Uomo</MenuItem>
                                                        <MenuItem value="Donna">Donna</MenuItem>
                                                        <MenuItem value="Anonimo">Anonimo</MenuItem>
                                                    </TextField>
                                                    <TextField select label="Ruolo" name="ruolo"
                                                               value={registrazioneForm.ruolo}
                                                               onChange={handleChange} fullWidth sx={{mb: 2}}>
                                                        <MenuItem value="CISO">CISO</MenuItem>
                                                        <MenuItem value="Amministratore di sistema">Amministratore di Sistema</MenuItem>
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
}

GestioneAmministratore.propTypes = {
    token: PropTypes.string.isRequired
};


