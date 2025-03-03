import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../components/NotFound';  // Import the NotFound page component
import NonAuthRoutes from './nonauthroutes';  // Import non-authenticated routes
import AuthRoutes from './authroutes';  // Import authenticated routes

const Router = ({ API_URL,basename, Companyname }) => {
  
  // Generate non-authenticated routes using the API_URL prop
  const nonauthroutes = NonAuthRoutes({ API_URL, Companyname });

  // Generate authenticated routes using the API_URL prop
  const authroutes = AuthRoutes({ API_URL, Companyname });

  return (
    <BrowserRouter basename={basename}>
      {/* The main routing configuration */}
      <Routes>
        {/* Map and render non-authenticated routes */}
        {nonauthroutes.map((route) => (
          <Route
            key={route.title}
            path={route.path}
            element={route.element}
          />
        ))}

        {/* Map and render authenticated routes */}
        {authroutes.map((route) => (
            <Route
              key={route.title}
              path={route.path}
              element={route.element}
            />
          ))}

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
