import './App.css';
import { useState, useEffect } from 'react';
import useToken from "./pages/Component/Componenti globali/useToken.jsx";
import useRuolo from "./pages/Component/Componenti globali/useRuolo.jsx";
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import NavBar from './pages/Component/Componenti globali/Navbar/NavBar.jsx';
import Searchbar from './pages/Component/Componenti globali/Searchbar/Searchbar.jsx';
import Home from './pages/Component/Home.jsx';
import InserisciFeedback from "./pages/Component/GestioneFeedback/InserisciFeedback.jsx";
import Contatti from "./pages/Component/Contatti/Contatti.jsx";
import NotFound from "./pages/Component/Componenti globali/NotFound/NotFound.jsx";
import SetLogin from "./pages/Component/GestioneAutenticazione/SetLogin.jsx";
import SetRegistrazione from "./pages/Component/GestioneAutenticazione/SetRegistrazione.jsx";
import SetLogOUT from "./pages/Component/GestioneAutenticazione/setLogOUT.jsx";
import Full from "./pages/Component/GestionePKB/Full.jsx";
import Information from "./pages/Component/GestionePKB/Information.jsx";
import POSD from './pages/Component/Componenti globali/POSD/Filtro/POSD.jsx';
import Definizione from './pages/Component/Componenti globali/POSD/Definizione.jsx';
import Ricerca from "./pages/Component/Componenti globali/Searchbar/Ricerca.jsx";
import PropTypes from "prop-types";
import Profili from "./pages/Component/Profili/Profili.jsx";
import Partecipa from "./pages/Component/Partecipa.jsx";
import SegnalazioniAccettateRifiutate from './pages/Component/GestioneSegnalazione/SegnalazioniAccettateRifiutate.jsx';
import AggiungiSegnalazione from "./pages/Component/GestioneSegnalazione/AggiungiSegnalazione.jsx";
function App() {
    const [patterns, setPatterns] = useState([]);
    const { token, setToken } = useToken();
    const { ruolo, setRuolo } = useRuolo();
    const [error] = useState('');

    // Inizializzazione patterns
    useEffect(() => {
        const initialPatterns = [];
        setPatterns(initialPatterns);
    }, []);

    // Componente per route protette in base al token
    const ProtectedRouteToken = ({ children, token }) => {
        if (!token) {
            return <Navigate to="/SetLogin" />;
        }
        return children;
    };

    // Funzione reinderizzamento e caricamento 5 secondi ricordati che c'è il css in App.css ti segno da dove a dove
const ProtectedRouteRuolo = ({ children, ruolo }) => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); // Countdown di 5 secondi
    const [error, setError] = useState('');

    useEffect(() => {
        let timer;
        if (ruolo !== "Utente") {
            setError('GestioneAutenticazione negato: Non sei autorizzato a visualizzare questo modulo.');
            timer = setInterval(() => {
                setCountdown((prevCount) => prevCount - 1);
            }, 1000);

            // Reindirizza dopo 5 secondi
            setTimeout(() => {
                navigate('/');
            }, 5000);
        }
        return () => clearInterval(timer);
    }, [ruolo, navigate]);

    return (
        <>
            {error && (
                <div className="fixed inset-0 flex justify-center items-center  bg-opacity-75 z-50">
                    <div className="text-center  p-6 rounded ">
                        <div className="text-2xl font-bold mb-4">{error}</div>
                        <div className="text-xl mb-4">Ritorno alla home tra {countdown} secondi...</div>
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    </div>
                </div>
            )}
            {!error && children}
        </>
    );
};

// Fine funzione


    ProtectedRouteToken.propTypes = {
        children: PropTypes.node.isRequired,
        token: PropTypes.string,
    };

    ProtectedRouteRuolo.propTypes = {
        children: PropTypes.node.isRequired,
        ruolo: PropTypes.string,
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div>
                        <NavBar token={token} />
                        <div className='flex items-center'>
                            <Searchbar />
                        </div>
                        <Home />
                    </div>
                } />
                <Route path="/Full/:title" element={
                    <div>
                        <NavBar token={token} />
                        <div className='flex items-center'>
                            <Searchbar />
                        </div>
                        <Full patterns={patterns} />
                    </div>
                } />
                <Route path="/Information/:title" element={
                    <div>
                        <NavBar token={token} />
                        <div className='flex items-center'>
                            <Searchbar />
                        </div>
                        <Information props={token} ruolo={ruolo} />
                    </div>
                } />
                <Route path="/Contatti" element={
                    <div>
                        <NavBar token={token} />
                        <Contatti />
                    </div>
                } />
                <Route path="/POSD" element={
                    <div>
                        <NavBar token={token} />
                        <Searchbar />
                        <POSD />
                    </div>
                } />
                <Route path="/ricerca" element={
                    <div>
                        <NavBar token={token} />
                        <Ricerca />
                    </div>
                } />
                <Route path="/Definizione/:title" element={
                    <div>
                        <NavBar token={token} />
                        <div className='flex items-center'>
                            <Searchbar />
                        </div>
                        <Definizione ruolo={ruolo} props={token} />
                    </div>
                } />


                <Route path="/SetLogOUT" element={<SetLogOUT setToken={setToken} removeRuolo={setRuolo} />} />
                <Route path="/SetLogin" element={
                    <div>
                        <NavBar token={token} />
                        <SetLogin setToken={setToken} setRuolo={setRuolo} />
                    </div>
                } />
                <Route path="/SetRegistrazione" element={
                    <div>
                        <NavBar token={token} />
                        <SetRegistrazione setToken={setToken} setRuolo={setRuolo} />
                    </div>
                } />
                <Route path="/Profili" element={
                    <ProtectedRouteToken token={token}>
                        <div>
                            <NavBar token={token} />
                            <Profili token={token} ruolo={ruolo} />
                        </div>
                    </ProtectedRouteToken>
                } />
                   <Route path="/segnalazione/:id" element={
                    <ProtectedRouteToken token={token}>
                        {ruolo === 'CISO' ? (
                            <SegnalazioniAccettateRifiutate token={token} />
                        ) : (
                            <Navigate to="/" />
                        )}
                    </ProtectedRouteToken>
                } />
                     <Route path="/AggiungiSegnalazione/:id" element={
                    <ProtectedRouteToken token={token}>
                        {ruolo === 'Amministratore di sistema' ? (
                            <AggiungiSegnalazione token={token} />
                        ) : (
                            <Navigate to="/Profili" />
                        )}
                    </ProtectedRouteToken>
                } />
                <Route path="/Partecipa" element={
                    <ProtectedRouteToken token={token}>
                        <ProtectedRouteRuolo ruolo={ruolo}>
                            <div>
                                <NavBar token={token} />
                                <Searchbar />
                                <Partecipa token={token} ruolo={ruolo} />
                            </div>
                        </ProtectedRouteRuolo>
                    </ProtectedRouteToken>
                } />

                <Route path="/InserisciFeedback" element={
                    <ProtectedRouteToken token={token}>
                        <ProtectedRouteRuolo ruolo={ruolo}>
                            <div>
                                <NavBar token={token} ruolo={ruolo} />
                                <Searchbar />
                                <InserisciFeedback token={token} setToken={setToken} />
                            </div>
                        </ProtectedRouteRuolo>
                    </ProtectedRouteToken>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {error && <div className="error">{error}</div>}
        </Router>
    );
}

export default App;
