import { Link } from "react-router-dom";
import './Searchbar.css'; // Importa lo stile CSS

function Searchbar() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="input-group input-group-lg col-sm-8 col-md-6 col-lg-4 mx-auto">
        <div className="input-group-prepend">
          <Link to={"/"} className="input-group-text logo">
            <img src="logo.png" alt="Logo" />
          </Link>
        </div>
        <input type="text" className="form-control" />
        <div className="input-group-append">
          <span className="input-group-text searchbar">
            <ion-icon name="search-outline"></ion-icon>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
