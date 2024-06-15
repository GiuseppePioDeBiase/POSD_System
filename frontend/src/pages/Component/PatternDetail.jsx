import { useState } from 'react';
import PropTypes from 'prop-types';
import InserisciSegnalazione from './GestioneSegnalazione/InserisciSegnalazione.jsx';

const PatternDetail = ({ pattern, props, ruolo, handleBackClick }) => {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    const toggleFeedbackForm = () => {
        if (!props) {
            setShowLoginMessage(true);
            setTimeout(() => setShowLoginMessage(false), 3000);  // Hide after 3 seconds
            return;
        }

        if (ruolo !== 'Utente') {
            setError('Accesso negato: Non sei autorizzato a visualizzare questo modulo.');
            setShowError(true);
            return;
        }

        setShowFeedbackForm(!showFeedbackForm);  // Toggle the feedback form visibility
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            {showLoginMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">Devi essere registrato e loggato per poter effettuare una segnalazione.</span>
                </div>
            )}
            {pattern.Pattern && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-4">
                        <button
                            onClick={handleBackClick}
                            className="text-black font-bold bg-transparent border-none"
                        >
                            {"< Back"}
                        </button>
                        <h1 className="text-2xl font-bold text-center flex-grow">{pattern.Pattern}</h1>
                        <button
                            onClick={toggleFeedbackForm}  // Handle the click to open/close the form
                            className="text-black font-bold bg-transparent border-none"
                        >
                            Segnala
                        </button>
                    </div>
                </div>
            )}
            {showError && <p className="text-center font-bold" style={{ color: 'red' }}>{error}</p>}
            {/* Show the form only if showFeedbackForm is true */}
            {showFeedbackForm && (
                <InserisciSegnalazione onClose={() => setShowFeedbackForm(false)} token={props} titolo={pattern.Pattern} />
            )}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="mt-4">
                    <p><strong>Strategies:</strong> {pattern['Strategies']}</p>
                    <p><strong>Description:</strong> {pattern['Description Pattern']}</p>
                    <p><strong>Context:</strong> {pattern['Context Pattern']}</p>
                    <p><strong>Collocazione MVC:</strong> {pattern['Collocazione MVC']}</p>
                    <p><strong>ISO 9241-210 Phase:</strong> {pattern['ISO 9241-210 Phase']}</p>
                    <p><strong>Article GDPR Compliance with the
                        Pattern:</strong> {pattern['Article GDPR Compliance with the Pattern']}</p>
                    <p><strong>Privacy By Design Principles:</strong> {pattern['Privacy By Design Principles']}</p>
                    <p><strong>OWASP Top Ten Categories:</strong> {pattern['OWASP Top Ten Categories']}</p>
                    <p><strong>CWE Top 25 Most Dangerous Software
                        Weaknesses:</strong> {pattern['CWE Top 25 Most Dangerous Software Weaknesses OWASP Categories Associated']}
                    </p>
                    <p><strong>Examples:</strong> {pattern.Examples}</p>
                </div>
            </div>
        </div>
    );
};

PatternDetail.propTypes = {
    pattern: PropTypes.object.isRequired,
    props: PropTypes.string.isRequired,
    ruolo: PropTypes.string.isRequired,
    handleBackClick: PropTypes.func.isRequired,
};

export default PatternDetail;
