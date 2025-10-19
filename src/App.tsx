import React, { Suspense, lazy } from 'react';
import { NotificationProvider } from './contexts/NotificationContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, AuthLayout } from './components/layout/Layout';
import { AdminLayout } from './components/admin/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { FontLoader } from './components/ui/FontLoader';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CategoryProvider } from './contexts/CategoryContext';
// import { initPerformanceMonitoring } from './utils/performance';
import ErrorBoundary from './components/common/ErrorBoundary';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const ProductList = lazy(() =>
  import('./pages/ProductList').then((module) => ({ default: module.ProductList }))
);
const ProductDetails = lazy(() =>
  import('./pages/ProductDetails').then((module) => ({ default: module.ProductDetails }))
);
const Cart = lazy(() => import('./pages/Cart').then((module) => ({ default: module.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then((module) => ({ default: module.Checkout })));
const Account = lazy(() => import('./pages/Account').then((module) => ({ default: module.Account })));
const Login = lazy(() => import('./pages/Login').then((module) => ({ default: module.Login })));
const ForgotPassword = lazy(() =>
  import('./pages/ForgotPassword').then((module) => ({ default: module.ForgotPassword }))
);
const Register = lazy(() => import('./pages/Register').then((module) => ({ default: module.Register })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const FAQ = lazy(() => import('./pages/FAQ').then((module) => ({ default: module.FAQ })));
const Blog = lazy(() => import('./pages/Blog').then((module) => ({ default: module.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then((module) => ({ default: module.BlogPost })));
const Wishlist = lazy(() => import('./pages/Wishlist').then((module) => ({ default: module.Wishlist })));
const Subscription = lazy(() =>
  import('./pages/Subscription').then((module) => ({ default: module.Subscription }))
);
const TermsAndConditions = lazy(() =>
  import('./pages/TermsAndConditions').then((module) => ({ default: module.TermsAndConditions }))
);
const PrivacyPolicy = lazy(() =>
  import('./pages/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy }))
);
const EmailVerification = lazy(() =>
  import('./pages/EmailVerification').then((module) => ({ default: module.EmailVerification }))
);
const ResetPassword = lazy(() =>
  import('./pages/ResetPassword').then((module) => ({ default: module.ResetPassword }))
);
// Lazy load admin pages
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard }))
);
const AdminProducts = lazy(() =>
  import('./pages/admin/AdminProducts').then((module) => ({ default: module.AdminProducts }))
);
const AdminUsers = lazy(() =>
  import('./pages/admin/AdminUsers').then((module) => ({ default: module.AdminUsers }))
);
const AdminOrders = lazy(() =>
  import('./pages/admin/AdminOrders').then((module) => ({ default: module.AdminOrders }))
);
const AdminAnalytics = lazy(() =>
  import('./pages/admin/AdminAnalytics').then((module) => ({ default: module.AdminAnalytics }))
);
const AdminRegister = lazy(() =>
  import('./pages/admin/AdminRegister').then((module) => ({ default: module.AdminRegister }))
);

// Loading component
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export function App() {
  // Debug: Log React version
  console.log('React version:', React.version);

  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID||''}>
        <AuthProvider>
          <ThemeProvider>
            <CartProvider>
              <WishlistProvider>
                <NotificationProvider>
                  <WebSocketProvider autoConnect={false}>
                    <CategoryProvider>
                      <FontLoader />
                      <Toaster
                        position="top-right"
                        toastOptions={{
                          success: {
                            style: {
                              background: 'var(--color-success)',
                              color: 'var(--color-copy-inverse)',
                            },
                          },
                          error: {
                            style: {
                              background: 'var(--color-error)',
                              color: 'var(--color-copy-inverse)',
                            },
                          },
                          loading: {
                            style: {
                              background: 'var(--color-surface-elevated)',
                              color: 'var(--color-copy)',
                            },
                          },
                          blank: {
                            style: {
                              background: 'var(--color-surface)',
                              color: 'var(--color-copy)',
                            },
                          },
                        }}
                      />
                      <BrowserRouter>
                            <Elements stripe={stripePromise}>
                                <Suspense fallback={<PageLoading />}>
                                    <Routes>
                            <Route
                              path="/admin"
                              element={
                                <AdminLayout>
                                  <AdminDashboard />
                                </AdminLayout>
                              }
                            />
                            <Route
                              path="/admin/products"
                              element={
                                <AdminLayout>
                                  <AdminProducts />
                                </AdminLayout>
                              }
                            />
                            <Route
                              path="/admin/users"
                              element={
                                <AdminLayout>
                                  <AdminUsers />
                                </AdminLayout>
                              }
                            />
                            <Route
                              path="/admin/orders"
                              element={
                                <AdminLayout>
                                  <AdminOrders />
                                </AdminLayout>
                              }
                            />
                            <Route
                              path="/admin/analytics"
                              element={
                                <AdminLayout>
                                  <AdminAnalytics />
                                </AdminLayout>
                              }
                            />
                            <Route path="/admin/register" element={<AuthLayout><AdminRegister /></AuthLayout>} />
                            <Route path="/admin/login" element={<AuthLayout><Login /></AuthLayout>} />
                            <Route path="/" element={<Layout><Home /></Layout>} />

                            <Route path="/products" element={<Layout><ProductList /></Layout>} />
                            <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
                            <Route path="/cart" element={<Layout><Cart /></Layout>} />
                            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                            <Route path="/account/*" element={<Layout><Account /></Layout>} />
                            <Route
                              path="/login"
                              element={
                                <Layout>
                                  <Login />
                                </Layout>
                              }
                            />
                            <Route
                              path="/forgot-password"
                              element={
                                <Layout>
                                  <ForgotPassword />
                                </Layout>
                              }
                            />
                            <Route path="/register" element={<Layout><Register /></Layout>} />
                            <Route path="/about" element={<Layout><About /></Layout>} />
                            <Route path="/contact" element={<Layout><Contact /></Layout>} />
                            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
                            <Route path="/blog" element={<Layout><Blog /></Layout>} />
                            <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
                            <Route path="/account/wishlist" element={<Layout><Wishlist /></Layout>} />
                            <Route
                              path="/subscription"
                              element={
                                <Layout>
                                  <Subscription />
                                </Layout>
                              }
                            />
                            <Route
                              path="/terms"
                              element={
                                <Layout>
                                  <TermsAndConditions />
                                </Layout>
                              }
                            />
                            <Route
                              path="/privacy"
                              element={
                                <Layout>
                                  <PrivacyPolicy />
                                </Layout>
                              }
                            />
                            <Route path="/verify-email" element={<Layout><EmailVerification /></Layout>} />
                            <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
                                                              </Routes>
                                                          </Suspense>
                                                      </Elements>
                                                </BrowserRouter>                    </CategoryProvider>
                  </WebSocketProvider>
                </NotificationProvider>
              </WishlistProvider>
            </CartProvider>
          </ThemeProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}