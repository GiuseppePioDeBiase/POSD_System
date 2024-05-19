/* Cards.jsx */
import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

function Cards() {
  const [error, setError] = useState(null);
  const [titolo, setTitolo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000');
        setTitolo(response.data); // Assuming your data property is "data"
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-5 p-6 flex justify-center">
      <div className="grid grid-cols-3 gap-6">
        {titolo.slice(0, 6).map((card, index) => (
          <Card
            key={index}
            title={card.principle}
            description=""
            className="w-full h-40"
          />
        ))}
        {titolo[6] && (
          <>
            <div className="w-full h-40"></div>
            <Card
              key={6}
              title={titolo[6].principle}
              description=""
              className="w-full h-40"
            />
            <div className="w-full h-40"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cards;