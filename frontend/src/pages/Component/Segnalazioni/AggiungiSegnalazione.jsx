import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SceltaSegnalazione = ({  messaggio, id }) => {
  const subject = "Segnalazione Numero: #" + id;
  const [message, setMessage] = useState(messaggio);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const [registrazioneSuccess, setRegistrazioneSuccess] = useState(false);
  const [registrazioneForm, setRegistrazioneForm] = useState({ nome: '', cognome: '', OWASP: '', password: '', ruolo: 'CISO' });
  const validateForm = () => {
    if (message.trim() === '') {
      setStatus('Il messaggio non può essere vuoto!');
      return false;
    }
    setStatus(null);
    return true;
  };
    const registrami = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/api/registrazione', registrazioneForm)
      .then(() => {
        setRegistrazioneSuccess(true);
        setRegistrazioneForm({ nome: '', cognome: '', OWASP: '', password: '', ruolo: 'CISO' });
        setError('');
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.messaggio);
          console.log(error.response);
        }
      });
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {

      const response = await axios.post('http://localhost:5000/api/status_segnalazione', {
        _id: id,
        stato: true
      });
      setStatus(response.data.messaggio);
    } catch (error) {
      if (error.response) {
        setStatus(error.response.data.messaggio || 'Errore nell\'invio del feedback');
      } else {
        setStatus('Errore di connessione. Riprova più tardi.');
      }
    }
  };
 const handleChange = (event) => {
    const { value, name } = event.target;
    setRegistrazioneForm((prevNote) => ({ ...prevNote, [name]: value }));
  };

  return (
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <div className="mb-3">
          <div className="mb-3">
            <a>Nome</a>
            <input onChange={handleChange} autoComplete="off" type="text" placeholder="Inserisci nome..."
                   className="form-control" name="nome" value={registrazioneForm.nome} style={{maxWidth: '250px'}}/>
          </div>
          <div className="mb-3">
            <a>Cognome</a>
            <input onChange={handleChange} autoComplete="off" type="text" placeholder="Inserisci cognome..."
                   className="form-control" name="cognome" value={registrazioneForm.cognome}
                   style={{maxWidth: '250px'}}/>
          </div>
          <div className="mb-3">
            <a>OWASP</a>
            <select onChange={handleChange} className="form-control" name="ruolo" value={registrazioneForm.ruolo}
                    style={{maxWidth: '250px'}}>
              <option value="CISO">CISO</option>
              <option value="Amministratore di sistema">Amministratore di sistema</option>
            </select>
            <div>
              {registrazioneSuccess && <p className="text-success">Registrazione completata con successo!</p>}
            </div>
          </div>
        </div>
        <div className="mb-3 ms-md-4">
          <div className="mb-3">
            <a>Password</a>
            <input onChange={handleChange} autoComplete="off" type="text" placeholder="Inserisci password..."
                   className="form-control" name="password" value={registrazioneForm.password}
                   style={{maxWidth: '250px'}}/>
          </div>
          <div className="mb-3">
            <a>Ruolo</a>
            <select onChange={handleChange} className="form-control" name="ruolo" value={registrazioneForm.ruolo}
                    style={{maxWidth: '250px'}}>
              <option value="CISO">CISO</option>
              <option value="Amministratore di sistema">Amministratore di sistema</option>
            </select>
            <div>
              {registrazioneSuccess && <p className="text-success">Registrazione completata con successo!</p>}
            </div>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
        <div className="d-flex align-items-end justify-content-between ">
          <button className="btn me-2 btn-success" onClick={registrami}>Conferma Registrazione</button>
        </div>
      </div>

  );
};

SceltaSegnalazione.propTypes = {
  messaggio: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default SceltaSegnalazione;
