    import { useState } from 'react';
    import './Login.css';
    import axios from 'axios';

    function Login() {
        const [nome, setNome] = useState('');
        const [cognome, setCognome] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [status, setStatus] = useState(null);

        const handleFirstNameChange = (e) => setNome(e.target.value);
        const handleLastNameChange = (e) => setCognome(e.target.value);
        const handleEmailChange = (e) => setEmail(e.target.value);
        const handlePasswordChange = (e) => setPassword(e.target.value);
        const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

        // Funzione per la registrazione
        const handleRegister = async (e) => {
            e.preventDefault();

            try {
                const response = await axios.post('http://localhost:5000/api/register', {
                    nome: nome,
                    cognome: cognome,
                    email: email,
                    password: password
                });
                setStatus(response.data.messaggio);
            } catch (error) {
                if (error.response) {
                    // Il backend ha restituito un errore con un messaggio
                    setStatus(error.response.data.messaggio);
                }
            }
        };

        // Funzione per il login
        const handleLogin = async (e) => {
            e.preventDefault();

            try {
                const response = await axios.post('http://localhost:5000/api/login', {
                    email: email,
                    password: password
                });
                setStatus(response.data.messaggio);
            } catch (error) {
                if (error.response) {
                    // Il backend ha restituito un errore con un messaggio
                    setStatus(error.response.data.messaggio);
                } else {
                    // Altri tipi di errori (es. errore di rete)
                    setStatus("Errore di rete");
                }
            }
        };

        return (
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper h-screen">
                                        <div className="card-front ">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-6">Log In</h4>
                                                    <form onSubmit={handleLogin}>
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                name="logemail"
                                                                className="form-style"
                                                                placeholder="Your Email"
                                                                id="logemail"
                                                                autoComplete="off"
                                                                value={email}
                                                                onChange={handleEmailChange}
                                                            />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="password"
                                                                name="logpass"
                                                                className="form-style"
                                                                placeholder="Your Password"
                                                                id="logpass"
                                                                autoComplete="off"
                                                                value={password}
                                                                onChange={handlePasswordChange}
                                                            />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button className="btn mt-4" type="submit">Submit</button>
                                                    </form>
                                                    {status && <p className="mt-4 text-center">{status}</p>}
                                                    <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap ">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Registrati</h4>
                                                    <form onSubmit={handleRegister}>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                name="regFirstName"
                                                                className="form-style"
                                                                placeholder="Your First Name"
                                                                id="regFirstName"
                                                                autoComplete="off"
                                                                value={nome}
                                                                onChange={handleFirstNameChange}
                                                            />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="text"
                                                                name="regLastName"
                                                                className="form-style"
                                                                placeholder="Your Last Name"
                                                                id="regLastName"
                                                                autoComplete="off"
                                                                value={cognome}
                                                                onChange={handleLastNameChange}
                                                            />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="email"
                                                                name="regEmail"
                                                                className="form-style"
                                                                placeholder="Your Email"
                                                                id="regEmail"
                                                                autoComplete="off"
                                                                value={email}
                                                                onChange={handleEmailChange}
                                                            />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="password"
                                                                name="regPassword"
                                                                className="form-style"
                                                                placeholder="Your Password"
                                                                id="regPassword"
                                                                autoComplete="off"
                                                                value={password}
                                                                onChange={handlePasswordChange}
                                                            />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="password"
                                                                name="regConfirmPassword"
                                                                className="form-style"
                                                                placeholder="Confirm Password"
                                                                id="regConfirmPassword"
                                                                autoComplete="off"
                                                                value={confirmPassword}
                                                                onChange={handleConfirmPasswordChange}
                                                            />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button className="btn mt-4" type="submit">Submit</button>
                                                    </form>
                                                    {status && <p className="mt-4 text-center">{status}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Login;
