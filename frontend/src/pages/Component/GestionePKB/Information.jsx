import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SegnalazioneUR from '../GestioneSegnalazione/SegnalazioneUR.jsx';
import PropTypes from "prop-types";


const Information = ({props, ruolo}) => {

  const location = useLocation();
  const pattern = location.state || {};
  const navigate = useNavigate();
  const navigate1 = useNavigate();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [error, setError] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleFeedbackForm = () => {
    if(!props){
      navigate1("/Login")
    }else{
      if (ruolo!=="Utente"){
        setError('GestioneAutenticazione negato: Non sei autorizzato a visualizzare questo modulo.');
      }else{
        setShowFeedbackForm(!showFeedbackForm);
      }
    }
    
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
      {error && <p className="text-center font-bold" style={{ color: 'red' }}>{error}</p>}
      {showFeedbackForm && <SegnalazioneUR  onClose={toggleFeedbackForm }  token={props} titolo={pattern.Pattern}/>}

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
Information.propTypes = {
    props: PropTypes.string.isRequired,
    ruolo: PropTypes.string.isRequired

};
export default Information;
