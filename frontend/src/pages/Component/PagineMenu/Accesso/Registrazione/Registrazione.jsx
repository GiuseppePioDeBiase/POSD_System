import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link
import PropTypes from 'prop-types';
import useRuolo from '../useRuolo.jsx';

function Registrazione(props) {
    const navigate = useNavigate(); // Ottieni la funzione di navigazione
    const { setRuolo } = useRuolo(); // Ottieni le funzioni da useRuolo
    const [loginForm, setloginForm] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateForm = () => {
        const newErrors = {};
        if (loginForm.password !== loginForm.confirmPassword) {
            newErrors.confirmPassword = 'Le password non coincidono.';
        }
        if (!validatePassword(loginForm.password)) {
            newErrors.password = 'La password deve contenere almeno una lettera maiuscola, 8 caratteri, un numero e un carattere speciale.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function logMeIn(event) {
        event.preventDefault();
        if (!validateForm()) return;

        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/login',
            data: {
                email: loginForm.email,
                password: loginForm.password
            }
        })
            .then((response) => {
                const token = response.data.token; // Estrai il token e il ruolo dalla risposta del server
                const ruolo = response.data.ruolo; // Aggiungi l'assegnazione del ruolo dalla risposta del server
                setRuolo(ruolo); // Imposta il ruolo utilizzando l'hook useRuolo
                console.log(ruolo);
                props.setToken(token); // Imposta il token utilizzando la prop
                console.log(token);
                navigate('/'); // Reindirizza alla home page
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

        setloginForm({
            nome: '',
            cognome: '',
            email: '',
            password: '',
            confirmPassword: ''
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
                                        value={loginForm.nome}
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
                                        value={loginForm.cognome}
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
                                        value={loginForm.email}
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
                                        value={loginForm.password}
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Password
                                    </label>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        autoComplete="off"
                                        type="password"
                                        name="confirmPassword"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-2"
                                        placeholder="Conferma Password"
                                        value={loginForm.confirmPassword}
                                    />
                                    <label
                                        htmlFor="confirmPassword"
                                        className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Conferma Password
                                    </label>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <Link to="/login">
                                        <button className="bg-cyan-500 text-white rounded-md px-4 py-2">
                                            Accedi!
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-cyan-500 text-white rounded-md px-4 py-2"
                                        onClick={logMeIn}
                                    >
                                        Registrati
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

Registrazione.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Registrazione;
