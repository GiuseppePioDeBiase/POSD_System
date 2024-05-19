/* Searchbar.jsx */
function Searchbar() {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="input-group col-sm-6 input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text logo">
            <img src="Images/logo.png" alt="Logo" />
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