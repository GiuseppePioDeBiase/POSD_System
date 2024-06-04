import ProfiloCISO from "./ProfiloCISO.jsx";
import ProfileUR from "./ProfileUR.jsx";
import ProfiloAS from "./ProfiloAS.jsx";
import PropTypes from "prop-types";

function Profili({ token, ruolo}) {
    const renderProfile = () => {
        switch (ruolo) {
            case 'Utente':
                return <ProfileUR  token={token} />;
            case 'CISO':
                return <ProfiloCISO token={token}/>;
            case 'Amministratore di sistema':
                return <ProfiloAS  token={token}/>;
            default:
                return <div>Ruolo non riconosciuto</div>;
        }
    };
   return (
    <div>

      {renderProfile()}
    </div>
  );

}
Profili.propTypes = {
    ruolo: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
};

export default Profili