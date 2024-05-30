import { useEffect, useState } from 'react';
import Card from '../Risultati/Card.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function POSD() {
    const [error, setError] = useState(null);
    const [patterns, setPatterns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/pattern/names');
                setPatterns(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (pattern) => {
        navigate(`/Definizione/${encodeURIComponent(pattern.pattern_name)}`, { state: { title: pattern.pattern_name, ...pattern } });
    };

    if (error) {
        return <Link to="/Error" />;
    }

    return (
        <div className="container mx-auto mt-5 p-6 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {patterns.map((pattern, index) => (
                    <Card
                        key={index}
                        title={pattern.pattern_name}
                        description={pattern.description}
                        className="w-auto h-auto"
                        onClick={() => handleCardClick(pattern)}
                    />
                ))}
            </div>
        </div>
    );
}

export default POSD;