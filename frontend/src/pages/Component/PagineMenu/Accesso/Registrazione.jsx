import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import Login from "./Login.jsx";


function Registrazione(token, ruolo) {
    const navigate = useNavigate();
    const [error, setError] = useState(''); // Correctly define setError state

    const [RegistrazioneForm, setRegistrazioneForm] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function registrami(event) {
        event.preventDefault();
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/registrazione', // Registration endpoint
            data: {
                nome: RegistrazioneForm.nome,
                cognome: RegistrazioneForm.cognome,
                email: RegistrazioneForm.email,
                password: RegistrazioneForm.password
            }
        })
        .then((response) => {
            token.setToken(response.data.token)
            ruolo.setRuolo(response.data.ruolo);
            navigate("/Profili")
        })
        .catch((error) => {
            if (error.response) {
                setError(error.response.data.messaggio); // Set error message from server response
            }
        });
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setRegistrazioneForm((prevNote) => ({
            ...prevNote,
            [name]: value
        }));
    }

    return (
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 w-full sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Registrazione</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        autoComplete="off"
                                        type="text"
                                        name="nome"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-2"
                                        placeholder="Nome"
                                        value={RegistrazioneForm.nome}
                                    />
                                    <label
                                        htmlFor="nome"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Nome
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        autoComplete="off"
                                        type="text"
                                        name="cognome"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-2"
                                        placeholder="Cognome"
                                        value={RegistrazioneForm.cognome}
                                    />
                                    <label
                                        htmlFor="cognome"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Cognome
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        autoComplete="off"
                                        type="email"
                                        name="email"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-2"
                                        placeholder="Email"
                                        value={RegistrazioneForm.email}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Email
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
                                        value={RegistrazioneForm.password}
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        autoComplete="off"
                                        type="password"
                                        name="confirmPassword"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-2"
                                        placeholder="Conferma Password"
                                        value={RegistrazioneForm.confirmPassword}
                                    />
                                    <label
                                        htmlFor="confirmPassword"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Conferma Password
                                    </label>
                                </div>
                                <div className="relative flex justify-center"> {/* Center the button */}
                                    <button
                                        onClick={registrami}
                                        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
                                    >
                                        Registrati
                                    </button>
                                </div>
                                {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>} {/* Center align error message */}
                                <Link to="/Login" className="block text-center text-gray-600 underline mt-4"> {/* Adjust the margin */}
                                    Torna alla pagina di Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setRuolo: PropTypes.func.isRequired
};
export default Registrazione;
