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

import Login from "./pages/Component/PagineMenu/Accesso/Login/Login.jsx";
import Registrazione from "./pages/Component/PagineMenu/Accesso/Registrazione/Registrazione.jsx";
import Logout from "./pages/Component/PagineMenu/Accesso/LogOUT.jsx";
import Full from "./pages/Component/Risultati/Full.jsx";
import Information from "./pages/Component/Risultati/Information.jsx";
import POSD from './pages/Component/PagineMenu/POSD/POSD.jsx';
import Definizione from './pages/Component/PagineMenu/POSD/Definizione.jsx';

import Ricerca from "./pages/Component/Searchbar/Ricerca.jsx";
import PropTypes from "prop-types";
import Profili from "./pages/Component/Profili/Profili.jsx";


function App() {
    const [patterns, setPatterns] = useState([]);
    const {token, removeToken, setToken} = useToken();
    const {ruolo, removeRuolo, setRuolo} = useRuolo();
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
        <Router>
            <Routes>
                <Route path="/" element={
                    <div>
                        <NavBar/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>
                        <Home/>
                    </div>
                }/>
                <Route path="/Full/:title" element={
                    <div>
                        <NavBar/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>
                        <Full patterns={patterns}/>
                    </div>
                }/>
                <Route path="/Information/:title" element={
                    <div>
                        <NavBar/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>

                        <Information/>
                    </div>
                }/>
                <Route path="/Contatti" element={
                    <div>
                        <NavBar/>
                        <Contatti/>
                    </div>
                }/>
                <Route path="/POSD" element={
                    <div>
                        <NavBar/>
                        <Searchbar/>
                        <POSD/>
                    </div>
                }/>

                <Route path="/Contatti" element={
                    <div>
                        <NavBar/>
                        <Contatti/>
                    </div>
                }/>
                <Route path="/POSD" element={
                    <div>
                        <NavBar/>
                        <Searchbar/>
                        <POSD/>
                    </div>
                }/>


                <Route path="/ricerca" element={
                    <div>
                        <NavBar/>
                        <Ricerca/>
                    </div>
                }/>


                <Route path="/Definizione/:title" element={
                    <div>
                        <NavBar/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>
                        <Definizione/>
                    </div>
                }/>
                <Route path="/LogOUT" element={
                    <Logout removeToken={removeToken} removeRuolo={removeRuolo}/>
                }/>
                <Route path="/Login" element={
                    <div>
                        <NavBar token={token} ruolo={ruolo}/>
                        <Login setToken={setToken} setRuolo={setRuolo}/>
                    </div>
                }/>

                <Route path="/Registrazione" element={
                    <div>
                        <NavBar token={token} ruolo={ruolo}/>
                        <Registrazione setToken={setToken} setRuolo={setRuolo}/>
                    </div>
                }/>


                <Route path="/Profili" element={

                    <ProtectedRouteToken token={token}>

                        {token ? (
                            <div>
                                <NavBar />
                                <Profili  token={token} ruolo={ruolo}/>
                            </div>
                        ) : (
                            <Navigate to="/Login"/>
                        )}


                    </ProtectedRouteToken>
                }/>


                {/* <Route path="/ProfiloAS" element={
                    <div>
                        <NavBar token={token} ruolo={ruolo}/>
                        <ProfiloAS/>
                    </div>
                }/>

                 <Route path="/ProfiloCISO" element={
                    <div>
                        <NavBar token={token} ruolo={ruolo}/>
                        <ProfiloCISO/>
                    </div>
                }/>*/}
                {/* <Route path="/Partecipa" element={
          <ProtectedRouteToken token={token}>
            <div>
              <NavBar/>
              <Partecipa token={token} setToken={setToken}/>
            </div>
          </ProtectedRouteToken>
        }/>*/}
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
