import { useState } from 'react';
import ProfiloCISO from "./ProfiloCISO.jsx";
import ProfileUR from "./ProfileUR.jsx";
import ProfiloAS from "./ProfiloAS.jsx";
import Caricamento from "../Caricamento/Caricamento.jsx";
import PropTypes from "prop-types";

function Profili({ token, ruolo }) {
    const [loading, setLoading] = useState(true);

    const handleTimeout = () => {
        setLoading(false);
    };

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
                <Caricamento onTimeout={handleTimeout} />
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
