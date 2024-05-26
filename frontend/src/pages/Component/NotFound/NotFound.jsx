import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import './NotFound.css';

// Aggiungi l'icona al registro di libreria
library.add(faCog);

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 id="bigNumber" className="text-5xl md:text-9xl">
        <span className="num">4</span>
        <FontAwesomeIcon icon="cog" spin className="icon-spin" />
        <span className="num">4</span>
      </h1>
      <h2 id="notFoundText" className="text-xl md:text-3xl font-bold mt-8">
        <span className="text-center">Page Not Found</span>
      </h2>
      <Link to="/">
        <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-black-700">
          Torna alla Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
