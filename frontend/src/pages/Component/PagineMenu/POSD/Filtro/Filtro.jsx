import  { useState } from 'react';
import './Filtro.css';

const Filtro = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [strategiesOpen, setStrategiesOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (strategiesOpen) setStrategiesOpen(false);
  };

  const handleStrategiesClick = () => {
    setStrategiesOpen(!strategiesOpen);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <div className="flex justify-center"> {/* Modificato da "justify-end" a "justify-center" */}
      <div className="sec-center" style={{ marginRight: "20px" }}> {/* Modificato da "marginLeft" a "marginRight" */}
        <input className="dropdown" type="checkbox" id="dropdown-strategies" name="dropdown-strategies" checked={strategiesOpen} onChange={handleStrategiesClick}/>
        <label className="for-dropdown" htmlFor="dropdown-strategies">Strategies <i className="uil uil-arrow-down"></i></label>

        <div className="section-dropdown">

          <a href="#">Control <i className="uil uil-arrow-right"></i></a>
          <a href="#">Abstract <i className="uil uil-arrow-right"></i></a>
          <a href="#">Separate <i className="uil uil-arrow-right"></i></a>
          <a href="#">Hide <i className="uil uil-arrow-right"></i></a>
          <a href="#">Minimize <i className="uil uil-arrow-right"></i></a>
          <a href="#">Inform <i className="uil uil-arrow-right"></i></a>
          <a href="#">Enforce <i className="uil uil-arrow-right"></i></a>

        </div>
      </div>

      <div className="sec-center" style={{ marginLeft: "20px" }}> {/* Modificato da "marginRight" a "marginLeft" */}
        <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" checked={menuOpen} onChange={handleMenuClick}/>
        <label className="for-dropdown" htmlFor="dropdown">Controller MVC <i className="uil uil-arrow-down"></i></label>

        <div className="section-dropdown">

          <a href="#">Model <i className="uil uil-arrow-right"></i></a>
          <a href="#">Control <i className="uil uil-arrow-right"></i></a>
          <a href="#">View <i className="uil uil-arrow-right"></i></a>

        </div>
      </div>
    </div>
  );
}

export default Filtro;
