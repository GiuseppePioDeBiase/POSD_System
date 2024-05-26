import React, { useState } from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  const menuItems = [
    { to: "/", icon: "home-outline", text: "Home", bg: "#ffa117" },
    { to: "/POSD", icon: "eye-outline", text: "POSD", bg: "#f44336" },
    { to: "/Contatti", icon: "mail-outline", text: "Contatti", bg: "#e91e63" },
    { to: "/Partecipa", icon: "hand-right-outline", text: "Partecipa", bg: "#0fc70f" },
    { to: "/Feedback", icon: "clipboard-outline", text: "Feedback", bg: "#b145e9" },
  ];

  const bottomItems = [
    { to: "/Profilo", icon: "img", imgSrc: "/frontend/images/totti.jpeg", alt: "Francesco Totti", text: "Francesco Totti" },
    { to: "/Registrazione", icon: "log-in-outline", text: "Registrazione" },
  ];

  return (
    <React.Fragment>
      <div className={`menuToggle ${menuOpen ? 'active' : ''}`} onClick={handleMenuToggle}></div>
      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li className="logo bg-transparent pointer-events-none select-none">
            <div className="icon">.</div>
          </li>
          <div className="Menulist">
            {menuItems.map((item, index) => (
              <li
                key={index}
                style={{ '--bg': item.bg }}
                className={activeMenuItem === index ? 'active' : ''}
                onClick={() => handleMenuItemClick(index)}
              >
                <Link to={item.to}>
                  <div className="icon">
                    <ion-icon name={item.icon}></ion-icon>
                  </div>
                  <div className="text">{item.text}</div>
                </Link>
              </li>
            ))}
          </div>
          <div className="bottom">
            {bottomItems.map((item, index) => (
              <li key={index} style={{ '--bg': '#333' }}>
                <Link to={item.to}>
                  <div className="icon">
                    {item.icon === "img" ? (
                      <div className="imgBx">
                        <img src={item.imgSrc} alt={item.alt} />
                      </div>
                    ) : (
                      <ion-icon name={item.icon}></ion-icon>
                    )}
                  </div>
                  <div className="text">{item.text}</div>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default NavBar;
