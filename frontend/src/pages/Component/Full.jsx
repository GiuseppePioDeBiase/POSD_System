import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from './Card/Card.jsx';

const Full = () => {
    const location = useLocation();
    const { title } = location.state || {};
    const [patternTitles, setPatternTitles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (title) {
            const fetchPatternTitles = async () => {
                try {
                    const response = await axios.get("http://localhost:5000/api/pattern/privacybydesign=${encodeURIComponent(title)}");
                    const titles = response.data.map(pattern => pattern.Pattern);
                    setPatternTitles(titles);
                } catch (error) {
                    setError(error);
                }
            };

            fetchPatternTitles();
        }
    }, [title]);

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }

    return (
        <div className="max-w-md p-4">
            {title && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4">
                {patternTitles.map((patternTitle, index) => (
                    <Card
                        key={index}
                        title={patternTitle}
                        description=""
                        className="w-full h-full"
                    />
                ))}
            </div>
        </div>
    );
};

export default Full;