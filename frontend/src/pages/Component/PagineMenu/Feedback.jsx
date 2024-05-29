import { useState } from 'react';
import axios from 'axios';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Feedback() {

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const user = useSelector(state => state.auth.user);

  // Se l'utente non è loggato, reindirizza alla pagina di login
  if (!user) {
    return <Navigate to="/Login" />;
  }
  const validateForm = () => {
    if (subject.trim() === '' || message.trim() === '') {
      setStatus('Oggetto e messaggio non possono essere vuoti!');
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
      const response = await axios.post('http://localhost:5000/api/feedback', {
        oggetto: subject,
        messaggio: message
      });
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Errore nell\'invio del feedback');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 text-center mb-4">Feedback</h2>
          <p className="text-lg text-gray-600 text-center mb-6">
            Lascia un feedback sulla tua personale esperienza sul sito PrivacyByDesing!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="subject" className="text-lg text-gray-600">Oggetto</label>
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
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="rounded-full bg-purple-500 py-3 px-8 text-lg text-white hover:bg-green-600 focus:outline-none"
              >
                Invia
              </button>
            </div>
          </form>
          {status && <p className="mt-4 text-lg text-center">{status}</p>}
        </div>
      </div>
    </div>
  );
}

export default Feedback;