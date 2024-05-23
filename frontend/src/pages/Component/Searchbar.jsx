/* Searchbar.jsx */
import { Link } from "react-router-dom";

function Searchbar() {
  return (
    <div className="container">
      <div className="input-group w-50 mx-auto input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text logo">
            <Link to={"/"}>
              <img src="images/logo.png" alt="Logo" />
            </Link>
          </span>
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
