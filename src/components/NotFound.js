import React from 'react';
import notfound from '../assets/notfound.jpg'
function NotFound() {
  return (
    <img 
         className='notfound'
          src={notfound}
          alt="not found"
        />
  );
}

export default NotFound;
