import './App.css';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './pages/Component/Navbar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar/Searchbar.jsx';
import Home from './pages/Component/PagineMenu/Home.jsx';
import Feedback from "./pages/Component/PagineMenu/Feedback.jsx";
import Contatti from "./pages/Component/PagineMenu/Contatti/Contatti.jsx";
import NotFound from "./pages/Component/PagineMenu/NotFound/NotFound.jsx";
import ProfileUR from "./pages/Component/Profili/ProfileUR.jsx";
import Login from "./pages/Component/PagineMenu/Accesso/Login/Login.jsx";
import Full from "./pages/Component/Risultati/Full.jsx";
import Information from "./pages/Component/Risultati/Information.jsx";
import POSD from './pages/Component/PagineMenu/POSD/POSD.jsx';
import Definizione from './pages/Component/PagineMenu/POSD/Definizione.jsx';
import useToken from "./pages/Component/useToken.jsx"


function App() {
    const [patterns, setPatterns] = useState([]);
    const {token, removeToken, setToken} = useToken();
    useEffect(() => {
        const initialPatterns = [];
        setPatterns(initialPatterns);
    }, []);

    return (
        <Router>
            <Routes token={removeToken}>
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
                            <NavBar />
                            <Contatti />
                        </div>
                    } />
                    <Route path="/POSD" element={
                        <div>
                            <NavBar />
                            <Searchbar />
                            <POSD/>
                        </div>
                    } />


                <Route path="/Definizione/:title" element={
                    <div>
                        <NavBar/>
                        <div className='flex items-center'>
                            <Searchbar/>
                        </div>
                        <Definizione/>
                    </div>
                }/>
                 <Route path="/Login" element={
                    <div>

                        <NavBar/>
                        <Login setToken={setToken}/>
                    </div>
                }/>
                {!token ? (
                    <Route path="/ProfileUR" element={<div>
                        <NavBar/>
                        <Login setToken={setToken}/>
                    </div>}/>
                ) : (
                    <Route path="/ProfileUR" element={
                        <div>
                        <NavBar/>
                        <ProfileUR token={token} setToken={setToken}/>
                        </div>}/>
                )}
                 {!token ? (
                    <Route path="/Partecipa" element={<div>
                        <NavBar/>
                        <Login setToken={setToken}/>
                    </div>}/>
                ) : (
                     <Route path="/Partecipa" element={
                        <div>
                        <NavBar/>
                        <PartecipaLayout token={token} setToken={setToken}/>
                        </div>}/>
                )}
            { !token && token!=="" &&token!== undefined ? (
                <Route path="/Feedback" element={<div>
                        <NavBar/>
                        <Login setToken={setToken}/>
                    </div>}/>
                ) : (
                    <Route path="/Feedback" element={
                        <div>
                            <NavBar/>
                            <Feedback token={token} setToken={setToken}/>
                        </div>}/>


            )}
            <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>

    );
}

// Layout per il profilo utente


// Layout per la partecipazione, accessibile solo se loggati
function PartecipaLayout() {
    return (
        <div>
            <NavBar/>
        </div>
    );
}

export default App;