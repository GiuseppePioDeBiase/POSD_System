/*Cards.jsx */
import React, { useEffect } from 'react';
import Card from './Card';
import CardTransp from './CardTransp';
import axios from 'axios';
import { useState } from "react";

function Cards() {
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000');
        setRestaurants(response.data); // Assuming your data property is "data"
      } catch (error) {
        setError(error);
      }
    };
  
    fetchData();
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-5 p-6">
      <div className="grid grid-cols-3 gap-6 relative z-10">
      {restaurants.slice(0, 6).map((card, index) => (
          <Card
            key={index}
            title={card.principle}
            description={"palle"}
            className="w-full h-40"
          />
        ))}
        <CardTransp />
        <Card
          key={7}
          title="Card 7"
          description="Description for Card 7"
          className="w-full h-40">
          </Card>
      </div>
    </div>
  );
}


export default Cards;

/* {cards.slice(0, 6).map((card, index) => (
          <Card
            key={index}
            title={card._id}
            description={card.principle}
            className="w-full h-40"
          />
        ))}
        <CardTransp />
        <Card
          key={7}
          title="Card 7"
          description="Description for Card 7"
          className="w-full h-40"

                <ul>
  {restaurants.map(({, principle }, index) => (  // Destructure only principle
    <li key={index}>{principle}</li>
  ))}
</ul>
        />*/ 