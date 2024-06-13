import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {  handleAvatarChange, getWelcomeMessage, renderDettagliProfilo,handleAvatarClick } from './Profili';
import PropTypes from 'prop-types';
import axios from "axios";
import StoricoSegnalazioni from "../GestioneSegnalazione/StoricoSegnalazioni.jsx"
import SetSegnalazioni from "../GestioneSegnalazione/SetSegnalazioni.jsx";
//funzioni CISO
function base64ToBlob(base64Data, contentType) {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}

export default function ProfiloCISO(props) {
    const navigate = useNavigate();

    const [StoricoSegnalazioniVisibile, setStoricoSegnalazioniVisibile] = useState(false);
    const [aggiungiLicenzaVisibile, setAggiungiLicenzaVisibile] = useState(false);
    const [segnalazioniVisibile, setSegnalazioniVisibile] = useState(false);

    const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '', genere: '' });
    const [ setStatus] = useState({});
    const [file, setFile] = useState({});
    const [fileUrl, setFileUrl] = useState(null); // Stato per l'URL del file
    const [licenzaNome, setLicenzaNome] = useState('Nessun file presente'); // Stato per il nome della licenza
    const [avatar, setAvatar] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp');

    useEffect(() => {
        const fetchProfilo = async () => {
            if (!props.token) {
                console.error("Token non disponibile");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/profilo', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${props.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Errore: ${response.status}`);
                }

                const data = await response.json();
                setProfilo(data);
                if (data.licenza) {
                    const blob = base64ToBlob(data.licenza, 'application/pdf');
                    const url = URL.createObjectURL(blob);
                    setFileUrl(url);
                }
            } catch (error) {
                console.error("Errore durante il recupero del profilo:", error);
            }
        };

        fetchProfilo();
    }, [props.token]);


    const fetchLicenza = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/recuperalicenza', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                },
                responseType: 'blob' // Imposta il tipo di risposta come blob
            });

            if (!response.ok) {
                throw new Error(`Errore: ${response.status}`);
            }

            // Ottieni il nome del file dalla intestazione 'Content-Disposition'
            const disposition = profilo.nome_file
            const nomeFile = disposition ? disposition.split('filename=')[1].replace(/"/g, '') : 'licenza.pdf';

            // Pulsante per scaricare
            const url = URL.createObjectURL(await response.blob());
            setFileUrl(url);
            setLicenzaNome(nomeFile);
        } catch (error) {
            console.error("Errore durante il recupero della licenza:", error);
        }
    };

    useEffect(() => {
        fetchLicenza();
    }, []);

    const toggleSegnalazioniVisibile = () => {
        setSegnalazioniVisibile(!segnalazioniVisibile);
        setAggiungiLicenzaVisibile(false);
        setStoricoSegnalazioniVisibile(false);
    };
    const toggleStoricoSegnalazioniVisibile = () => {
        setStoricoSegnalazioniVisibile(!StoricoSegnalazioniVisibile);
        setAggiungiLicenzaVisibile(false);
        setSegnalazioniVisibile(false  );
    };

    const toggleAggiungiLicenza = () => {
        setAggiungiLicenzaVisibile(!aggiungiLicenzaVisibile);
        setSegnalazioniVisibile(false);
        setStoricoSegnalazioniVisibile(false);
    };







    const handleFileUpload = async () => {
        if (!validateFILE()) {
            return;
        }

        const formData = new FormData();
        formData.append('licenza', file);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/caricalicenza',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${props.token}`,
                    },
                    responseType: 'blob',
                }
            );

            setStatus(response.data.messaggio);
            navigate(0);
        } catch (error) {
            console.error("Risposta errore:", error.response);
            if (error.response && error.response.data && error.response.data.messaggio) {
                setStatus(error.response.data.messaggio);
            } else {
                setStatus('Si è verificato un errore durante l\'elaborazione della richiesta.');
            }
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const allowedExtensions = [".cer", ".crt", ".pem", ".p12", ".pfx", ".der", ".p7b", ".p7c", ".key", ".pdf"];

        // Estrai l'estensione del file
        const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

        // Controlla se l'estensione è consentita
        if (!allowedExtensions.includes("." + fileExtension)) {
            // Se l'estensione non è consentita, mostra un avviso all'utente
            alert("Formato del file non supportato. Si prega di selezionare un file con un'estensione valida.");
            event.target.value = null; // Cancella il file selezionato
            return;
        }

        // Se l'estensione è valida, imposta il file nello stato
        setFile(selectedFile);
    };

    const handleFileDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', licenzaNome);
        link.click();
    };

    const validateFILE = () => {
        if (!file) {
            setStatus('Il file è vuoto');
            return false;
        }
        setStatus(null);
        return true;
    };

    return (
        <Container sx={{ py: 5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
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
                                <Button variant="contained" color="warning" onClick={toggleAggiungiLicenza} sx={{ mb: 2, width: '100%', maxWidth: '300px' }}>
                                    Licenza
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleSegnalazioniVisibile} sx={{ mb: 2, width: '100%', maxWidth: '300px' }}>
                                    Segnalazioni
                                </Button>
                                <Button variant="contained" color="warning" onClick={toggleStoricoSegnalazioniVisibile} sx={{ mb: 2, width: '100%', maxWidth: '300px' }}>
                                    Storico Segnalazioni
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
                                {renderDettagliProfilo(profilo)}
                                <Grid item xs={12}>
                                <hr />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1">Licenza</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1" color="text.secondary">{licenzaNome}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Grid container>
                        <Grid item xs={12}>
                            <Card sx={{ mb: 4 }}>
                                <CardContent>

                                    {segnalazioniVisibile && <SetSegnalazioni token={props.token} />}
                                    {StoricoSegnalazioniVisibile && <StoricoSegnalazioni token={props.token}  ruolo={profilo.ruolo}/>}
                                    {aggiungiLicenzaVisibile && (
                                        <Box>
                                            {file && (
                                                <Box mt={2}>
                                                    <Typography variant="subtitle2">Nome file: {licenzaNome}</Typography>
                                                    {fileUrl && (
                                                        <Button variant="contained" color="primary" onClick={handleFileDownload} sx={{ mt: 1 }}>
                                                            Scarica Licenza
                                                        </Button>
                                                    )}
                                                </Box>
                                            )}
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                style={{ display: 'block', marginBottom: '0.5%', marginTop: "5%" }}
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

ProfiloCISO.propTypes = {
    token: PropTypes.string.isRequired
};
