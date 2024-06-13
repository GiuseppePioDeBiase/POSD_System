import {useEffect, useState} from 'react';
import Card from './GestionePKB/Card.jsx';
import axios from 'axios';
import {Link} from "react-router-dom";

function Home() {
    const [error, setError] = useState(null);
    const [PrivacyByDesigns, setPrivacyByDesign] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/privacybydesign');
                setPrivacyByDesign(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <Link to="/Error"/>;
    }

    return (
        <div className="container mx-auto mt-5 p-6 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PrivacyByDesigns.slice(0, 6).map((card, index) => {
                    return (
                        <Card
                            key={index}
                            title={card.title}
                            description={card.description}
                            className="w-auto h-auto"
                        />
                    );
                })}
                {PrivacyByDesigns[6] && (
                    <>
                        <div className="w-auto h-auto"></div>
                        <Card
                            key={6}
                            title={PrivacyByDesigns[6].title}
                            description={PrivacyByDesigns[6].description}
                            className="w-auto h-auto"
                        />
                        <div className="w-auto h-auto"></div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
