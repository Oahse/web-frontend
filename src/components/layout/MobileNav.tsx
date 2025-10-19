import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
interface MobileNavProps {
  onSearchClick: () => void;
  onCategoriesClick: () => void;
}
export const MobileNav: React.FC<MobileNavProps> = ({
  onSearchClick,
  onCategoriesClick
}) => {
  const location = useLocation();
  const {
    totalItems
  } = useCart();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border-light z-40">
      <div className="flex justify-between items-center px-4 py-2">
        <Link to="/" className="flex flex-col items-center py-1">
          <HomeIcon size={24} className={isActive('/') ? 'text-primary' : 'text-copy-light'} />
          <span className={`text-xs mt-1 ${isActive('/') ? 'text-primary' : 'text-copy-light'}`}>
            Home
          </span>
        </Link>
        <button onClick={onCategoriesClick} className="flex flex-col items-center py-1">
          <MenuIcon size={24} className="text-copy-light" />
          <span className="text-xs mt-1 text-copy-light">Categories</span>
        </button>
        <button onClick={onSearchClick} className="flex flex-col items-center py-1">
          <SearchIcon size={24} className="text-copy-light" />
          <span className="text-xs mt-1 text-copy-light">Search</span>
        </button>
        <Link to="/cart" className="flex flex-col items-center py-1">
          <div className="relative">
            <ShoppingCartIcon size={24} className={isActive('/cart') ? 'text-primary' : 'text-copy-light'} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className={`text-xs mt-1 ${isActive('/cart') ? 'text-primary' : 'text-copy-light'}`}>
            Cart
          </span>
        </Link>
        <Link to="/account" className="flex flex-col items-center py-1">
          <UserIcon size={24} className={isActive('/account') ? 'text-primary' : 'text-copy-light'} />
          <span className={`text-xs mt-1 ${isActive('/account') ? 'text-primary' : 'text-copy-light'}`}>
            Account
          </span>
        </Link>
      </div>
    </div>
  );
};