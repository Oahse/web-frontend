import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XIcon, ChevronRightIcon } from 'lucide-react';
import { useCategories } from '../../contexts/CategoryContext';

interface MobileCategoriesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileCategories: React.FC<MobileCategoriesProps> = ({
  isOpen,
  onClose
}) => {
  const { categories, loading, error } = useCategories();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const mainNavigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex">
      {/* Slide-in panel */}
      <div className="bg-surface w-4/5 max-w-sm h-full overflow-y-auto text-copy">
        <div className="p-4 border-b border-border-light">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Categories</h3>
            <button onClick={onClose} className="p-1 hover:bg-background rounded-md">
              <XIcon size={24} />
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="p-4 border-b border-border-light">
          <Link
            to="/login"
            className="flex items-center justify-between py-2 px-3 bg-primary text-white rounded-md mb-2"
            onClick={onClose}
          >
            <span>Sign In / Register</span>
            <ChevronRightIcon size={20} />
          </Link>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Link to="/account/orders" className="py-2 px-3 bg-background rounded-md text-center text-sm hover:bg-border" onClick={onClose}>
              My Orders
            </Link>
            <Link to="/account/wishlist" className="py-2 px-3 bg-background rounded-md text-center text-sm hover:bg-border" onClick={onClose}>
              Wishlist
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-border-light">
          <h4 className="text-sm font-medium text-copy-light mb-2">Shop By Category</h4>
          <ul>
            {loading ? (
              <li>Loading categories...</li>
            ) : error ? (
              <li>Error loading categories: {error}</li>
            ) : (
              categories?.map((category, index) => (
                <li key={index}>
                  <Link to={`/products?category=${category.slug}`} className="flex items-center py-3 hover:text-primary" onClick={onClose}>
                    <span className="mr-3 text-xl">{category.image}</span>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Main Navigation */}
        <div className="p-4">
          <h4 className="text-sm font-medium text-copy-light mb-2">Menu</h4>
          <ul>
            {mainNavigation.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className="flex items-center py-3 hover:text-primary border-b border-border-light last:border-0" onClick={onClose}>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="p-4 bg-background mt-auto">
          <div className="flex items-center">
            <span className="text-primary mr-2">📞</span>
            <div>
              <span className="block text-sm font-medium text-main">1900100888</span>
              <span className="block text-xs text-copy-light">Support Center</span>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div className="flex-grow" onClick={onClose}></div>
    </div>
  );
};
