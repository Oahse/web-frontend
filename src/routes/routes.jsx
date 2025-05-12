import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NonAuthRoutes from './nonAuthRoutes';  // Import non-authenticated routes
// import AuthRoutes from './authRoutes';  // Import authenticated routes

const Router = ({ API_URL, basename, Companyname, isLoggedIn, user, header, footer, bottomheader, notfound }) => {
  // Generate non-authenticated routes using the API_URL prop
  const nonauthroutes = NonAuthRoutes({ API_URL, Companyname, isLoggedIn, user, header, footer, bottomheader });

  // Generate authenticated routes using the API_URL prop
  // const authroutes = AuthRoutes({ API_URL, Companyname, isLoggedIn, user, header, footer, bottomheader });

  return (
    <HashRouter basename={basename}>
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
        {/* {authroutes.map((route) => (
          <Route
            key={route.title}
            path={route.path}
            element={route.element}
          />
        ))} */}

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={notfound} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
