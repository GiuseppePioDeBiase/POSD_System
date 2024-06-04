import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SegnalazioneUR from '../../Segnalazioni/SegnalazioneUR.jsx';  // Import the SegnalazioneUR component


const Definizione = () => {
  const location = useLocation();
  const pattern = location.state || {};
  const navigate = useNavigate();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleBackClick = () => {
    navigate("/POSD");
  };

  const toggleFeedbackForm = () => {
    setShowFeedbackForm(!showFeedbackForm);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
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
              onClick={toggleFeedbackForm}
              className="text-black font-bold bg-transparent border-none"
            >
              Segnala
            </button>
          </div>
        </div>
      )}

      {showFeedbackForm && <SegnalazioneUR onClose={toggleFeedbackForm} />}

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="mt-4">
          <p><strong>Strategies:</strong> {pattern['Strategies']}</p>
          <p><strong>Description:</strong> {pattern['Description Pattern']}</p>
          <p><strong>Context:</strong> {pattern['Context Pattern']}</p>
          <p><strong>Collocazione MVC:</strong> {pattern['Collocazione MVC']}</p>
          <p><strong>ISO 9241-210 Phase:</strong> {pattern['ISO 9241-210 Phase']}</p>
          <p><strong>Article GDPR Compliance with the Pattern:</strong> {pattern['Article GDPR Compliance with the Pattern']}</p>
          <p><strong>Privacy By Design Principles:</strong> {pattern['Privacy By Design Principles']}</p>
          <p><strong>OWASP Top Ten Categories:</strong> {pattern['OWASP Top Ten Categories']}</p>
          <p><strong>CWE Top 25 Most Dangerous Software Weaknesses:</strong> {pattern['CWE Top 25 Most Dangerous Software Weaknesses OWASP Categories Associated']}</p>
          <p><strong>Examples:</strong> {pattern.Examples}</p>
        </div>
      </div>
    </div>
  );
};

export default Definizione;
