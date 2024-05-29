import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card.jsx';

const Full = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title } = location.state || {};
    const [patternDetails, setPatternDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (title) {
            const fetchPatternDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/pattern/privacybydesign=${encodeURIComponent(title)}`);
                    setPatternDetails(response.data);
                } catch (error) {
                    setError(error);
                }
            };

            fetchPatternDetails();
        }
    }, [title]);

    const handleCardClick = (pattern) => {
        navigate(`/Information/${pattern.Pattern}`, { state: { ...pattern, title } });
    };

    if (error) {
        return <Link to="/Error">Go to Error Page</Link>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            {title && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4 mx-auto">
                    <div className="flex items-center mb-4">
                        <Link to="/" className="text-black font-bold">
                            {"< Back"}
                        </Link>
                        <h1 className="text-2xl text-center flex-grow">{title}</h1>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {patternDetails.map((pattern, index) => (
                    <Card
                        key={index}
                        title={pattern.Pattern}
                        description={pattern['Description Pattern']}
                        className="w-auto h-auto"
                        onClick={() => handleCardClick(pattern)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Full;