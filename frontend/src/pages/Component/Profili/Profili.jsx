import ProfiloCISO from "./ProfiloCISO.jsx";
import ProfileUR from "./ProfileUR.jsx";
import ProfiloAS from "./ProfiloAS.jsx";
import NavBar from "../Navbar/NavBar.jsx";
import PropTypes from "prop-types";

function Profili({ruolo}) {
    const renderProfile = () => {
        switch (ruolo) {
            case 'utente':
                return <ProfileUR />;
            case 'ciso':
                return <ProfiloCISO/>;
            case 'amministratore di sistema':
                return <ProfiloAS/>;
            default:
                return <div>Ruolo non riconosciuto</div>;
        }
    };
   return (
    <div>
      <NavBar/>
      {renderProfile()}
    </div>
  );

}
Profili.propTypes = {
    ruolo: PropTypes.string.isRequired
};

export default Profili