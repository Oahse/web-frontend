import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from 'lucide-react';
import { useCategories } from '../../contexts/CategoryContext';

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSearch: React.FC<MobileSearchProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { categories: popularCategories, loading, error } = useCategories();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products/search?q=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  const popularSearches = ['Organic quinoa', 'Moringa powder', 'Shea butter', 'African coffee'];

  // If not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex flex-col">
      <div className="bg-surface w-full text-copy">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-main">Search Products</h3>
            <button onClick={onClose} className="p-1 hover:bg-background rounded-md">
              <XIcon size={24} />
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex w-full mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for products..."
              className="flex-grow px-4 py-3 border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-3 rounded-r-md hover:bg-primary-dark transition-colors"
            >
              <SearchIcon size={20} />
            </button>
          </form>

          {/* Popular Searches */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-copy-light mb-2">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-background rounded-full text-sm hover:bg-border"
                  onClick={() => {
                    setSearchTerm(term);
                    navigate(`/products/search?q=${encodeURIComponent(term)}`);
                    onClose();
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-medium text-copy-light mb-2">Popular Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {loading ? (
                <p>Loading categories...</p>
              ) : error ? (
                <p>Error loading categories: {error}</p>
              ) : (
                popularCategories?.map((category, index) => (
                  <button
                    key={index}
                    className="px-3 py-2 bg-background rounded-md text-sm hover:bg-border text-left"
                    onClick={() => {
                      navigate(`/products/category/${category.slug}`);
                      onClose();
                    }}
                  >
                    {category.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop to close search */}
      <div className="flex-grow" onClick={onClose}></div>
    </div>
  );
};