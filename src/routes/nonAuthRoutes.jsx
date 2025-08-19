import React from 'react';
import Home from '@/pages/home';
import Products from '@/pages/products'; // assuming Bookings component exists
import SignUp from '@/pages/auth/signup'; // assuming SignUp component exists
import Login from '@/pages/auth/login'; // assuming SignUp component exists
import ResetPassword from '@/pages/auth/reset-password';
import Account from '@/pages/auth/account'; // assuming Account component exists
import Cart from '@/pages/cart';
import ProductDetails from '@/pages/productdetails'; // assuming ProductDetails component exists
import Checkout from '@/pages/checkout'; // assuming Checkout component exists
import Payment from '@/pages/payment'; // assuming OrderSuccess component exists
import Blog from '@/pages/blog'; // assuming Blog component exists
import BlogDetail from '@/pages/blogDetail'; // assuming BlogDetail component exists
import PrivacyPolicy from '@/pages/privacy-policy'; // assuming PrivacyPolicy component exists
import Terms from '@/pages/terms'; // assuming Terms component exists
import RefundPolicy from '@/pages/refund-policy'; // assuming RefundPolicy component exists
import Shipping from '@/pages/shipping'; // assuming Cookies component exists
import Faq from '@/pages/faq'; // assuming Faq component exists
import About from '@/pages/about'; // assuming About component exists
import Contact from '@/pages/contact'; // assuming Contact component exists
import AccountOrdersDetails from '@/pages/auth/accountorderdetails';
import AccountOrders from '@/pages/auth/accountorders'
import Invoice from '@/pages/auth/invoice'
import DashBoard from '@/pages/admin/dashboard';
import AdminProducts from '@/pages/admin/products/Products';
import AddAdminProducts from '@/pages/admin/products/AddProduct';
import ViewAdminProducts from '@/pages/admin/products/ViewProduct';
import AdminAttributes from '@/pages/admin/attributes/Attributes';
import AddAdminAttributes from '@/pages/admin/attributes/AddAttribute';
import ViewAdminAttributes from '@/pages/admin/attributes/ViewAttribute';
import AdminCategories from '@/pages/admin/categories/Categories';
import AddAdminCategory from '@/pages/admin/categories/AddCategory';
import ViewAdminCategory from '@/pages/admin/categories/ViewCategory';
import AdminOrders from '@/pages/admin/orders/Orders';
import TrackAdminOrders from '@/pages/admin/orders/TrackOrder';
import ViewAdminOrders from '@/pages/admin/orders/ViewOrder';
import AdminUsers from '@/pages/admin/users/Users';
import ViewAdminUser from '@/pages/admin/users/ViewUser';
import AddAdminUsers from '@/pages/admin/users/AddUser';
import AdminLogin from '@/pages/admin/auth/Login';
import AdminSignUp from '@/pages/admin/auth/SignUp';
import AdminStoreSetting from '@/pages/admin/onlinestore/settings';
import AdminReport from '@/pages/admin/reports';
import AdminFaqs from '@/pages/admin/faq';
import AdminSetting from '@/pages/admin/settings';
import AccountDetails from '@/pages/auth/accountdetails';
import AccountAddress from '@/pages/auth/accountaddress';
import AccountWishlist from '@/pages/auth/accountwishlist';

