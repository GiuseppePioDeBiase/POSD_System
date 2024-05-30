import axios from 'axios';
import { LOGIN_SUCCESS } from './TipoAzioni.js';
// Azione di login
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: email,
                password: password
            });
            // Aggiorna lo stato di autenticazione nello store Redux
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            return { success: true, user: response.data.user,  };
        } catch (error) {
            // Gestisci eventuali errori di login
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
             return { success: false, error: error.message };
        }
    };
};
