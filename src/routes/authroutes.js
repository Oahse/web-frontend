// src/routes/AuthRoutes.js

import React from 'react';
import Explore from '../pages/Home';
import PrivateRoute from './privateRoute';

const AuthRoutes = ({ API_URL }) => [
  {
    path: "/user",
    element: (
      <PrivateRoute
        element={<Explore API_URL={API_URL} />}
      />
    ),
    title: "home"
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute
        element={<Explore API_URL={API_URL} />}
      />
    ),
    title: "about"
  }
];

export default AuthRoutes;
