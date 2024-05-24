import { useState } from 'react';
import axios from 'axios';

function Feedback() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

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
      setSubject('');
      setMessage('');
    } catch (error) {
      setStatus('Errore nell\'invio del feedback');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 flex w-auto flex-col border rounded-lg bg-white p-9 h-auto">
      <h2 className="title-font mb-1 text-5xl font-medium text-gray-900 text-center">Feedback</h2>
      <p className="mb-7 leading-relaxed text-gray-600 text-center">
        Lascia un feedback sulla tua personale esperienza sul sito PrivacyByDesing!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="text-sm leading-7 text-2xl text-gray-600">Oggetto</label>
          <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="text-sm leading-7 text-2xl text-gray-600">Messaggio</label>
          <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-64 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              required
          ></textarea>
        </div>
        <div className="flex justify-center items-center h-auto">
          <button
              type="submit"
              className="rounded border-40 bg-purple-500 py-3 px-6 text-lg text-white hover:bg-green-600 focus:outline-none text-center align-center"
          >
            Invia
          </button>
        </div>
      </form>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>

  );
}

export default Feedback;
