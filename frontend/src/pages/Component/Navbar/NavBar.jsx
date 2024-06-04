import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';
import PropTypes from "prop-types";


function NavBar({token}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [profilo, setProfilo] = useState({ nome: '', cognome: ''});
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchProfilo = async () => {

      if (!token) {
        console.error("Token non disponibile");
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/profilo', {
          method: 'GET',
          headers: {

            'Content-Type': 'application/json',//nell'intestazione di una richiesta HTTP indica al server che il corpo della richiesta è formattato come JSON
            'Authorization': `Bearer ${token}`

          }
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        setProfilo(data);
      } catch (error) {
        console.error("Errore durante il recupero del profilo:", error);
      }
    };

    fetchProfilo();
  }, []);
  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
    if (window.innerWidth <= 1919) {
      setMenuOpen(false);
    }
  };

  const handleBottomItemClick = () => {
    if (window.innerWidth <= 1919) {
      setMenuOpen(false);
    }
  };

  const menuItems = [
    { to: "/", icon: "home-outline", text: "Home", bg: "#ffa117" },
    { to: "/POSD", icon: "eye-outline", text: "POSD", bg: "#f44336" },
    { to: "/Contatti", icon: "mail-outline", text: "Contatti", bg: "#e91e63" },
    { to: "/Partecipa", icon: "hand-right-outline", text: "Partecipa", bg: "#0fc70f" },
    { to: "/Feedback", icon: "clipboard-outline", text: "Feedback", bg: "#b145e9" },
  ];
  let bottomItems ;
  if (!token){
    bottomItems =[
        { to: "/Login", icon: "log-in-outline", text: "Login" }

    ];
  }else{
    bottomItems = [
    { to: "/Profili", icon: "img", imgSrc: "frontend/public/totti.jpeg", alt: profilo.nome, text: profilo.nome +" "+ profilo.cognome},
    { to: "/LogOUT", icon: "log-out-outline", text: "Logout" }
  ];
  }


  return (
    <>
      <div className={`menuToggle ${menuOpen ? 'active' : ''}`} onClick={handleMenuToggle}></div>
      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <ul className="relative h-screen">
          <li className="logo bg-transparent pointer-events-none select-none">
            <div className="icon text-white">.</div>
          </li>
          <div className="Menulist">
            {menuItems.map((item, index) => (
              <li
                key={index}
                style={{ '--bg': item.bg }}
                className={activeMenuItem === index ? 'active' : ''}
                onClick={() => handleMenuItemClick(index)}
              >
                <Link to={item.to} className="flex items-center">
                  <div className="icon flex justify-center items-center min-w-16 h-20">
                    <ion-icon name={item.icon}></ion-icon>
                  </div>
                  <div className="text text-lg">{item.text}</div>
                </Link>
              </li>
            ))}
          </div>
          <div className="bottom absolute bottom-0 w-full">
            {bottomItems.map((item, index) => (
              <li key={index} className="bottom-item" style={{ '--bg': '#100' }} onClick={handleBottomItemClick}>
                <Link to={item.to} className="flex items-center">
                  <div className="icon flex justify-center items-center min-w-16 h-20">
                    {item.icon === "img" ? (
                      <div className="imgBx w-10 h-10 rounded-full overflow-hidden">
                        <img src={item.imgSrc} alt={item.alt} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <ion-icon name={item.icon}></ion-icon>
                    )}
                  </div>
                  <div className="text text-lg">{item.text}</div>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
}
NavBar.propTypes = {
  token: PropTypes.string.isRequired,
};

export default NavBar;
