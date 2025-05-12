
import React from 'react';
import Router from '@/routes/routes.jsx';  // Import the Router component that handles the app's routing
import NotFound from '@/pages/404.jsx';

function App() {
    // const {isMobile} = useDeviceType();
    const { isLoggedIn, user } = { isLoggedIn: true, user: {id:'1'} };
    
    return (
      <Router 
          API_URL={'config.apiUrl'} 
          basename={"/"}  
          Companyname={'Bivis'} 
          isLoggedIn={isLoggedIn}
          user={user}
          currentUrl={'/'}
          notfound={<NotFound />}
      />
    );
}

export default App;

