import {useEffect, useState} from 'react';
import Card from './GestionePKB/Card.jsx';
import axios from 'axios';

function Home() {
    const [privacyByDesigns, setPrivacyByDesigns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://127.0.0.1:5000/api/privacybydesign');
            setPrivacyByDesigns(response.data);
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-5 p-6 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {privacyByDesigns.slice(0, 6).map((card) => {
                    return (
                        <Card
                            key={card.index}
                            title={card.title}
                            description={card.description}
                            className="w-auto h-auto"
                        />
                    );
                })}
                {privacyByDesigns[6] && (
                    <>
                        <div className="w-auto h-auto"></div>
                        <Card
                            key={6}
                            title={privacyByDesigns[6].title}
                            description={privacyByDesigns[6].description}
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