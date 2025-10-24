import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { ChevronDownIcon, SearchIcon, UserIcon, HeartIcon, ShoppingCartIcon, MenuIcon, PhoneIcon, ShieldIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import { SkeletonHeader } from '../ui/SkeletonNavigation';
import { getCountryByCode } from '../../lib/countries';

interface HeaderProps {
  onSearchClick: () => void;
  onCategoriesClick: () => void;
  isLoading?: boolean;
  animation?: 'shimmer' | 'pulse' | 'wave';
  isScrolled?: boolean;
  minimal?: boolean;
}

const TopHeaderAds = [
  'Free shipping on orders over $50',
  'Summer sale! Up to 50% off',
  'New arrivals every week',
];

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onCategoriesClick,
  isLoading = false,
  animation = 'shimmer',
  isScrolled = false
}) => {
  const { isAuthenticated, user, isAdmin, isSupplier } = useAuth();
  const { totalItems } = useCart();
  const { defaultWishlist } = useWishlist();

  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US'); // Default to US
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English
  const navigate = useNavigate();

  useEffect(() => {
    const adInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % TopHeaderAds.length);
    }, 5000); // Change ad every 5 seconds
    return () => clearInterval(adInterval);
  }, []);

  // These functions can be used later for country/language switching
  // const handleCountryChange = (country: Country) => {
  //   setSelectedCountry(country.code);
  //   localStorage.setItem('preferred_country', country.code);
  // };

  // const handleLanguageChange = (langCode: string) => {
  //   setSelectedLanguage(langCode);
  //   localStorage.setItem('preferred_language', langCode);
  // };

  // Categories for dropdown (keep for now, might be translated later)
  const categories = [
    { name: 'Cereal Crops', path: '/products?category=cereal-crops' },
    { name: 'Brands', path: '/products?category=brands' },
    { name: 'Legumes', path: '/products?category=legumes' },
    { name: 'Fruits & Vegetables', path: '/products?category=fruits-vegetables' },
    { name: 'Oilseeds', path: '/products?category=oilseeds' },
    { name: 'Fibers', path: '/products?category=fibers' },
    { name: 'Spices and Herbs', path: '/products?category=spices-herbs' },
    { name: 'Meat, Fish & Sweeteners', path: '/products?category=meat-fish-sweeteners' },
    { name: 'Nuts, Flowers & Beverages', path: '/products?category=nuts-flowers-beverages' },
  ];


  // Cookie consent and country detection
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'accepted') {
      setShowCookieConsent(true);
    }

    // Detect user's country and language from browser settings
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]);
    if (browserLang) {
      const langCode = browserLang.split('-')[0];
      const countryCode = browserLang.split('-')[1];

      if (countryCode && countryCode.length === 2) {
        setSelectedCountry(countryCode.toUpperCase());
      } else if (langCode) {
        // Fallback: if only language is available, try to map it to a country
        // This is a simplification; a more robust solution might involve a language-to-country map
        if (langCode === 'en') setSelectedCountry('US');
        else if (langCode === 'fr') setSelectedCountry('FR');
        else if (langCode === 'de') setSelectedCountry('DE');
        // Add more language-to-country mappings as needed
      }
      setSelectedLanguage('en'); // Always set language to English
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowCookieConsent(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowCookieConsent(false);
    // Optionally, disable non-essential cookies here
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };



  // Show skeleton if loading
  if (isLoading) {
    return <SkeletonHeader animation={animation} />;
  }

  return (
    <header className="top-0 left-0 right-0 z-50 w-full text-copy shadow-md">
      {/* Top Header - Desktop only */}
      <div className="hidden md:block bg-surface">
        <div className="container mx-auto px-4 py-2 max-w-[1400px]">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-8">
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/account/orders" className="hover:text-primary transition-colors">
                Orders
              </Link>
              {isAdmin && (
                <Link to="/admin" className="hover:text-primary transition-colors flex items-center">
                  <ShieldIcon size={14} className="mr-1" />
                  Admin Dashboard
                </Link>
              )}
              {isSupplier && (
                <Link to="/supplier" className="hover:text-primary transition-colors flex items-center">
                  <ShieldIcon size={14} className="mr-1" />
                  Supplier Dashboard
                </Link>
              )}
              {(isAdmin || isSupplier) && (
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {/* Country Flag */}
              {selectedCountry && (
                <img
                  src={`https://flagcdn.com/w20/${selectedCountry.toLowerCase()}.png`}
                  alt={`${selectedCountry} flag`}
                  className="w-5 h-auto mr-1 inline-block"
                />
              )}

              {/* Language Code */}
              <span className="text-sm font-medium">
                {selectedLanguage.toUpperCase()}
              </span>

              <div className="flex items-center">
                <PhoneIcon size={16} className="mr-1" />
                <span>Need Help: +18001090</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Header - Ads Banner */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <motion.div
            key={currentAdIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            {TopHeaderAds[currentAdIndex]}
          </motion.div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-surface ${isScrolled ? 'shadow-md' : ''} transition-all duration-300`}>
        <div className="container mx-auto px-4 py-4 max-w-[1400px]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                {/* Logo for desktop */}
                <div className="hidden md:flex items-center">

                  <img
                    src="/banwee_logo_text_green.png"
                    alt="Banwee"
                    className="h-6 md:h-8"
                    loading="lazy"
                  />
                </div>
                {/* Favicon for mobile */}
                <div className="md:hidden">
                  <img src="/banwee_logo_text_green.png" alt="Banwee" className="h-10" loading="lazy" />
                </div>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-grow max-w-xl mx-8">
              <form onSubmit={handleSearch} className="flex w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-grow px-4 py-2 border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary bg-surface text-copy"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition-colors">
                  <SearchIcon size={20} />
                </button>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* User Account */}
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                className="hidden md:flex items-center hover:text-primary">
                <UserIcon size={24} className="mr-1" />
                <div className="flex flex-col text-xs">
                  <span>{isAuthenticated ? `Hello, ${user?.firstname || user?.full_name?.split(' ')[0] || 'User'}` : 'Login'}</span>
                  <span className="font-semibold">
                    {isAuthenticated ? 'Account' : 'My Account'}
                  </span>
                </div>
              </Link>

              {/* Wishlist */}
              <Link to="/account/wishlist" className="hidden md:flex items-center hover:text-primary">
                <div className="relative">
                  <HeartIcon size={24} />
                  {defaultWishlist && defaultWishlist.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {defaultWishlist.items.length}
                    </span>
                  )}
                </div>
                <div className="flex flex-col ml-1 text-xs">
                  <span>Favorite</span>
                  <span className="font-semibold">Wishlist</span>
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="flex items-center hover:text-primary">
                <div className="relative">
                  <ShoppingCartIcon size={24} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="hidden md:flex flex-col ml-1 text-xs">
                  <span>Your Cart</span>
                  <span className="font-semibold">
                    ${totalItems > 0 ? '0.00' : '0.00'}
                  </span>
                </div>
              </Link>

              {/* Mobile menu button */}
              <button className="md:hidden p-1 z-10" onClick={onCategoriesClick}>
                <MenuIcon size={24} />
              </button>

              {/* Mobile search button */}
              <button className="md:hidden p-1 z-10" onClick={onSearchClick}>
                <SearchIcon size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Header - Navigation */}
      <div className="hidden md:block bg-background border-t border-b border-border-light">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex items-center justify-between">
            {/* Categories Dropdown */}
            <div className="group relative">
              <button className="flex items-center bg-primary text-white px-6 py-3 hover:bg-primary-dark transition-colors">
                <MenuIcon size={20} className="mr-2" />
                <span className="font-semibold">Browse Categories</span>
                <ChevronDownIcon size={20} className="ml-2" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-surface shadow-lg rounded-b-md py-2 w-64 z-50">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className="block px-4 py-2 hover:bg-background hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-grow">
              <ul className="flex space-x-10">
                <li className="ml-8">
                  <Link to="/" className="block py-3 font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="block py-3 font-medium hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block py-3 font-medium hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="block py-3 font-medium hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="block py-3 font-medium hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Support Center */}
            <div className="flex items-center">
              <PhoneIcon size={20} className="mr-2 text-primary" />
              <div>
                <span className="block text-sm font-medium">1900100888</span>
                <span className="block text-xs text-copy-light">Support Center</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCookieConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-surface shadow-lg p-4 flex flex-col md:flex-row items-center justify-between z-50 text-copy"
        >
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            We use cookies to ensure you get the best experience on our website. By continuing to use this site, you agree to our use of cookies.
            <Link to="/privacy" className="text-primary hover:underline ml-1">Learn more</Link>
          </p>
          <div className="flex flex-col w-full md:w-auto md:flex-row md:space-x-2">
            <button
              onClick={handleAcceptCookies}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors mb-2 md:mb-0"
            >
              Accept
            </button>
            <button
              onClick={handleDeclineCookies}
              className="bg-surface-hover text-copy px-4 py-2 rounded-md text-sm hover:bg-surface-active transition-colors"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}

    </header>
  );
};