import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function GestioneLogin(props) {
    const navigate = useNavigate(); // Ottieni la funzione di navigazione

     const [loginForm, setloginForm] = useState({
        email: '',
        password: ''
    });
     const [error, setError] = useState(''); // Aggiungi lo stato per memorizzare l'errore
       function setLogin(event) {
    event.preventDefault();

    axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/api/login',
        data: {
            email: loginForm.email,
            password: loginForm.password
        }
    })
    .then((response) => {
        props.setRuolo(response.data.ruolo); // Set role using the useRuolo hook
        props.setToken(response.data.token); // Set token using the prop
        setError(''); // Reset error

        navigate('/Profili'); // Redirect to the profile page
    })
    .catch((error) => {
        if (error.response) {
            setError(error.response.data.messaggio);
        }
    });

}

    function handleChange(event) {
        const { value, name } = event.target;
        setloginForm((prevNote) => ({
            ...prevNote,
            [name]: value
        }));
    }

    return (
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 w-full sm:max-w-xl sm:mx-auto">
                {/* Ingrandisci il modulo di login */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        autoComplete="off"
                                        type="email"
                                        name="email"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-2"
                                        placeholder="Email address"
                                        value={loginForm.email}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Email Address
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        autoComplete="off"
                                        type="password"
                                        name="password"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-2"
                                        placeholder="Password"
                                        value={loginForm.password}
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Password
                                    </label>
                                </div>
                                {error && <div className="text-red-500 text-sm">{error}</div>} {/* Renderizza il messaggio di errore */}
                                <div className="flex justify-between mt-4">
                                    <Link to="/GestioneRegistrazione">
                                        <button className="bg-cyan-500 text-white rounded-md px-1 py-2">
                                            Non sei ancora registrato?
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-cyan-500 text-white rounded-md px-4 py-2"
                                        onClick={setLogin}
                                    >
                                        Accedi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }


GestioneLogin.propTypes = {
    setToken: PropTypes.func.isRequired,
    setRuolo: PropTypes.func.isRequired
};
export default GestioneLogin;
