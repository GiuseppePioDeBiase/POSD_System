import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from './Card.jsx';

const Full = () => {
    const location = useLocation();
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

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            {title && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h1 className="text-2xl font-bold text-center">{title}</h1>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {patternDetails.map((pattern, index) => (
                    <Card
                        key={index}
                        title={pattern.Pattern}
                        description={pattern['Description Pattern']}
                        className="w-full h-full"
                    />
                ))}
            </div>
        </div>
    );
};

export default Full;
