import  { useState } from 'react';

function Login() {
    // Stati per memorizzare l'email e la password inseriti dall'utente
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Funzioni per aggiornare gli stati quando l'utente inserisce i dati
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // Funzione per gestire il submit del form
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logica per il login
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="container mx-auto mt-5 p-6 flex justify-center">
            <div className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer">
                <h2 className="text-xl font-bold">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <label htmlFor="email" className="block">Inserisci l e-mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="mt-1 p-2 border rounded w-full"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="password" className="block">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="mt-1 p-2 border rounded w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
