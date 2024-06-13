import {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import {Box, Typography, Button, TextField, TextareaAutosize} from '@mui/material';

const SegnalazioniAccettateRifiutate = ({token}) => {
    const navigate = useNavigate();

    const {id} = useParams();

    const location = useLocation();
    const {messaggio} = location.state || {};

    const subject = "Segnalazione Numero: #" + id;
    const [message, setMessage] = useState(messaggio || '');
    const [status, setStatus] = useState(null);


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
            const response = await axios.post(
                'http://localhost:5000/api/updatesegnalazione',
                {
                    _id: id,
                    messaggio: message,
                    stato: true,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setStatus(response.data.messaggio);
            navigate(-1);
        } catch (error) {
            console.error("Risposta errore:", error.response); // Log per debugging
            if (error.response && error.response.data.messaggio) {
                setStatus(error.response.data.messaggio);
            } else {
                setStatus('Si è verificato un errore durante l\'elaborazione della richiesta.');
            }
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            console.log("Invio richiesta con token:", token); // Log per debugging
            const response = await axios.post(
                'http://localhost:5000/api/updatesegnalazione',
                {
                    _id: id,
                    messaggio: message,
                    stato: false,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setStatus(response.data.messaggio);
            navigate('/Profili');
        } catch (error) {
            console.error("Risposta errore:", error.response); // Log per debugging
            if (error.response && error.response.data.messaggio) {
                setStatus(error.response.data.messaggio);
            } else {
                setStatus('Si è verificato un errore durante l\'elaborazione della richiesta.');
            }
        }
    };
    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <Box sx={{backgroundColor: 'white', boxShadow: 3, borderRadius: 2, p: 4, mb: 4}}>
            <button
                onClick={handleBackClick}
                className="text-black font-bold bg-transparent border-none"
            >
                {"< Back"}
            </button>
            <Typography variant="h5" sx={{mb: 4, textAlign: 'center'}}>Segnalazione</Typography>
            <form>
                <Box sx={{mb: 4}}>
                    <Typography variant="subtitle1" sx={{color: 'text.secondary'}}>Oggetto</Typography>
                    <TextField
                        type="text"
                        id="subject"
                        name="subject"
                        value={subject}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                        sx={{mt: 1}}
                        required
                    />
                </Box>
                <Box sx={{mb: 4}}>
                    <Typography variant="subtitle1" sx={{color: 'text.secondary'}}>Messaggio</Typography>
                    <TextareaAutosize
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
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
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                        <Button
                            type="button"
                            onClick={handleAccept}
                            variant="contained"
                            color="primary"
                            sx={{borderRadius: '50px', py: 1.5, px: 4, textTransform: 'none'}}
                        >
                            Accetta
                        </Button>
                        {status && <Typography variant="body1" sx={{mt: 2, textAlign: 'center'}}>{status}</Typography>}
                    </Box>
                    <Box>
                        <Button
                            type="button"
                            onClick={handleReject}
                            variant="contained"
                            color="secondary"
                            sx={{borderRadius: '50px', py: 1.5, px: 4, textTransform: 'none'}}
                        >
                            Rifiuta
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

SegnalazioniAccettateRifiutate.propTypes = {
    token: PropTypes.string.isRequired
};

export default SegnalazioniAccettateRifiutate;
