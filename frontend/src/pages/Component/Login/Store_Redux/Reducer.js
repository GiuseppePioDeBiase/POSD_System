// src/store/reducers/index.js
// Importa il tipo di azione per il login
import { LOGIN_SUCCESS } from './TipoAzioni.js';

// Definisci lo stato iniziale
const initialState = {
  user: null, // Informazioni sull'utente autenticato
  isAuthenticated: false, // Flag che indica se l'utente è autenticato
  userType: null, // Tipo di utente (Utente registrato, Amministratore di sistema, CISO)
  // Altri dati relativi all'autenticazione e alle autorizzazioni
};

// Definisci il reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        userType: action.payload.userType, // Imposta il tipo di utente dopo il login
      };
   /* case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userType: null, // Resetta il tipo di utente dopo il logout
      };*/
    default:
      return state;
  }
};

export default authReducer;
