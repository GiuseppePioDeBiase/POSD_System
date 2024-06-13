import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

function Caricamento({onTimeout}) {
    const [secondsLeft, setSecondsLeft] = useState(2);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft(prevSeconds => prevSeconds - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            onTimeout();
            clearInterval(timer);
        }, 2000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [onTimeout]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <div className="font-bold text-lg mb-2">Caricamento profilo...</div>
            <div className="text-xl mb-2">Tempo rimanente: {secondsLeft} secondi</div>
        </div>
    );
}

Caricamento.propTypes = {
    onTimeout: PropTypes.func.isRequired,
};

export default Caricamento;
