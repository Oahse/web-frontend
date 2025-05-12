import React from 'react';
import Home from '@/pages/home';
import Products from '@/pages/products'; // assuming Bookings component exists
import SignUp from '@/pages/auth/signup'; // assuming SignUp component exists
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

const NonAuthRoutes = ({ API_URL, Companyname, isLoggedIn, user, header, footer, bottomheader}) => [
  {
    path: "/",
    element: <Home API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "home"
  },
  {
    path:'/admin',
    element:<DashBoard API_URL={API_URL}  Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user}  />,
    title:'dashboard'
  },
  {
    path: "/admin/products",
    element: <AdminProducts API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "admin-products"
  },
  {
    path: "/admin/products/add",
    element: <AddAdminProducts API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminadd-products"
  },
  {
    path: "/admin/products/:id",
    element: <ViewAdminProducts API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminview-products"
  },
  {
    path: "/admin/categories",
    element: <AdminCategories API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "admin-categories"
  },
  {
    path: "/admin/categories/add",
    element: <AddAdminCategory API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminadd-products"
  },
  {
    path: "/admin/categories/:id",
    element: <ViewAdminCategory API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminview-categories"
  },
  {
    path: "/admin/attributes",
    element: <AdminAttributes API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "admin-attributes"
  },
  {
    path: "/admin/attributes/add",
    element: <AddAdminAttributes API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminadd-attributes"
  },
  {
    path: "/admin/attributes/:id",
    element: <ViewAdminAttributes API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminview-attributes"
  },
  {
    path: "/admin/orders",
    element: <AdminOrders API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "admin-attributes"
  },
  {
    path: "/admin/orders/:id/track",
    element: <TrackAdminOrders API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminadd-orders"
  },
  {
    path: "/admin/orders/:id",
    element: <ViewAdminOrders API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminview-orders"
  },
  {
    path: "/admin/users",
    element: <AdminUsers API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminusers"
  },
  {
    path: "/admin/users/:id",
    element: <ViewAdminUser API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminusers-view"
  },
  {
    path: "/admin/users/add",
    element: <AddAdminUsers API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminusers-add"
  },
  {
    path: "/admin/login",
    element: <AdminLogin API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminlogin"
  },
  {
    path: "/admin/signup",
    element: <AdminSignUp API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "adminsignup"
  },
  {
    path: "/admin/storesetting",
    element: <AdminStoreSetting isLoggedIn={isLoggedIn} loggedInUser={user}/>,
    title: "adminstoresetting"
  },
  {
    path: "/admin/report",
    element: <AdminReport isLoggedIn={isLoggedIn} loggedInUser={user}/>,
    title: "adminreport"
  },
  {
    path: "/admin/settings",
    element: <AdminSetting isLoggedIn={isLoggedIn} loggedInUser={user}/>,
    title: "adminsettings"
  },
  {
    path: "/admin/faqs",
    element: <AdminFaqs isLoggedIn={isLoggedIn} loggedInUser={user}/>,
    title: "adminfaqs"
  },
  {
    path: "/products",
    element: <Products API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "products"
  },
  {
    path: "/products/:categoryid",
    element: <ProductDetails API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "product-details"
  },
  {
    path: "/products/search?q=term",
    element: <Account API_URL={API_URL} Companyname={Companyname} index={0} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "search-results"
  },
  {
    path: "/account/cart",
    element: <Cart API_URL={API_URL} Companyname={Companyname} index={1} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "cart"
  },
  {
    path: "/account/wishlist",
    element: <Account API_URL={API_URL} Companyname={Companyname} index={2} isLoggedIn={isLoggedIn}loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "wishlist"
  },
  {
    path: "/account/orders/:orderId/checkout",
    element: <Checkout API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "checkout"
  },
  {
    path: "/account/orders/:orderId/payment",
    element: <Payment API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "payment"
  },
  {
    path: "/login",
    element: <Account API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "login"
  },
  {
    path: "/register",
    element: <SignUp API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "register"
  },
  {
    path: "/account",
    element: <Account API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "account"
  },
  {
    path: "/account/settings",
    element: <Account API_URL={API_URL} Companyname={Companyname} index={3} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "settings"
  },
  {
    path: "/account/orders",
    element: <AccountOrders API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "invoice"
  },
  {
    path: "/account/orders/:orderId",
    element: <AccountOrdersDetails API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "invoice"
  },
  {
    path: "/account/orders/:orderId/invoice",
    element: <Invoice API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "invoice"
  },
  {
    path: "/faq",
    element: <Faq API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "faq"
  },
  {
    path: "/blog",
    element: <Blog API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "blog"
  },
  {
    path: "/blog/:blogtitle",
    element: <BlogDetail API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "blog-detail"
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "privacy-policy"
  },
  {
    path: "/terms",
    element: <Terms API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "terms"
  },
  {
    path: "/refund-policy",
    element: <RefundPolicy API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "refund-policy"
  },
  {
    path: "/shipping",
    element: <Shipping API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "shipping"
  },
  {
    path: "/about",
    element: <About API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "about"
  },
  {
    path: "/contact",
    element: <Contact API_URL={API_URL} Companyname={Companyname} isLoggedIn={isLoggedIn} loggedInUser={user} header={header} footer={footer} bottomheader={bottomheader} />,
    title: "contact"
  },
];

export default NonAuthRoutes;
