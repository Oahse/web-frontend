import React from 'react';
import Explore from '../pages/Home';
import About from '../pages/About';
import Signup from '../pages/SignUp';
import Login from '../pages/Login';
import Loginfingerprint from '../pages/Login-fingerprint';
import ForgotPassword from '../pages/ForgotPassword';
import Marketplace from '../pages/MarketPlace'; // Import your Marketplace component
import Map from '../pages/Map'; // Import your Map component
import Cart from '../pages/Cart'; // Import your Cart component
import User from '../pages/User'; // Import your User component

const NonAuthRoutes = ({ API_URL }) => [
  {
    path: "/",
    element: <Explore API_URL={API_URL} />,
    title: "home"
  },
  {
    path: "/about",
    element: <About API_URL={API_URL} />,
    title: "about"
  },
  {
    path: "/login",
    element: <Login API_URL={API_URL} />,
    title: "login"
  },
  {
    path: "/login-fingerprint",
    element: <Loginfingerprint API_URL={API_URL} />,
    title: "login-fingerprint"
  },
  {
    path: "/login-face",
    element: <Loginfingerprint API_URL={API_URL} />,
    title: "login-face"
  },
  {
    path: "/signup",
    element: <Signup API_URL={API_URL} />,
    title: "signup"
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword API_URL={API_URL} />,
    title: 'forgotpassword'
  },
  {
    path: "/marketplace",
    element: <Marketplace API_URL={API_URL} />,
    title: "marketplace"
  },
  {
    path: "/map",
    element: <Map API_URL={API_URL} />,
    title: "map"
  },
  {
    path: "/cart",
    element: <Cart API_URL={API_URL} />,
    title: "cart"
  },
  {
    path: "/user",
    element: <User API_URL={API_URL} />,
    title: "user"
  },
  {
    path: "/message",
    element: <User API_URL={API_URL} />,
    title: "message"
  },
];

export default NonAuthRoutes;
