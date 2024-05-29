import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './pages/Component/Navbar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar/Searchbar.jsx';
import Home from './pages/Component/PagineMenu/Home.jsx';
import './App.css';
import Feedback from "./pages/Component/PagineMenu/Feedback.jsx";
import Contatti from "./pages/Component/PagineMenu/Contatti.jsx";
import POSD from "./pages/Component/PagineMenu/POSD.jsx";
import Login from "./pages/Component/Login/Login.jsx";
import Full from "./pages/Component/Risultati/Full.jsx";
import Information from "./pages/Component/Risultati/Information.jsx";
import { useState, useEffect } from 'react';
import NotFound from "./pages/Component/NotFound/NotFound.jsx";
import ProfileUR from "./pages/Component/Profili/ProfileUR.jsx";
import Partecipa from "./pages/Component/PagineMenu/Partecipa.jsx";
import ProfiloCISO from "./pages/Component/Profili/ProfiloCISO.jsx";

function App() {
  const [patterns, setPatterns] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initialPatterns = [];
    setPatterns(initialPatterns);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={
          <div>
            <NavBar />
            <div className='flex items-center'>
              <Searchbar />
            </div>
            <Home />
          </div>
        } />
        <Route path="/Feedback" element={
          <div>
            <NavBar />
            <div className='flex items-center'>
              <Searchbar />
            </div>
            <Feedback />
          </div>
        } />
        <Route path="/Contatti" element={
          <div>
            <NavBar />
            <div className='flex items-center'>
              <Searchbar />
            </div>
            <Contatti />
          </div>
        } />
        <Route path="/POSD" element={
          <div>
            <NavBar />
            <div className='flex items-center'>
              <Searchbar />
            </div>
            <POSD />
          </div>
        } />
        <Route path="/Login" element={
          <div>
            <NavBar />
            <div className='flex items-center'>
              <Searchbar />
            </div>
            <Login setUser={setUser} />
          </div>
        } />
        <Route path="/Profilo" element={user ? (
          <div>
            <NavBar />
            <ProfileUR />
          </div>
        ) : (
          <Navigate to="/Login" />
        )} />
        <Route path="/Full/:title" element={
          <div>
            <NavBar />
            <div className='flex items-center'>
              <Searchbar />
            </div>
            <Full patterns={patterns} />
          </div>
        } />
        <Route path="/Information/:title" element={
          <div>
            <NavBar />
            <div className='flex items-center'>
              <Searchbar />
            </div>
            <Information />
          </div>
        } />
        <Route path="/ProfiloCISO" element={
          <div>
            <NavBar />
            <ProfiloCISO />
          </div>
        } />
        <Route path="*" element={<NotFound />} />
        <Route path="/Partecipa" element={user ? (
          <div>
            <NavBar />
            <Partecipa />
          </div>
        ) : (
          <Navigate to="/Login" />
        )} />
      </Routes>
    </Router>
  );
}

export default App;
