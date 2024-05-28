import { useState } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css'; // Importa lo stile CSS

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
    if (window.innerWidth <= 1920) { // Controlla se la larghezza della finestra è inferiore o uguale a 768px (dispositivi mobili)
      setMenuOpen(false); // Chiudi la navbar solo se la larghezza della finestra è inferiore o uguale a 768px
    }
  };

  const menuItems = [
    { to: "/", icon: "home-outline", text: "Home", bg: "#ffa117" },
    { to: "/POSD", icon: "eye-outline", text: "POSD", bg: "#f44336" },
    { to: "/Contatti", icon: "mail-outline", text: "Contatti", bg: "#e91e63" },
    { to: "/Partecipa", icon: "hand-right-outline", text: "Partecipa", bg: "#0fc70f" },
    { to: "/Feedback", icon: "clipboard-outline", text: "Feedback", bg: "#b145e9" },
  ];

  const bottomItems = [
    { to: "/Profilo", icon: "img", imgSrc: "totti.jpeg", alt: "Francesco Totti", text: "Francesco Totti" },
    { to: "/Login", icon: "log-in-outline", text: "Login" },
  ];

  return (
    <>
      <div className={`menuToggle ${menuOpen ? 'active' : ''}`} onClick={handleMenuToggle}></div>
      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <ul className="relative h-screen">
          <li className="logo bg-transparent pointer-events-none select-none">
            <div className="icon">.</div>
          </li>
          <div className="Menulist">
            {menuItems.map((item, index) => (
              <li
                key={index}
                style={{ '--bg': item.bg }}
                className={activeMenuItem === index ? 'active' : ''}
                onClick={() => handleMenuItemClick(index)} // Aggiungi l'evento onClick per gestire il clic su un elemento del menu
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
              <li key={index} className="bottom-item" style={{ '--bg': '#100' }}>
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

export default NavBar;
