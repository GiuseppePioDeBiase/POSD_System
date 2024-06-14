import  { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import PatternDetail from '../../PatternDetail';

const Definizione = ({props,ruolo}) => {
    const navigate = useNavigate();
    if(ruolo !== 'Utente'){
        navigate('/')
    }
    const location = useLocation();
    const pattern = location.state || {};

    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [ setError] = useState('');

    const handleBackClick = () => {
        navigate('/POSD');
    };

    const toggleFeedbackForm = () => {
        if (!props) {
            navigate("/Login");
        }
        else {
            setShowFeedbackForm(!showFeedbackForm);
        }
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

Definizione.propTypes = {
    props: PropTypes.string.isRequired,
    ruolo: PropTypes.string.isRequired
};

export default Definizione;
