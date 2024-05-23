import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './pages/Component/NavBar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar.jsx';
import Home from './pages/Component/Home';
import './App.css';
import Feedback from "./pages/Component/Feedback.jsx";
import Contatti from "./pages/Component/Contatti.jsx";
import POSD from "./pages/Component/POSD.jsx";
import Registrazione from "./pages/Component/PagineMenu/Registrazione.jsx";
import Full from "./pages/Component/Full.jsx";
import Information from "./pages/Component/Information.jsx";
import { useState, useEffect } from 'react';

function App() {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    const initialPatterns = [];
    setPatterns(initialPatterns);
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <div className='flex justify-between items-center'>
          <Searchbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Contatti" element={<Contatti />} />
          <Route path="/POSD" element={<POSD />} />
          <Route path="/Registrazione" element={<Registrazione />} />
          <Route path="/Full/:title" element={<Full patterns={patterns} />} />
          <Route path="/Information/:title" element={<Information />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
