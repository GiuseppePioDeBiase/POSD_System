import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card = ({  title, description, onClick }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate("/Full/${ID}, { state: { title, description } }");
        }
    };

    return (
        <div
            className={"bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer ${className}"}
            onClick={handleCardClick}
        >
            <h2 className="text-xl font-bold">{title}</h2>
            {description && <p className="mt-2">{description}</p>}
        </div>
    );
};

Card.propTypes = {
    ID: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Card;