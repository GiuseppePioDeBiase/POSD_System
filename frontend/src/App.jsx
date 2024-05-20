/*App.jsx*/
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import NavBar from './pages/Component/NavBar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar/Searchbar.jsx';
import Home from './pages/Component/PagineMenù/Home.jsx';
import News from './pages/Component/News';
import './App.css';
import Feedback from "./pages/Component/PagineMenù/Feedback.jsx";
import Contatti from "./pages/Component/PagineMenù/Contatti.jsx"
import POSD from "./pages/Component/PagineMenù/POSD.jsx"
import Login from "./pages/Component/PagineMenù/Login.jsx"
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
            <Route path="/Login" element={<Login/>}/>
            </Routes>

    </div>
    </Router>
  );
}


export default App;