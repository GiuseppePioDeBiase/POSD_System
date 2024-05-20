/*App.jsx*/
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import NavBar from './pages/Component/NavBar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar/Searchbar.jsx';
import Home from './pages/Component/Home';
import News from './pages/Component/News';
import './App.css';
import Feedback from "./pages/Component/Feedback.jsx";
import Contatti from "./pages/Component/Contatti.jsx"
import POSD from "./pages/Component/POSD.jsx"
function App() {
  return (

<Router>
    <div>
      <NavBar />
      <div className='flex justify-between items-center'>
    <Searchbar/>
      <News/>
      </div>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Feedback" element={<Feedback/>}/>
            <Route path="/Contatti" element={<Contatti />}/>
            <Route path="/POSD" element={<POSD/>}/>
        </Routes>

    </div>
    </Router>
  );
}


export default App;