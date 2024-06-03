import { useState } from 'react';

function useRuolo() {

  function getRuolo() {
    const userRuolo = localStorage.getItem('ruolo');
    return userRuolo  || null; // Restituisci null se userRuolo è null o undefined
  }
//La funzione getRuolo viene utilizzata per recuperare il ruolo memorizzato in localStorage
//e restituisce un ruolo solo se esiste, quindi l'uso dell'operatore condizionale &&.
  const [ruolo, setRuolo] = useState(getRuolo());

 function saveRuolo(userRuolo) {
  localStorage.setItem('ruolo', userRuolo);
  setRuolo(userRuolo);
}

//La funzione saveRuolo gestisce la memorizzazione del ruolo ottenuto quando l'utente accede e la funzione al suo interno
//aggiorna lo stato della variabile ruolo con il ruolo passato come argomento alla funzione saveRuolo.
  function removeRuolo() {
    localStorage.removeItem("ruolo");
    setRuolo(null);
  }
//La funzione RemoveRuolo elimina il ruolo dalla memoria locale e lo riporta allo stato null ogni volta che viene chiamato.
  return {
    setRuolo: saveRuolo,
    ruolo,
    removeRuolo
  }

}

export default useRuolo;