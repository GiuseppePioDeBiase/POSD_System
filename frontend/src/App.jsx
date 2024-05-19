/*App.jsx*/
import React from 'react';
import NavBar from './pages/Component/NavBar/NavBar.jsx';
import Searchbar from './pages/Component/Searchbar/Searchbar.jsx';
import Home from './pages/Component/Home';
import News from './pages/Component/News';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <div className='flex justify-between items-center'>
    <Searchbar/>
      <News/>
      </div>
      <Home />
    </div>
  );
}

export default App;