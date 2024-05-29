import { useState } from 'react';

function Registrazione() {
    // Stati per memorizzare i dati inseriti dall'utente
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [error, setError] = useState('');

    // Funzioni per aggiornare gli stati quando l'utente inserisce i dati
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleNomeChange = (e) => setNome(e.target.value);
    const handleCognomeChange = (e) => setCognome(e.target.value);

    // Funzione per gestire il submit del form
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logica per la registrazione
        if (password !== confirmPassword) {
            setError('Le password non corrispondono');
        } else {
            setError('');
            console.log('Nome:', nome);
            console.log('Cognome:', cognome);
            console.log('Email:', email);
            console.log('Password:', password);
            // Aggiungi qui la logica per inviare i dati al server
        }
    };

    return (
        <div className="container mx-auto mt-5 p-8 flex justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 hover:bg-gray-50 cursor-pointer w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Registrazione</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <label htmlFor="nome" className="block">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={handleNomeChange}
                            className="mt-1 p-2 border border-blue-500 bg-blue-100 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="cognome" className="block">Cognome:</label>
                        <input
                            type="text"
                            id="cognome"
                            value={cognome}
                            onChange={handleCognomeChange}
                            className="mt-1 p-2 border border-blue-500 bg-blue-100 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="email" className="block">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="mt-1 p-2 border border-blue-500 bg-blue-100 rounded w-full"
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
                            className="mt-1 p-2 border border-blue-500 bg-blue-100 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="confirmPassword" className="block">Conferma Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="mt-1 p-2 border border-blue-500 bg-blue-100 rounded w-full"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full max-w-xs"
                        >
                            Registrati
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registrazione;