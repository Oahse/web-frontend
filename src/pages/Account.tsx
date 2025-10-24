import React, { useEffect, Suspense, lazy } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, ShoppingBagIcon, HeartIcon, MapPinIcon, CreditCardIcon, BellIcon, LogOutIcon, ChevronRightIcon, PaletteIcon, SettingsIcon, PackageIcon, ShieldIcon } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';

// Lazy load account components
const Dashboard = lazy(() => import('../components/account/Dashboard'));
const Orders = lazy(() => import('../components/account/Orders'));
const Wishlist = lazy(() => import('../components/account/Wishlist'));
const Addresses = lazy(() => import('../components/account/Addresses'));
const ThemeSettings = lazy(() =>
  import('../components/account/ThemeSettings').then((module) => ({ default: module.ThemeSettings }))
);
const NotificationSettings = lazy(() =>
  import('../components/account/NotificationSettings').then((module) => ({ default: module.NotificationSettings }))
);
const PaymentMethods = lazy(() =>
  import('../components/account/PaymentMethods').then((module) => ({ default: module.PaymentMethods }))
);

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Main Account Component
export const Account: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isSupplier } = useAuth();
  const { items } = useWishlist();

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <LoadingSpinner />;
  }

  // Define sidebar navigation items
  const navItems = [
    { path: '/account', label: 'Dashboard', icon: <UserIcon size={20} /> },
    { path: '/account/orders', label: 'Orders', icon: <ShoppingBagIcon size={20} /> },
    { path: '/account/wishlist', label: 'Wishlist', icon: <HeartIcon size={20} /> },
    { path: '/account/addresses', label: 'Addresses', icon: <MapPinIcon size={20} /> },
    { path: '/account/payment-methods', label: 'Payment Methods', icon: <CreditCardIcon size={20} /> },
    { path: '/account/notifications', label: 'Notifications', icon: <BellIcon size={20} /> },
    { path: '/account/theme', label: 'Theme Settings', icon: <PaletteIcon size={20} /> },
  ];

  // Add supplier/admin specific items if applicable
  if (isSupplier) {
    navItems.splice(2, 0, {
      path: '/account/products',
      label: 'My Products',
      icon: <PackageIcon size={20} />,
    });
  }
  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin Dashboard', icon: <ShieldIcon size={20} /> });
  }

  const isActive = (path: string) => {
    if (path === '/account') {
      return location.pathname === '/account';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm items-center">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-main">My Account</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-surface rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                {user.firstname?.charAt(0) || user.full_name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-main">{user.full_name || `${user.firstname} ${user.lastname}`}</h3>
                <p className="text-copy-light text-sm">{user.email}</p>
              </div>
            </div>
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-2 rounded-md ${
                        isActive(item.path)
                          ? 'bg-primary text-white'
                          : 'text-copy-light hover:bg-background'
                      }`}>
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                      {item.path === '/account/wishlist' && items && items.length > 0 && (
                        <span className="ml-auto bg-border text-copy-light text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {items.length}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 rounded-md text-red-500 hover:bg-red-50 w-full text-left">
                    <LogOutIcon size={20} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/addresses" element={<Addresses />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/notifications" element={<NotificationSettings />} />
              <Route path="/theme" element={<ThemeSettings />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};