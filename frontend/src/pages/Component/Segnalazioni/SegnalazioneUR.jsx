import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SegnalazioneUR = ({onClose, token, titolo} ) => {
  const subject="Segnalazione per il pattern: " + titolo;
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  console.log('Segnalazione:', titolo);
  console.log('Segnalazione:', token);
  const validateForm = () => {
    if (message.trim() === '') {
      setStatus('Il messaggio non può essere vuoto!');
      return false;
    }
    setStatus(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/segnalazione', {
        method: 'POST',
        oggetto: subject,
        messaggio: message,
        headers: {
            'Content-Type': 'application/json',//nell'intestazione di una richiesta HTTP indica al server che il corpo della richiesta è formattato come JSON
            'Authorization': `Bearer ${token}`
          }
      });
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Errore nell\'invio del feedback');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Invia una Segnalazione</h2>
      <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="rounded-full bg-purple-500 py-3 px-8 text-lg text-white hover:bg-green-600 focus:outline-none"
          >
            Invia
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-red-500 py-3 px-8 text-lg text-white hover:bg-red-600 focus:outline-none"
          >
            Chiudi
          </button>
        </div>
        {status && <p className="mt-4 text-lg text-center">{status}</p>}
      </form>
    </div>
  );
};

SegnalazioneUR.propTypes = {
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  titolo: PropTypes.string.isRequired
};

export default SegnalazioneUR;
