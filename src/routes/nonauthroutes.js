import React from 'react';
import Explore from '../pages/Home';

const NonAuthRoutes = ({ API_URL }) => [
  {
    path: "/",
    element: <Explore API_URL={API_URL} />,
    title: "home"
  },
  {
    path: "/about",
    element: <Explore API_URL={API_URL} />,
    title: "about"
  },
  {
    path: "/login",
    element: <Explore API_URL={API_URL} />,
    title: "about"
  }
];

export default NonAuthRoutes;
