// src/config.js
const config = {
    apiUrl: process.env.REACT_APP_API_URL ||'http://127.0.0.1:8000' || 'https://backend-irag.onrender.com/api/',
    environment: process.env.REACT_APP_ENV,
  };
  
  export default config;
  