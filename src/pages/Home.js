import React, { useEffect, useState } from 'react';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';

function Explore({ API_URL }) {
  const [isLoading, setIsLoading] = useState(false); // Start with loading true
  setIsLoading(true);

  return (
    <div className="explore">
      {/* <p>{API_URL}</p> */}
      {isLoading ? (
        <ImageLoader
          src={oahseicon}
          alt='oahse'
          src2 ={oahselogo}
          alt2='oahse'
        />
      ) : (
        <img
          src={oahseicon}
          alt="Oahse Icon"
        />
      )}
    </div>
  );
}

export default Explore;
