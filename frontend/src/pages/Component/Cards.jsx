/*Cards.jsx */
import React from 'react';
import Card from './Card';
import CardTransp from './CardTransp';

function Cards() {
  const cards = [
    { title: 'Card 1', description: 'Description for Card 1' },
    { title: 'Card 2', description: 'Description for Card 2' },
    { title: 'Card 3', description: 'Description for Card 3' },
    { title: 'Card 4', description: 'Description for Card 4' },
    { title: 'Card 5', description: 'Description for Card 5' },
    { title: 'Card 6', description: 'Description for Card 6' },
    { title: 'Card 7', description: 'Description for Card 7' },
  ];

  return (
    <div className="container mx-auto mt-5 p-6">
      <div className="grid grid-cols-3 gap-6 relative z-10">
        {cards.slice(0, 6).map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            className="w-full h-40"
          />
        ))}
        <CardTransp />
        <Card
          key={7}
          title="Card 7"
          description="Description for Card 7"
          className="w-full h-40"
        />
      </div>
    </div>
  );
}

export default Cards;
