import GestioneCISO from "./GestioneCISO.jsx";
import ProfileUR from "./GestioneUtente.jsx";
import GestioneAmministratore from "./GestioneAmministratore.jsx";
import PropTypes from "prop-types";

function Profili({token, ruolo}) {

    const renderProfile = () => {
        switch (ruolo) {
            case 'Utente':
                return <ProfileUR token={token}/>;
            case 'CISO':
                return <GestioneCISO token={token}/>;
            case 'Amministratore di sistema':
                return <GestioneAmministratore token={token}/>;
            default:
                return <div>Ruolo non riconosciuto</div>;
        }
    };

    return (
        renderProfile()
    );
}

Profili.propTypes = {
    ruolo: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
};

export default Profili;
