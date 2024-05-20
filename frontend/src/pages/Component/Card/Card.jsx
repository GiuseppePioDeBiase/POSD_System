import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import axios from 'axios';

function Cards() {
  const [error, setError] = useState(null);
  const [titolo, setTitolo] = useState([]);
  const history = useHistory();

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

  const handleCardClick = (title) => {
    history.push(`/detail?title=${encodeURIComponent(title)}`);
  };

  if (error) {
    // Print errors if any
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-5 p-6 flex justify-center">
      <div className="grid grid-cols-3 gap-6">
        {titolo.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(card.principle)}>
            <Card
              title={card.principle}
              description=""
              className="w-full h-40 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
