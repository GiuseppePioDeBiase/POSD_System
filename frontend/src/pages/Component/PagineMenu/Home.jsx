import { useEffect, useState } from 'react';
import Card from '../Risultati/Card.jsx';
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
    // Print errors if any
    <Link to="/Error"/>
  }

  return (
    <div className="container mx-auto mt-5 p-6 flex justify-center">
      <div className="grid grid-cols-3 gap-6">
        {PrivacyByDesigns.slice(0, 6).map((card, index) => {

          return (
            <Card
              key={index}
              title={PrivacyByDesigns[index].title}
              description={PrivacyByDesigns[index].description}
              className="w-full h-full"
            />
          );
        })}
        {PrivacyByDesigns[6] && (
          <>
            <div className="w-full h-40"></div>
            <Card
              key={6}
              title={PrivacyByDesigns[6].title}
              description={PrivacyByDesigns[6].description}
              className="w-full h-full"
            />
            <div className="w-full h-40"></div>
          </>
        )}
      </div>
    </div >
  );
}

export default Home;
