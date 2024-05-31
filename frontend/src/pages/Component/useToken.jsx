import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }
//La funzione getToken viene utilizzata per recuperare il token memorizzato in localStorage
//e restituisce un token solo se esiste, quindi l'uso dell'operatore condizionale &&.
  const [token, setToken] = useState(getToken());

 function saveToken(userToken) {
  sessionStorage.setItem('token', userToken);
  setToken(userToken);
}

//La funzione saveToken gestisce la memorizzazione del token ottenuto quando l'utente accede e la funzione al suo interno
//aggiorna lo stato della variabile token con il token passato come argomento alla funzione saveToken.
  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }
//La funzione RemoveToken elimina il token dalla memoria locale e lo riporta allo stato null ogni volta che viene chiamato.
  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;