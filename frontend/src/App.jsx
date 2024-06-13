import './App.css';
import { useState, useEffect, useCallback } from 'react';
import useToken from "./pages/Component/Componenti globali/useToken.jsx";
import useRuolo from "./pages/Component/Componenti globali/useRuolo.jsx";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NavBar from './pages/Component/Componenti globali/Navbar/NavBar.jsx';
import Searchbar from './pages/Component/Componenti globali/Searchbar/Searchbar.jsx';
import Home from './pages/Component/Home.jsx';
import GestioneFeedback from "./pages/Component/Feedback/GestioneFeedback.jsx";
import Contatti from "./pages/Component/Contatti/Contatti.jsx";
import NotFound from "./pages/Component/Componenti globali/NotFound/NotFound.jsx";
import GestioneLogin from "./pages/Component/GestioneAutenticazione/GestioneLogin.jsx";
import GestioneRegistrazione from "./pages/Component/GestioneAutenticazione/GestioneRegistrazione.jsx";
import GestioneLogout from "./pages/Component/GestioneAutenticazione/GestioneLogout.jsx";
import Full from "./pages/Component/GestionePKB/Full.jsx";
import Information from "./pages/Component/GestionePKB/Information.jsx";
import POSD from './pages/Component/Componenti globali/POSD/Filtro/POSD.jsx';
import Definizione from './pages/Component/Componenti globali/POSD/Definizione.jsx';
import Ricerca from "./pages/Component/Componenti globali/Searchbar/Ricerca.jsx";
import PropTypes from "prop-types";
import GestioneProfili from "./pages/Component/Profili/GestioneProfili.jsx";
import SegnalazioniAccettateRifiutate from './pages/Component/Profili/GestioCISO/SegnalazioniAccettateRifiutate.jsx';
import AggiungiSegnalazione from "./pages/Component/GestioneSegnalazione/InserisciSegnalazione.jsx";

const ProtectedRouteToken = ({ children, token }) => {
    if (!token) {
        return <Navigate to="/Login" />;
    }
    return children;
};

const ProtectedRouteRuolo = ({ children, ruolo }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(3);

    const handleAccessDenied = useCallback(() => {
        setError('Accesso negato: Non sei autorizzato a visualizzare questo modulo.');
        const timer = setInterval(() => {
            setCountdown(prevCount => prevCount - 1);
        }, 1000);

        setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearInterval(timer);
    }, [navigate]);

    useEffect(() => {
        if (ruolo !== "Utente") {
            handleAccessDenied();
        }
    }, [ruolo, handleAccessDenied]);

    return (
        <>
            {error ? (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-75 z-50">
                    <div className="text-center p-6 rounded">
                        <div className="text-2xl font-bold mb-4">{error}</div>
                        <div className="text-xl mb-4">Ritorno alla home tra {countdown} secondi...</div>
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    </div>
                </div>
            ) : (
                children
            )}
        </>
    );
};

ProtectedRouteToken.propTypes = {
    children: PropTypes.node.isRequired,
    token: PropTypes.string,
};

ProtectedRouteRuolo.propTypes = {
    children: PropTypes.node.isRequired,
    ruolo: PropTypes.string,
};

function App() {
    const [patterns, setPatterns] = useState([]);
    const { token, setToken } = useToken();
    const { ruolo, setRuolo } = useRuolo();

    useEffect(() => {
        setPatterns([]);
    }, []);

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

                <Route path="/Logout" element={<GestioneLogout setToken={setToken} removeRuolo={setRuolo} />} />
                <Route path="/Login" element={
                    <div>
                        <NavBar token={token} />
                        <GestioneLogin setToken={setToken} setRuolo={setRuolo} />
                    </div>
                } />
                <Route path="/Registrazione" element={
                    <div>
                        <NavBar token={token} />
                        <GestioneRegistrazione setToken={setToken} setRuolo={setRuolo} />
                    </div>
                } />
                <Route path="/Profili" element={
                    <ProtectedRouteToken token={token}>
                        <div>
                            <NavBar token={token} />
                            <GestioneProfili token={token} ruolo={ruolo} />
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
                            <Navigate to="/GestioneProfili" />
                        )}
                    </ProtectedRouteToken>
                } />
                <Route path="/Feedback" element={
                    <ProtectedRouteToken token={token}>
                        <ProtectedRouteRuolo ruolo={ruolo}>
                            <div>
                                <NavBar token={token} ruolo={ruolo} />
                                <Searchbar />
                                <GestioneFeedback token={token} setToken={setToken} />
                            </div>
                        </ProtectedRouteRuolo>
                    </ProtectedRouteToken>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;