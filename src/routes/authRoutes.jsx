// // src/routes/AuthRoutes.js

// import React from 'react';
// import Home from '../pages/Home/Home';
// import PrivateRoute from './privateRoutes';
// // import User from '../pages/User';
// // import OrderResult from '../pages/OrderResultPage';
// // import OrdersList from '../pages/Orders';
// // import Admin from '../pages/Admin/Admin';


// const AuthRoutes = ({ API_URL,Companyname,isLoggedIn,header, footer, bottomheader  }) => [
  
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute
//         element={<Home API_URL={API_URL} isLoggedIn={isLoggedIn} header={header} footer={footer} bottomheader={bottomheader}  />}
//       />
//     ),
//     title: "about"
//   },
//   // {
//   //   path: "/user/orders/:id",
//   //   element: <OrderResult API_URL={API_URL} Companyname={Companyname}/>,
//   //   title: "user"
//   // },
//   // {
//   //   path: "/user/orders",
//   //   element: <OrdersList API_URL={API_URL} Companyname={Companyname}/>,
//   //   title: "user"
//   // },
//   // {
//   //   path: "/user",
//   //   element: <User API_URL={API_URL} Companyname={Companyname}/>,
//   //   title: "user"
//   // },
//   // {
//   //   path: "/admin/dashboard",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname}/>,
//   //   title: "admin-dashboard"
//   // },
//   // {
//   //   path: "/admin/orders",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={1}/>,
//   //   title: "admin-orders"
//   // },
//   // {
//   //   path: "/admin/orders/:id",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={1}/>,
//   //   title: "admin-orders"
//   // },
//   // {
//   //   path: "/admin/orders/add",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={1} add />,
//   //   title: "admin-orders-add"
//   // },
//   // {
//   //   path: "/admin/products",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={2}/>,
//   //   title: "admin-products"
//   // },
//   // {
//   //   path: "/admin/products/:id",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={2}/>,
//   //   title: "admin-products"
//   // },
//   // {
//   //   path: "/admin/products/add",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={2} add />,
//   //   title: "admin-products-add"
//   // },
//   // {
//   //   path: "/admin/customers",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={3}/>,
//   //   title: "admin-customers"
//   // },
//   // {
//   //   path: "/admin/customers/:id",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={3}/>,
//   //   title: "admin-customers"
//   // },
//   // {
//   //   path: "/admin/customers/add",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={3} add />,
//   //   title: "admin-customers-add"
//   // },
//   // {
//   //   path: "/admin/contents",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={4}/>,
//   //   title: "admin-contents"
//   // },
//   // {
//   //   path: "/admin/finance",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={5}/>,
//   //   title: "admin-finance"
//   // },
//   // {
//   //   path: "/admin/finance/:id",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={5}/>,
//   //   title: "admin-finance"
//   // },
//   // {
//   //   path: "/admin/analytics",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={6}/>,
//   //   title: "admin-analytics"
//   // },
//   // {
//   //   path: "/admin/discounts",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={7}/>,
//   //   title: "admin-discounts"
//   // },
//   // {
//   //   path: "/admin/discounts/:id",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={7}/>,
//   //   title: "admin-discounts"
//   // },
//   // {
//   //   path: "/admin/discounts/add",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={7} add />,
//   //   title: "admin-discounts-add"
//   // },
//   // {
//   //   path: "/admin/marketing",
//   //   element: <Admin API_URL={API_URL} Companyname={Companyname} activePage={8}/>,
//   //   title: "admin-marketing"
//   // },
// ];

// export default AuthRoutes;
