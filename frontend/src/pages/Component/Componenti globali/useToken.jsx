import {useState} from 'react';

function useToken() {
    // Funzione per ottenere il token dalla sessionStorage
    const getToken = () => sessionStorage.getItem('token');

    // Utilizzo di useState per gestire lo stato del token
    const [token, setToken] = useState(() => getToken()); // Utilizzo di setToken invece di setTokenState

    // Funzione per impostare il token nella sessionStorage e nello stato locale
    const setTokenValue = (userToken) => {
        sessionStorage.setItem('token', userToken);
        setToken(userToken); // Utilizzo di setToken per aggiornare lo stato
    };

    // Funzione per rimuovere il token dalla sessionStorage e impostare lo stato a null
    const removeToken = () => {
        sessionStorage.removeItem('token');
        setToken(null); // Imposta il token a null nello stato locale utilizzando setToken
    };

    // Ritorna l'oggetto con il token, la funzione per impostare il token e la funzione per rimuovere il token
    return {
        token, // Utilizzo della destrutturazione per il valore di stato 'token'
        setToken: setTokenValue, // Utilizzo della funzione setTokenValue invece di setToken
        removeToken // Restituzione della funzione per rimuovere il token
    };
}

export default useToken;
