import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function NotFoundPage() {
  return (

    <div className="h-screen flex justify-center items-center text-black font-poppins bg-white">
      <div className="text-center select-none">
          <h1 >Error</h1>
        <h1 className="text-xxl-center">
          <span className="num">4</span>
          <FontAwesomeIcon icon={faCog} className="animate-spin" />
          <span className="num">4</span>
        </h1>
      </div>
    </div>

  );
}

export default NotFoundPage;
