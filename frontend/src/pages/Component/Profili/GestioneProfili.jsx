import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from '@mui/material';
import GestioneCISO from "./GestioCISO/GestioneCISO.jsx";
import ProfileUR from "./GestioneUtenteRegistrato/GestioneUtente.jsx";
import GestioneAmministratore from "./GestioneAmministratore/GestioneAmministratore.jsx";

export function useFetchProfile(token) {
    const [profilo, setProfilo] = useState({nome: '', cognome: '', email: '', ruolo: '', genere: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            } catch (error) {
                console.error("Errore durante il recupero del profilo:", error);
                setError('Errore durante il recupero del profilo');
                setLoading(false);
            }
        };

        fetchProfilo();
    }, [token]);

    return {profilo, error, loading};
}

/*export const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
};*/

/*export function handleAvatarChange(setAvatar) {
    return (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
}*/

export function getWelcomeMessage(genere) {
    if (genere) {
        switch (genere) {
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
}

export function renderDettagliProfilo(profilo) {
    return (
        <>
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
        </>
    );
}

function GestioneProfili({token, ruolo}) {
    const {profilo, error} = useFetchProfile(token);


    if (error) {
        return <div>{error}</div>;
    }

    switch (ruolo) {
        case 'Utente':
            return <ProfileUR token={token} renderDettagliProfilo={() => renderDettagliProfilo(profilo)}/>;
        case 'CISO':
            return <GestioneCISO token={token} renderDettagliProfilo={() => renderDettagliProfilo(profilo)}/>;
        case 'Amministratore di sistema':
            return <GestioneAmministratore token={token} renderDettagliProfilo={() => renderDettagliProfilo(profilo)}/>;
        default:
            return <div>Ruolo non riconosciuto</div>;
    }
}

GestioneProfili.propTypes = {
    ruolo: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
};


export default GestioneProfili;
