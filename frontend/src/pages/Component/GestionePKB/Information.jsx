
import  { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import PatternDetail from '../PatternDetail';

const Information = ({ props, ruolo }) => {
    const location = useLocation();
    const pattern = location.state || {};
    const navigate = useNavigate();
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [ setError] = useState('');

    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleFeedbackForm = () => {
        if (!props) {
            navigate('/Login');
            return;
        }

        if (ruolo !== 'Utente') {
            setError('Accesso negato: Non sei autorizzato a visualizzare questo modulo.');
            return;
        }

        setShowFeedbackForm(!showFeedbackForm);
    };

    return (
        <PatternDetail
            pattern={pattern}
            props={props}
            ruolo={ruolo}
            handleBackClick={handleBackClick}
            toggleFeedbackForm={toggleFeedbackForm} // Passa la funzione come prop
        />
    );
};

Information.propTypes = {
    props: PropTypes.string.isRequired,
    ruolo: PropTypes.string.isRequired,
};

export default Information;
