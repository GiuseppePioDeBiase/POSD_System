import { Link } from "react-router-dom";

function Searchbar() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="input-group col-sm-6 input-group-lg mx-auto">
        <div className="input-group-prepend">
          <span className="input-group-text logo">
            <Link to={"/"}>
              <img src="images/logo.png" alt="Logo"/>
            </Link>
          </span>
        </div>
        <input type="text" className="form-control"/>
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
