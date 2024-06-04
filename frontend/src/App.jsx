import './App.css';

import {useState, useEffect} from 'react';
import useToken from "./pages/Component/useToken.jsx"
import useRuolo from "./pages/Component/PagineMenu/Accesso/useRuolo.jsx"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './pages/Component/Navbar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar/Searchbar.jsx';
import Home from './pages/Component/PagineMenu/Home.jsx';
import Feedback from "./pages/Component/PagineMenu/Feedback.jsx";
import Contatti from "./pages/Component/PagineMenu/Contatti/Contatti.jsx";
import NotFound from "./pages/Component/PagineMenu/NotFound/NotFound.jsx";

import Login from "./pages/Component/PagineMenu/Accesso/Login.jsx";
import Registrazione from "./pages/Component/PagineMenu/Accesso/Registrazione.jsx";
import LogOUT from "./pages/Component/PagineMenu/Accesso/LogOUT.jsx";
import Full from "./pages/Component/Risultati/Full.jsx";
import Information from "./pages/Component/Risultati/Information.jsx";
import POSD from './pages/Component/PagineMenu/POSD/Filtro/POSD.jsx';
import Definizione from './pages/Component/PagineMenu/POSD/Definizione.jsx';

import Ricerca from "./pages/Component/Searchbar/Ricerca.jsx";
import PropTypes from "prop-types";
import Profili from "./pages/Component/Profili/Profili.jsx";
import Partecipa from "./pages/Component/PagineMenu/Partecipa.jsx";

function App() {
    const [patterns, setPatterns] = useState([]);
    const {token, setToken} = useToken();
    const {ruolo, setRuolo} = useRuolo();
//inizializzazione patterns
    useEffect(() => {
        const initialPatterns = [];
        setPatterns(initialPatterns);
    }, []);

// Componente per route protette in base al token
    const ProtectedRouteToken = ({children, token}) => {
        if (!token) {
            return <Navigate to="/Login"/>;
        }
        return children;
    };

    ProtectedRouteToken.propTypes = {
        children: PropTypes.node.isRequired,
        token: PropTypes.string,
    };


    return (
        <Router >
            <Routes >
                <Route path="/" element={
                    <div>
                        <NavBar token={token}/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>
                        <Home />
                    </div>
                }/>
                <Route path="/Full/:title" element={
                    <div>
                        <NavBar token={token}/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>
                        <Full patterns={patterns} />
                    </div>
                }/>
                <Route path="/Information/:title"  element={
                    <div>
                        <NavBar token={token}/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>
                        <Information   props={token} ruolo={ruolo}/>
                    </div>
                }/>
                <Route path="/Contatti" element={
                    <div>
                        <NavBar token={token}/>
                        <Contatti/>
                    </div>
                }/>
                <Route path="/POSD" element={
                    <div>
                        <NavBar token={token}/>
                        <Searchbar/>
                        <POSD/>
                    </div>
                }/>

                <Route path="/Contatti" element={
                    <div>
                        <NavBar token={token}/>
                        <Contatti/>
                    </div>
                }/>
                <Route path="/POSD" element={
                    <div>
                        <NavBar token={token}/>
                        <Searchbar/>
                        <POSD/>
                    </div>
                }/>


                <Route path="/ricerca" element={
                    <div>
                        <NavBar token={token}/>
                        <Ricerca/>
                    </div>
                }/>


                <Route path="/Definizione/:title" element={
                    <div>
                        <NavBar token={token}/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>
                        <Definizione/>
                    </div>
                }/>

                <Route path="/LogOUT" element={
                    <LogOUT token={token}/>
                }/>

                <Route path="/Login" element={
                    <div>
                        <NavBar token={token} ruolo={ruolo}/>
                        <Login setToken={setToken} setRuolo={setRuolo}/>
                    </div>
                }/>

                <Route path="/Registrazione" element={
                    <div>

                        <NavBar token={token}/>
                        <Registrazione/>

                        <NavBar token={token}/>
                        <Registrazione />

                    </div>
                }/>


                <Route path="/Profili" element={
                    <ProtectedRouteToken token={token}>
                            <div>
                                <NavBar token={token}/>
                                <Profili  token={token} ruolo={ruolo}/>
                            </div>
                    </ProtectedRouteToken>
                }/>

                <Route path="/Partecipa" element={
                    <ProtectedRouteToken token={token}>
                            <div>
                                <NavBar token={token}/>
                                <Partecipa  token={token} ruolo={ruolo}/>
                            </div>
                    </ProtectedRouteToken>
                }/>

                <Route path="/Feedback" element={
                    <ProtectedRouteToken token={token}>
                        <div>
                            <NavBar token={token} ruolo={ruolo}/>
                            <Feedback token={token} setToken={setToken}/>
                        </div>
                    </ProtectedRouteToken>
                }/>
                <Route path="*" element={<NotFound/>}/>


            </Routes>
        </Router>

    );
}


export default App;
