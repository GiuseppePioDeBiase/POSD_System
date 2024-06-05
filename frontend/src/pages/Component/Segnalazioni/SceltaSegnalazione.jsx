import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SceltaSegnalazione = ({ oggetto, messaggio, id }) => {
  const subject = "Segnalazione Numero: #";
  const [message, setMessage] = useState(messaggio);
  const [status, setStatus] = useState(null);

  const validateForm = () => {
    if (message.trim() === '') {
      setStatus('Il messaggio non può essere vuoto!');
      return false;
    }
    setStatus(null);
    return true;
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/allsegnalazione', {
        id: id,
        fleg: true
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

  const handleReject = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/allsegnalazioni', {
        id: id,
        fleg: false
      });
      setStatus(response.data.messaggio);
    } catch (error) {
      if (error.response) {
        setStatus(error.response.data.messaggio || 'Errore nell\'invio della segnalazione');
      } else {
        setStatus('Errore di connessione. Riprova più tardi.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Segnalazione</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="subject" className="text-lg text-gray-600">Oggetto</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            readOnly
            className="w-full rounded border border-gray-300 bg-white py-2 px-4 text-lg text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="text-lg text-gray-600">Messaggio</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-40 resize-none rounded border border-gray-300 bg-white py-2 px-4 text-lg text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            required
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <button
              type="button"
              onClick={handleAccept}
              className="rounded-full bg-purple-500 py-3 px-8 text-lg text-white hover:bg-green-600 focus:outline-none"
            >
              Accetta
            </button>
            {status && <p className="mt-4 text-lg text-center">{status}</p>}
          </div>
          <div>
            <button
              type="button"
              onClick={handleReject}
              className="rounded-full bg-purple-500 py-3 px-8 text-lg text-white hover:bg-red-600 focus:outline-none"
            >
              Rifiuta
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

SceltaSegnalazione.propTypes = {
  oggetto: PropTypes.string.isRequired,
  messaggio: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default SceltaSegnalazione;
