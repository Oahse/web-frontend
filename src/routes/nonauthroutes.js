import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Signup from '../pages/SignUp';
import Login from '../pages/Login';
import Loginfingerprint from '../pages/Login-fingerprint';
import ForgotPassword from '../pages/ForgotPassword';
import Marketplace from '../pages/MarketPlace'; // Import your Marketplace component
import Map from '../pages/Map'; // Import your Map component
import Cart from '../pages/Cart'; // Import your Cart component
import User from '../pages/User'; // Import your User component
import Categories from '../pages/Categories';


const NonAuthRoutes = ({ API_URL,Companyname }) => [
  {
    path: "/home",
    element: <Home API_URL={API_URL} Companyname={Companyname} />,
    title: "home"
  },
  {
    path: "/about",
    element: <About API_URL={API_URL} Companyname={Companyname}/>,
    title: "about"
  },
  {
    path: "/login",
    element: <Login API_URL={API_URL} Companyname={Companyname}/>,
    title: "login"
  },
  {
    path: "/login-fingerprint",
    element: <Loginfingerprint API_URL={API_URL} Companyname={Companyname}/>,
    title: "login-fingerprint"
  },
  {
    path: "/login-face",
    element: <Loginfingerprint API_URL={API_URL} Companyname={Companyname}/>,
    title: "login-face"
  },
  {
    path: "/signup",
    element: <Signup API_URL={API_URL} Companyname={Companyname}/>,
    title: "signup"
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword API_URL={API_URL} Companyname={Companyname}/>,
    title: 'forgotpassword'
  },
  {
    path: "/",
    element: <Marketplace API_URL={API_URL} Companyname={Companyname}/>,
    title: "marketplace"
  },
  {
    path: "/categories/:id",
    element: <Categories API_URL={API_URL} Companyname={Companyname}/>,
    title: "categories"
  },
  {
    path: "/map",
    element: <Map API_URL={API_URL} Companyname={Companyname}/>,
    title: "map"
  },
  {
    path: "/cart",
    element: <Cart API_URL={API_URL} Companyname={Companyname}/>,
    title: "cart"
  },
  {
    path: "/user",
    element: <User API_URL={API_URL} Companyname={Companyname}/>,
    title: "user"
  },
  {
    path: "/message",
    element: <User API_URL={API_URL} Companyname={Companyname}/>,
    title: "message"
  },
];

export default NonAuthRoutes;
