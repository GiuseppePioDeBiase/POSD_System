import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Risultati/Card.jsx';  // Assicurati che il percorso sia corretto

function POSD() {
    const [error, setError] = useState(null);
    const [patterns, setPatterns] = useState([]);

    useEffect(() => {
        const fetchPatterns = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/privacybydesign');
                setPatterns(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchPatterns();
    }, []);

    if (error) {
        return <div>Error fetching patterns. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto mt-5 p-6 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {patterns.map((pattern, index) => (
                    <Card
                        key={index}
                        title={pattern.title}
                        description={pattern.description}
                        className="w-auto h-auto"
                    />
                ))}
            </div>
        </div>
    );
}

export default POSD;
