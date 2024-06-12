import {useState} from 'react';
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
import { useFetchProfile, handleAvatarChange, getWelcomeMessage, renderDettagliProfilo,handleAvatarClick } from './Profili';
import StoricoSegnalazioni from "../GestioneSegnalazione/StoricoSegnalazioni.jsx";
import StoricoFeedback from "../GestioneFeedback/StoricoFeedback.jsx"



export default function GestioneUtente({ token }) {
    const { profilo, error, setError } = useFetchProfile(token);
    const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
    const [segnalazioniVisibile, setSegnalazioniVisibile] = useState(false);
    const [FeedbackVisibile, setFeedbackVisibile] = useState(false);
    const [password, setPassword] = useState('');
    const [confermaPassword, setConfermaPassword] = useState('');
    const [avatar, setAvatar] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp');

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



    return (
        <Container sx={{ py: 5 }}>
            <Grid container spacing={4}>
                <Grid item lg={4} xs={12}>
                    <Card sx={{ mb: 4, mx: { xs: 0, md: 5 } }}>
                        <CardContent sx={{ textAlign: 'center' }}>
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
                            <Box sx={{ mt: 5, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Button variant="contained" color="warning" onClick={toggleSegnalazioniVisibile}
                                    sx={{ mb: 2, width: '100%', maxWidth: '300px' }}>
                                    Segnalazioni
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleFeedbackVisibile} sx={{ mb: 2, width: '100%', maxWidth: '300px' }}>
                                    Feedback
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleModificaProfilo}
                                    sx={{ mb: 2, width: '100%', maxWidth: '300px' }}>
                                    Modifica profilo
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
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                {renderDettagliProfilo(profilo)}
                            </Grid>
                        </CardContent>
                    </Card>

                    <Grid container>
                        <Grid item xs={12}>
                            <Card sx={{ mb: 4 }}>
                                <CardContent>
                                    {modificaProfiloVisibile && (
                                        <Card sx={{ mb: 3 }}>
                                            <CardContent>
                                                <Typography variant="h6">Modifica Profilo</Typography>
                                                <TextField label="Nome" name="nome" value={profilo.nome} fullWidth
                                                    sx={{ mb: 2 }} />
                                                <TextField label="Cognome" name="cognome" value={profilo.cognome}
                                                    fullWidth sx={{ mb: 2 }} />
                                                <TextField label="Email" name="email" value={profilo.email} fullWidth
                                                    sx={{ mb: 2 }} />
                                                <TextField label="Password" name="password" type="password"
                                                    value={password} onChange={handlePasswordChange} fullWidth
                                                    sx={{ mb: 2 }} />
                                                <TextField label="Conferma password" name="confermaPassword" type="password"
                                                    value={confermaPassword} onChange={handleConfermaPasswordChange} fullWidth
                                                    sx={{ mb: 2 }} />
                                                <Button variant="contained" color="warning" onClick={handleSubmit}>Salva
                                                    Modifiche</Button>
                                                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                                            </CardContent>
                                        </Card>
                                    )}

                                    {segnalazioniVisibile && (<StoricoSegnalazioni token={token} ruolo={profilo.ruolo} />)}
                                    {FeedbackVisibile && (<StoricoFeedback token={token} />)}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );

}

GestioneUtente.propTypes = {
    token: PropTypes.string.isRequired
};