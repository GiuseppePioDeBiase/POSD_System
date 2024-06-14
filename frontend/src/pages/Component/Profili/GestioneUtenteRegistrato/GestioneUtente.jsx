import {useState} from 'react';
import PropTypes from 'prop-types';
import {Container, Grid, Card, CardContent, Typography, Button, Avatar, Box} from '@mui/material';
import {
    useFetchProfile,
    handleAvatarChange,
    getWelcomeMessage,
    renderDettagliProfilo,
    handleAvatarClick
} from '../GestioneProfili.jsx';
import StoricoSegnalazioni from "../../Componenti globali/Storico.jsx";
import StoricoFeedback from "../../Feedback/StoricoFeedback.jsx";

export default function GestioneUtente({token}) {
    const {profilo} = useFetchProfile(token);
    const [segnalazioniVisibile, setSegnalazioniVisibile] = useState(false);
    const [feedbackVisibile, setFeedbackVisibile] = useState(false);
    const [avatar, setAvatar] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp');

    const Storico = () => {
        setSegnalazioniVisibile(!segnalazioniVisibile);
        setFeedbackVisibile(false);
    };

    const toggleFeedbackVisibile = () => {
        setFeedbackVisibile(!feedbackVisibile);
        setSegnalazioniVisibile(false);
    };

    return (
        <Container sx={{py: 5}}>
            <Grid container spacing={4}>
                <Grid item lg={4} xs={12}>
                    <Card sx={{mb: 4, mx: {xs: 0, md: 5}}}>
                        <CardContent sx={{textAlign: 'center'}}>
                            <Box onClick={handleAvatarClick} sx={{cursor: 'pointer'}}>
                                <Avatar
                                    src={avatar}
                                    sx={{width: 150, height: 150, mx: 'auto', mb: 4}}
                                />
                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange(setAvatar)}
                                    style={{display: 'none'}}
                                />
                            </Box>
                            <Typography variant="h6" gutterBottom>{getWelcomeMessage(profilo.genere)}</Typography>
                            <Typography variant="h4" gutterBottom>{profilo.nome}</Typography>
                            <Typography variant="subtitle1">{profilo.ruolo}</Typography>
                            <Box sx={{mt: 5, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Button variant="contained" color="warning" onClick={Storico}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Segnalazioni
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleFeedbackVisibile}
                                        sx={{mb: 2, width: '100%', maxWidth: '300px'}}>
                                    Feedback
                                </Button>
                            </Box>
                        </CardContent>
                        <Avatar
                            src="/logo.png"
                            alt="logo"
                            sx={{width: 50, height: 50, mx: 'auto', my: 2}}
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
                                    {segnalazioniVisibile && (
                                        <StoricoSegnalazioni token={token} ruolo={profilo.ruolo}/>)}
                                    {feedbackVisibile && (<StoricoFeedback token={token} ruolo={profilo.ruolo}/>)}
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