const NonAuthRoutes = ({ API_URL, Companyname, isLoggedIn, user, header, footer, bottomheader, props}) => [
  {
    path: "/",
    element: <Home API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "home"
  },
  {
    path:'/admin',
    element:<DashBoard API_URL={API_URL}  Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user}  categories={props.categories} />,
    title:'dashboard'
  },
  {
    path: "/admin/products",
    element: <AdminProducts API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "admin-products"
  },
  {
    path: "/admin/products/add",
    element: <AddAdminProducts API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminadd-products"
  },
  {
    path: "/admin/products/:id",
    element: <ViewAdminProducts API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminview-products"
  },
  {
    path: "/admin/categories",
    element: <AdminCategories API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "admin-categories"
  },
  {
    path: "/admin/categories/add",
    element: <AddAdminCategory API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminadd-products"
  },
  {
    path: "/admin/categories/:id",
    element: <ViewAdminCategory API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminview-categories"
  },
  {
    path: "/admin/attributes",
    element: <AdminAttributes API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "admin-attributes"
  },
  {
    path: "/admin/attributes/add",
    element: <AddAdminAttributes API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminadd-attributes"
  },
  {
    path: "/admin/attributes/:id",
    element: <ViewAdminAttributes API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminview-attributes"
  },
  {
    path: "/admin/orders",
    element: <AdminOrders API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "admin-attributes"
  },
  {
    path: "/admin/orders/:id/track",
    element: <TrackAdminOrders API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "admintrack-orders"
  },
  {
    path: "/admin/orders/:id",
    element: <ViewAdminOrders API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminview-orders"
  },
  {
    path: "/admin/users",
    element: <AdminUsers API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminusers"
  },
  {
    path: "/admin/users/:id",
    element: <ViewAdminUser API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminusers-view"
  },
  {
    path: "/admin/users/add",
    element: <AddAdminUsers API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminusers-add"
  },
  {
    path: "/admin/login",
    element: <AdminLogin API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminlogin"
  },
  {
    path: "/admin/signup",
    element: <AdminSignUp API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "adminsignup"
  },
  {
    path: "/admin/storesetting",
    element: <AdminStoreSetting isLoggedIn={isLoggedIn} loggedInUser={user} categories={props.categories} />,
    title: "adminstoresetting"
  },
  {
    path: "/admin/report",
    element: <AdminReport isLoggedIn={isLoggedIn} loggedInUser={user} categories={props.categories} />,
    title: "adminreport"
  },
  {
    path: "/admin/settings",
    element: <AdminSetting isLoggedIn={isLoggedIn} loggedInUser={user} categories={props.categories} />,
    title: "adminsettings"
  },
  {
    path: "/admin/faqs",
    element: <AdminFaqs isLoggedIn={isLoggedIn} loggedInUser={user} categories={props.categories} />,
    title: "adminfaqs"
  },
  {
    path: "/products",
    element: <Products API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader}  categories={props.categories} />,
    title: "products"
  },
  {
    path: "/products/:id",
    element: <ProductDetails API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "product-details"
  },
  {
    path: "/products/search",
    element: <Products API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader}  categories={props.categories} />,
    title: "search-results"
  },
  {
    path: "/account/cart",
    element: <Cart categories={props.categories} />,
    title: "cart"
  },
  {
    path: "/account/wishlist",
    element: <AccountWishlist API_URL={API_URL} Companyname={Companyname} index={2} isLoggedIn={isLoggedIn}loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "account-wishlist"
  },
  {
    path: "/account/orders/checkout",
    element: <Checkout API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "checkout"
  },
  {
    path: "/account/orders/:orderId/payment",
    element: <Payment API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "payment"
  },
  {
    path: "/login",
    element: <Login API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "login"
  },
  {
    path: "/resetpassword",
    element: <ResetPassword API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "resetpassword"
  },
  {
    path: "/register",
    element: <SignUp API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "register"
  },
  {
    path: "/account",
    element: <Account API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "account"
  },
  {
    path: "/account/details",
    element: <AccountDetails API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "account-details"
  },
  {
    path: "/account/address",
    element: <AccountAddress API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "account-address"
  },
  
  {
    path: "/account/settings",
    element: <AccountDetails API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "settings"
  },
  {
    path: "/account/orders",
    element: <AccountOrders API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "invoice"
  },
  {
    path: "/account/orders/:orderId",
    element: <AccountOrdersDetails API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "invoice"
  },
  {
    path: "/account/orders/:orderId/invoice",
    element: <Invoice API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "invoice"
  },
  {
    path: "/faq",
    element: <Faq API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "faq"
  },
  {
    path: "/blog",
    element: <Blog API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "blog"
  },
  {
    path: "/blog/:blogtitle",
    element: <BlogDetail API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "blog-detail"
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "privacy-policy"
  },
  {
    path: "/terms",
    element: <Terms API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "terms"
  },
  {
    path: "/refund-policy",
    element: <RefundPolicy API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "refund-policy"
  },
  {
    path: "/shipping",
    element: <Shipping API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "shipping"
  },
  {
    path: "/about",
    element: <About API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "about"
  },
  {
    path: "/contact",
    element: <Contact API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} categories={props.categories} />,
    title: "contact"
  },
];

export default NonAuthRoutes;
