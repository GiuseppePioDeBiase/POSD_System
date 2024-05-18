/*Card.jsx */
import PropTypes from 'prop-types';

const Card = ({ title, description, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer ${className}`}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2">{description}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Card;
