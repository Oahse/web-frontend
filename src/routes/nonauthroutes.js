import React from 'react';
import Explore from '../pages/Home';
import Signup from '../pages/SignUp';

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
  },
  {
    path: "/signup",
    element: <Signup API_URL={API_URL} />,
    title: "signup"
  }
];

export default NonAuthRoutes;
