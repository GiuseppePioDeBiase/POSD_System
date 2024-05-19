import { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://example.com/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Errore durante il recupero delle notizie:', error);
      }
    };

    // Esegui la funzione di fetch delle notizie all'avvio del componente
    fetchNews();

    // Imposta un intervallo per aggiornare le notizie ogni tot secondi (ad esempio ogni 5 minuti)
    const intervalId = setInterval(fetchNews, 300000); // 300000 millisecondi = 5 minuti  //{newsItem.content} occhio

    // Pulisci l'intervallo quando il componente viene smontato
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2 className=' text-right text-xl font-bold text-black bg-white shadow-md rounded-lg p-4 mt-4'>Ultime Notizie</h2>
      {news.map(newsItem => (
        <div  key={newsItem.id}>

          <h3 className='bg-black '>{newsItem.title}</h3>
          <p className=' text-right text-xl font-bold text-black bg-white shadow-md rounded-lg p-4 mt-4'> palle</p>
        </div>
      ))}
    </div>
  );
};

export default News;
