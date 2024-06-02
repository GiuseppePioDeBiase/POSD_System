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

    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div
            className={`bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer ${className} h-auto sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4`}
            onClick={handleCardClick}
        >
            <h1 className="text-xl">{title || 'No Title Provided'}</h1>
            {description && <p className="mt-2 h-auto">{truncateText(description, 200)}</p>}
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
