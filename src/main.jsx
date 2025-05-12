import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';



// Global CSS imports (in main.jsx or App.jsx)


import '@/assets/css/animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import '@/assets/css/bootstrap-select.min.css';
// import '@/assets/css/image-compare-viewer.min.css';
import '@/assets/css/swiper-bundle.min.css';
import '@/assets/css/drift-basic.min.css';
import '@/assets/css/magnific-popup.min.css';
import '@/assets/css/photoswipe.css';
import '@/assets/fonts/font-icons.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import '@/assets/css/styles.css';


// Main app component
import App from './App.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
