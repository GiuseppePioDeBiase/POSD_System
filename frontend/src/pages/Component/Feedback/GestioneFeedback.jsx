import {useState} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

function GestioneFeedback({token}) {

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [showStatus, setShowStatus] = useState(false);
    const [responseData, setResponseData] = useState(null); // Stato per la risposta dal server
    const [formSubmitted, setFormSubmitted] = useState(false); // Stato per controllare se il form è stato inviato

    const InserisciFeedback = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/feedback', {
                oggetto: subject,
                messaggio: message
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            setResponseData(response.data.messaggio); // Imposta il messaggio di risposta dal server

            setFormSubmitted(true); // Imposta che il form è stato inviato con successo
            // navigate(0); // Non navigare automaticamente, lascia che l'utente decida di andare via
        } catch (error) {
            setStatus('Errore nell\'invio del feedback');
            setShowStatus(true);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6 sm:p-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 text-center mb-4">Feedback</h2>
                    <p className="text-lg text-gray-600 text-center mb-6">
                        Lascia un feedback sulla tua personale esperienza sul sito POSD System!
                    </p>

                    <form onSubmit={InserisciFeedback}>

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
                    {formSubmitted && responseData && ( // Mostra il messaggio di feedback solo se il form è stato inviato con successo
                        <div className="mb-4">
              <pre className="bg-gray-100 p-4 rounded text-gray-700">
                {responseData}
              </pre>
                        </div>
                    )}
                    {showStatus && !formSubmitted && <p className="mt-4 text-lg text-center">{status}</p>}
                </div>
            </div>
        </div>
    );
}

GestioneFeedback.propTypes = {
    token: PropTypes.string.isRequired,
};

export default GestioneFeedback;
