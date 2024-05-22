import { useLocation } from 'react-router-dom';

const Full = () => {
    const location = useLocation();
    const { title, description } = location.state || {};


/*Vogliamo aggiungere le varie PKB in riga o in box come nella pagian di home?*/


    return (
        <div className="max-w-md p-4">

            {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
            {description && <p className="text-lg">{description}</p>}
        </div>
    );
};

export default Full;
