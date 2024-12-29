import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Signup from '../pages/SignUp';
import SignUpForSuppliers from '../pages/SignUpForSuppliers'
import Login from '../pages/Login';
import Loginfingerprint from '../pages/Login-fingerprint';
import ForgotPassword from '../pages/ForgotPassword';
import Marketplace from '../pages/MarketPlace'; // Import your Marketplace component
import Map from '../pages/Map'; // Import your Map component
import Cart from '../pages/Cart'; // Import your Cart component
import User from '../pages/User'; // Import your User component
import Categories from '../pages/Categories';
import PaymentConfirmation from '../pages/PaymentConfirmation';
import OrderResult from '../pages/OrderResultPage';
import TrackingOrder from '../pages/OrderTracking';
import VerifyMail from '../pages/VerifyMail';
import VerifyMailConfirmation from '../pages/VerifyMailConfirmation';
import PasswordReset from '../pages/PasswordReset';
import ProductPage from '../pages/ProductItem';
import LogoutPage from '../pages/Logout';
import Test from '../pages/TestingPage'


const NonAuthRoutes = ({ API_URL,Companyname }) => [
  {
    path: "/",
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
    path: "/logout",
    element: <LogoutPage/>,
    title: "logout"
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
    path: "/signup-for-suppliers",
    element: <SignUpForSuppliers API_URL={API_URL} Companyname={Companyname}/>,
    title: "signUpForSuppliers"
  },
  {
    path: "/verify-email-otp",
    element: <VerifyMail API_URL={API_URL} Companyname={Companyname}/>,
    title: "verify-email-otp"
  },
  {
    path: "/verify-email-confirmation",
    element: <VerifyMailConfirmation API_URL={API_URL} Companyname={Companyname}/>,
    title: "verify-email-confirmation"
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword API_URL={API_URL} Companyname={Companyname}/>,
    title: 'forgotpassword'
  },
  {
    path: "/passwordreset",
    element: <PasswordReset API_URL={API_URL} Companyname={Companyname}/>,
    title: 'passwordreset'
  },
  {
    path: "/shop",
    element: <Marketplace API_URL={API_URL} Companyname={Companyname}/>,
    title: "shop"
  },
  {
    path: "/categories/:id",
    element: <Categories API_URL={API_URL} Companyname={Companyname}/>,
    title: "categories"
  },
  {
    path:"/products/:id",
    element:<ProductPage API_URL={API_URL} Companyname={Companyname}/>,
    title:'productitem'
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
    path: "/payment/confirmation",
    element: <PaymentConfirmation API_URL={API_URL} Companyname={Companyname}/>,
    title: "payment"
  },
  {
    path: "/payment/confirmation/orderresult",
    element: <OrderResult API_URL={API_URL} Companyname={Companyname}/>,
    title: "orderresult"
  },
  {
    path: "/payment/order/:id",
    element: <TrackingOrder API_URL={API_URL} Companyname={Companyname}/>,
    title: "trackingorder"
  },
  {
    path: "/user",
    element: <User API_URL={API_URL} Companyname={Companyname}/>,
    title: "user"
  },
  {
    path: "/user/orders/:id",
    element: <User API_URL={API_URL} Companyname={Companyname}/>,
    title: "user"
  },
  {
    path: "/message",
    element: <User API_URL={API_URL} Companyname={Companyname}/>,
    title: "message"
  },
  {
    path: "/test",
    element: <Test API_URL={API_URL} Companyname={Companyname}/>,
    title: "testPage"
  }, 
];

export default NonAuthRoutes;
