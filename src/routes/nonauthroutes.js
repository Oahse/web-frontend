// NonAuthRoutes.js
import React from 'react';
import Explore from '../pages/Home';
import NotFound from '../components/NotFound';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


const nonauthroutes = [
  { path: "/", element: <Explore API_URL={process.env.REACT_APP_API_URL} exact />},
  { path: "/about", element: <Explore API_URL={process.env.REACT_APP_API_URL} />},
  { path: "*", element: <NotFound /> }
];

const NonAuthRoutes = () => (
  <BrowserRouter>
    <Routes>
      {nonauthroutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  </BrowserRouter>
);

export default NonAuthRoutes;
