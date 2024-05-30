// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './Reducer.js'; // Importa il reducer per l'autenticazione

// Combina tutti i reducer della tua applicazione in un unico rootReducer
const rootReducer = combineReducers({
  auth: authReducer, // Aggiungi il reducer per l'autenticazione
  // Altri reducer, se presenti
});

export default rootReducer;
