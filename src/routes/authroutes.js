// src/routes/AuthRoutes.js

import React from 'react';
import Explore from '../pages/Home';
import PrivateRoute from './privateRoute';
import User from '../pages/User';
import OrderResult from '../pages/OrderResultPage';
import OrdersList from '../pages/Orders';
import AdminDashBoard from '../pages/Admin/Dashboard';

const AuthRoutes = ({ API_URL,Companyname }) => [
  
  {
    path: "/dashboard",
    element: (
      <PrivateRoute
        element={<Explore API_URL={API_URL} />}
      />
    ),
    title: "about"
  },
  {
    path: "/user/orders/:id",
    element: <OrderResult API_URL={API_URL} Companyname={Companyname}/>,
    title: "user"
  },
  {
    path: "/user/orders",
    element: <OrdersList API_URL={API_URL} Companyname={Companyname}/>,
    title: "user"
  },
  {
    path: "/user",
    element: <User API_URL={API_URL} Companyname={Companyname}/>,
    title: "user"
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashBoard API_URL={API_URL} Companyname={Companyname}/>,
    title: "admin-dashboard"
  },
];

export default AuthRoutes;
