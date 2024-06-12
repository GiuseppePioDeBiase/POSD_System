import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Card from '../../GestionePKB/Card.jsx'; // Assicurati che il percorso sia corretto

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Ricerca() {
  const [patterns, setPatterns] = useState([]);
  const query = useQuery().get('query');

 useEffect(() => {
  if (query) {
    const fetchPatterns = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/pattern?query=${query}`);
        console.log('API response:', response.data); // Log the response
        if (Array.isArray(response.data)) {
          setPatterns(response.data);
        } else {
          console.error('La risposta dell\'API non è un array:', response.data);
        }
      } catch (error) {
        console.error('Errore nel recupero dei patterns:', error);
      }
    };

    fetchPatterns();
  }
}, [query]);


  useEffect(() => {
    console.log('Stato dei patterns aggiornato:', patterns); // Log the updated state
  }, [patterns]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Risultati della Ricerca</h1>
      {patterns.length === 0 ? (
        <p>Nessun risultato trovato</p>
      ) : (
        <div className="flex flex-wrap -mx-2">
          {patterns.map((pattern, index) => (
            <div key={index} className="px-2 py-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <Card
                title={pattern.name}
                description={pattern.description}
                className=""
                onClick={() => console.log(`Card clicked: ${pattern.name}`)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ricerca;
