import { useState, useEffect } from 'react';
import ProfiloCISO from "./ProfiloCISO.jsx";
import ProfileUR from "./ProfileUR.jsx";
import ProfiloAS from "./ProfiloAS.jsx";
import PropTypes from "prop-types";

function Profili({ token, ruolo }) {
    const [loading, setLoading] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(3); // Tempo di attesa in secondi

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft(prevSeconds => prevSeconds - 1);
        }, 1000);

        setTimeout(() => {
            setLoading(false);
            clearInterval(timer);
        }, 3000); // Attendiamo 3 secondi prima di rimuovere il caricamento

        return () => clearInterval(timer);
    }, []);

    const renderProfile = () => {
        switch (ruolo) {
            case 'Utente':
                return <ProfileUR token={token} />;
            case 'CISO':
                return <ProfiloCISO token={token}/>;
            case 'Amministratore di sistema':
                return <ProfiloAS token={token}/>;
            default:
                return <div>Ruolo non riconosciuto</div>;
        }
    };

    return (
        <div>
            {loading ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    <div className="font-bold text-lg mb-2">Caricamento profilo...</div>
                    <div className="text-xl mb-2">Tempo rimanente: {secondsLeft} secondi</div>
                </div>
            ) : (
                renderProfile()
            )}
        </div>
    );
}

Profili.propTypes = {
    ruolo: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
};

export default Profili;
