import React from 'react';
import { createLazyRoute, withSuspense } from '../../utils/lazyLoading';
import { Skeleton } from '../ui/Skeleton';

// Enhanced loading components with skeletons
const PageSkeleton = () => (
  <div className="min-h-screen bg-background p-4">
    <div className="max-w-7xl mx-auto">
      <Skeleton variant="rectangular" width="100%" height={60} className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Skeleton variant="rectangular" width="100%" height={400} className="mb-4" />
          <Skeleton variant="text" width="80%" height={24} className="mb-2" />
          <Skeleton variant="text" width="60%" height={20} className="mb-2" />
          <Skeleton variant="text" width="90%" height={20} />
        </div>
        <div>
          <Skeleton variant="rectangular" width="100%" height={200} className="mb-4" />
          <Skeleton variant="text" width="100%" height={20} className="mb-2" />
          <Skeleton variant="text" width="80%" height={20} />
        </div>
      </div>
    </div>
  </div>
);

const ProductListSkeleton = () => (
  <div className="min-h-screen bg-background p-4">
    <div className="max-w-7xl mx-auto">
      <Skeleton variant="text" width={300} height={32} className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4">
            <Skeleton variant="rectangular" width="100%" height={200} className="mb-4" />
            <Skeleton variant="text" width="100%" height={20} className="mb-2" />
            <Skeleton variant="text" width="60%" height={16} className="mb-2" />
            <Skeleton variant="text" width="40%" height={20} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-background p-4">
    <div className="max-w-7xl mx-auto">
      <Skeleton variant="text" width={200} height={32} className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6">
            <Skeleton variant="text" width="80%" height={16} className="mb-2" />
            <Skeleton variant="text" width="60%" height={24} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </div>
    </div>
  </div>
);

// Optimized lazy routes with preloading for critical paths
export const OptimizedRoutes = {
  // Critical routes - preload immediately
  Home: withSuspense(
    createLazyRoute(() => import('../../pages/Home').then(m => ({ default: m.Home })), true),
    <PageSkeleton />
  ),
  
  ProductList: withSuspense(
    createLazyRoute(() => import('../../pages/ProductList').then(m => ({ default: m.ProductList })), true),
    <ProductListSkeleton />
  ),
  
  ProductDetails: withSuspense(
    createLazyRoute(() => import('../../pages/ProductDetails').then(m => ({ default: m.ProductDetails })), true),
    <PageSkeleton />
  ),

  // Important routes - preload after initial load
  Cart: withSuspense(
    createLazyRoute(() => import('../../pages/Cart').then(m => ({ default: m.Cart })), false),
    <PageSkeleton />
  ),
  
  Login: withSuspense(
    createLazyRoute(() => import('../../pages/Login').then(m => ({ default: m.Login })), false),
    <PageSkeleton />
  ),
  
  Register: withSuspense(
    createLazyRoute(() => import('../../pages/Register').then(m => ({ default: m.Register })), false),
    <PageSkeleton />
  ),

  // Admin routes - lazy load only when needed
  AdminDashboard: withSuspense(
    createLazyRoute(() => import('../../pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })), false),
    <DashboardSkeleton />
  ),
  
  AdminProducts: withSuspense(
    createLazyRoute(() => import('../../pages/admin/AdminProducts').then(m => ({ default: m.AdminProducts })), false),
    <ProductListSkeleton />
  ),
  
  AdminUsers: withSuspense(
    createLazyRoute(() => import('../../pages/admin/AdminUsers').then(m => ({ default: m.AdminUsers })), false),
    <DashboardSkeleton />
  ),
  
  AdminOrders: withSuspense(
    createLazyRoute(() => import('../../pages/admin/AdminOrders').then(m => ({ default: m.AdminOrders })), false),
    <DashboardSkeleton />
  ),
  
  AdminAnalytics: withSuspense(
    createLazyRoute(() => import('../../pages/admin/AdminAnalytics').then(m => ({ default: m.AdminAnalytics })), false),
    <DashboardSkeleton />
  ),

  // Secondary routes - lazy load
  Account: withSuspense(
    createLazyRoute(() => import('../../pages/Account').then(m => ({ default: m.Account })), false),
    <PageSkeleton />
  ),
  
  Checkout: withSuspense(
    createLazyRoute(() => import('../../pages/Checkout').then(m => ({ default: m.Checkout })), false),
    <PageSkeleton />
  ),
  
  About: withSuspense(
    createLazyRoute(() => import('../../pages/About').then(m => ({ default: m.About })), false),
    <PageSkeleton />
  ),
  
  Contact: withSuspense(
    createLazyRoute(() => import('../../pages/Contact').then(m => ({ default: m.Contact })), false),
    <PageSkeleton />
  ),
  
  FAQ: withSuspense(
    createLazyRoute(() => import('../../pages/FAQ').then(m => ({ default: m.FAQ })), false),
    <PageSkeleton />
  ),
  
  Blog: withSuspense(
    createLazyRoute(() => import('../../pages/Blog').then(m => ({ default: m.Blog })), false),
    <PageSkeleton />
  ),
  
  BlogPost: withSuspense(
    createLazyRoute(() => import('../../pages/BlogPost').then(m => ({ default: m.BlogPost })), false),
    <PageSkeleton />
  ),
  
  ForgotPassword: withSuspense(
    createLazyRoute(() => import('../../pages/ForgotPassword').then(m => ({ default: m.ForgotPassword })), false),
    <PageSkeleton />
  ),
  
  Subscription: withSuspense(
    createLazyRoute(() => import('../../pages/Subscription').then(m => ({ default: m.Subscription })), false),
    <PageSkeleton />
  ),
  
  TermsAndConditions: withSuspense(
    createLazyRoute(() => import('../../pages/TermsAndConditions').then(m => ({ default: m.TermsAndConditions })), false),
    <PageSkeleton />
  ),
  
  PrivacyPolicy: withSuspense(
    createLazyRoute(() => import('../../pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })), false),
    <PageSkeleton />
  ),
  
  AdminRegister: withSuspense(
    createLazyRoute(() => import('../../pages/admin/AdminRegister').then(m => ({ default: m.AdminRegister })), false),
    <PageSkeleton />
  )
};

// Route preloader utility
export const preloadRoutes = () => {
  // Preload critical routes after initial render
  setTimeout(() => {
    import('../../pages/Cart');
    import('../../pages/Login');
    import('../../pages/Register');
  }, 2000);
  
  // Preload admin routes when user hovers over admin links
  const preloadAdminRoutes = () => {
    import('../../pages/admin/AdminDashboard');
    import('../../pages/admin/AdminProducts');
    import('../../pages/admin/AdminUsers');
  };
  
  // Add hover listeners for admin navigation
  const adminLinks = document.querySelectorAll('[href*="/admin"]');
  adminLinks.forEach(link => {
    link.addEventListener('mouseenter', preloadAdminRoutes, { once: true });
  });
};