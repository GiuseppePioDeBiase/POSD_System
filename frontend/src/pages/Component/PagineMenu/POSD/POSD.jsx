import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../Risultati/Card.jsx';
import { useNavigate } from 'react-router-dom';


function POSD() {
    const [setError] = useState(null);
    const [patterns, setPatterns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/pattern');
                setPatterns(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [setError]);

    const handleCardClick = (pattern) => {
        navigate(`/Definizione/${encodeURIComponent(pattern['Pattern'])}`);
    };

    return (
        <div className="container mx-auto mt-5 p-6 flex ">
            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-6">
                {patterns.map((pattern, index) => (
                    <Card
                        key={index}
                        strategies={pattern['Strategies']}
                        title={pattern['Pattern']}
                        description={pattern[['Description Pattern']]}
                        context={pattern['Context Pattern']}
                        collocazioneMVC={pattern['Collocazione MVC']}
                        ISO_Phase={pattern['ISO 9241-210 Phase']}
                        Article={pattern['Article GDPR Compliance with the Pattern']}
                        PKB={pattern['Privacy By Design Principles']}
                        Owasp={pattern['OWASP Top Ten Categories']}
                        CWE={pattern['CWE Top 25 Most Dangerous Software Weaknesses OWASP Categories Associated']}
                        Examples={pattern['Examples']}
                        className="w-auto h-auto"
                        onClick={() => handleCardClick(pattern)}
                    />
                ))}
            </div>
        </div>
    );
}

export default POSD;