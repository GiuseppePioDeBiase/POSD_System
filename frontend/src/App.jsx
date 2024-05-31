import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import useToken from './pages/Component/useToken';
import NavBar from './pages/Component/Navbar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar/Searchbar.jsx';
import Home from './pages/Component/PagineMenu/Home.jsx';
import Full from './pages/Component/Risultati/Full.jsx';
import Information from './pages/Component/Risultati/Information.jsx';
import Contatti from './pages/Component/PagineMenu/Contatti/Contatti.jsx';
import POSD from './pages/Component/PagineMenu/POSD/POSD.jsx';
import Login from './pages/Component/PagineMenu/Login/Login.jsx';
import ProfileUR from './pages/Component/Profili/ProfileUR.jsx';
// import Partecipa from './pages/Component/';
import Feedback from './pages/Component/PagineMenu/Feedback.jsx';
import NotFound from './pages/Component/PagineMenu/NotFound/NotFound.jsx';

import './App.css';

function App() {
    const {token, removeToken, setToken} = useToken();
    const [patterns, setPatterns] = useState([]);

    useEffect(() => {
        const initialPatterns = [];
        setPatterns(initialPatterns);
    }, []);

    return (
        <Router>
            <div className="App">
                <NavBar token={removeToken}/>
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
                    <Route path="/Login" element={
                        <div>
                            <NavBar/>
                            <Login setToken={setToken}/>
                        </div>
                    }/>

                    <Route exact path="/profile" element={token ? (
                        <ProfileUR token={token} setToken={setToken}/>
                    ) : (
                        <Navigate to="/Login"/>
                    )}/>
                    {/*<Route path="/Partecipa" element={token ? (
                        <PartecipaLayout />
                    ) : (
                        <Navigate to="/Login" />
                    )} />*/}
                    <Route path="/Feedback" element={token ? (
                        <FeedbackLayout/>
                    ) : (
                        <Navigate
                            to="/Login"
                            state={{from: '/Feedback'}} // Passa lo stato con la rotta da cui proviene l'utente
                        />
                    )}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </Router>
    );
}

// Layout per il profilo utente
// function ProfileURLayout() {
//     return (
//         <div>
//             <NavBar/>
//             <ProfileUR/>
//         </div>
//     );
// }

// Layout per la partecipazione, accessibile solo se loggati
// function PartecipaLayout() {
//     return (
//         <div>
//             <NavBar />
//             <Partecipa />
//         </div>
//     );
// }

// Layout per il feedback, accessibile solo se loggati
function FeedbackLayout() {
    return (
        <div>
            <NavBar/>
            <Feedback/>
        </div>
    );
}


export default App;