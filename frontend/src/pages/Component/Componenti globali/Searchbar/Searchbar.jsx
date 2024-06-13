import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Searchbar.css'; // Import CSS styles

function Searchbar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/ricerca?query=${query}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="input-group input-group-lg col-sm-8 col-md-6 col-lg-4 mx-auto">
                <div className="input-group-prepend">
                    <Link to="/" className="input-group-text logo">
                        <img src="logo.png" alt="Logo" />
                    </Link>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="input-group-append">
                    <button
                        type="button"
                        className="input-group-text searchbar"
                        onClick={handleSearch}
                    >
                        <ion-icon name="search-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Searchbar;
