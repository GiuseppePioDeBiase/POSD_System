import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Partecipa = ({ token }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const navigate=useNavigate();
  const validateForm = () => {
    if (message.trim() === '' || subject.trim() === '') {
      setStatus('Il nome e la descrizione non possono essere vuoti!');
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
        oggetto: subject,
        messaggio: message,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      navigate(0);
      setStatus(response.data.messaggio);
    } catch (error) {
      if (error.response) {
        setStatus(error.response.data.messaggio || 'Errore nell\'invio del feedback');
      } else {
        setStatus('Errore di connessione. Riprova più tardi.');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-bold mb-4 ">Inserisci un nuovo pattern</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subject" className="text-lg text-gray-600">Inserisci nome pattern</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded border border-gray-300 bg-white py-2 px-4 text-lg text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="text-lg text-gray-600">Descrivi il pattern</label>
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
          </div>
          {status && <p className="mt-4 text-lg text-center">{status}</p>}
        </form>
      </div>
    </div>
  );
};

Partecipa.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Partecipa;
