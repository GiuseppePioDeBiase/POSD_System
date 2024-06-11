import {useState, useEffect} from 'react';
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
    Box,
    Alert
} from '@mui/material';
import StoricoSegnalazioni from "../Segnalazioni/StoricoSegnalazioni.jsx";
import StoricoFeedback from "../PagineMenu/Feedback/StoricoFeedback.jsx"
export default function ProfiloUR({token}) {
    const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
    const [segnalazioniVisibile, setSegnalazioniVisibile] = useState(false);
    const [FeedbackVisibile, setFeedbackVisibile] = useState(false);
    const [password, setPassword] = useState('');
    const [confermaPassword, setConfermaPassword] = useState('');
    const [profilo, setProfilo] = useState(
        {nome: '', cognome: '', email: '', ruolo: '', genere: ''});
    const [error, setError] = useState('');

    const [avatar, setAvatar] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp');

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
        setSegnalazioniVisibile(false);
        setFeedbackVisibile(false);
    };

    const toggleSegnalazioniVisibile = () => {
        setSegnalazioniVisibile(!segnalazioniVisibile);
        setModificaProfiloVisibile(false);
        setFeedbackVisibile(false);
    };
        const toggleFeedbackVisibile = () => {
        setFeedbackVisibile(!FeedbackVisibile);
        setModificaProfiloVisibile(false);
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
            setError("Le password non corrispondono!");
            return;
        }

        // Qui inserisci la logica per inviare le modifiche del profilo
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
            return 'Bentornatə'; // Fallback in caso di genere non definito
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
                                <Button variant="contained" color="warning" onClick={toggleSegnalazioniVisibile}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Segnalazioni
                                </Button>
                                  <Button variant="contained" color="warning" onClick={toggleFeedbackVisibile} sx={{ mb: 2, width: '100%', maxWidth: '300px' }}>
                                    Feedback
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleModificaProfilo}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Modifica profilo
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
                                                <TextField label="Nome" name="nome" value={profilo.nome} fullWidth
                                                           sx={{mb: 2}}/>
                                                <TextField label="Cognome" name="cognome" value={profilo.cognome}
                                                           fullWidth sx={{mb: 2}}/>
                                                <TextField label="Email" name="email" value={profilo.email} fullWidth
                                                           sx={{mb: 2}}/>
                                                <TextField label="Password" name="password" type="password"
                                                           value={password} onChange={handlePasswordChange} fullWidth
                                                           sx={{mb: 2}}/>
                                                  <TextField label="Conferma password" name="Conferma password" type="Conferma password"
                                                           value={password} onChange={handleConfermaPasswordChange} fullWidth
                                                           sx={{mb: 2}}/>
                                                <Button variant="contained" color="warning" onClick={handleSubmit}>Salva
                                                    Modifiche</Button>
                                                {error && <Alert severity="error" sx={{mt: 2}}>{error}</Alert>}
                                            </CardContent>
                                        </Card>
                                    )}

                                    {segnalazioniVisibile && (<StoricoSegnalazioni token={token}/>)}
                                    {FeedbackVisibile && (<StoricoFeedback token={token}/>)}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );

}

ProfiloUR.propTypes = {
    token: PropTypes.string.isRequired
};