import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, className, onClick }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(`/Full/${title}`, { state: { title, description } });
        }
    };

    return (
        <div
            className={`bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer ${className} h-auto`}
            onClick={handleCardClick}
        >
            <h1 className="text-xl">{title}</h1>
            {description && <p className="mt-2 h-auto">{description}</p>}
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Card;
