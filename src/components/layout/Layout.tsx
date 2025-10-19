import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileSearch } from './MobileSearch';
import { MobileCategories } from './MobileCategories';
import { cn } from '../../lib/utils';
import { useTheme } from '../../contexts/ThemeContext';
// import { MobileNav } from './MobileNav';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  headerProps?: any;
  footerProps?: any;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  showHeader = true,
  showFooter = true,
  headerProps = {},
  footerProps = {},
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useTheme();

  // Handle scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menus when clicking outside or on escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCategoriesOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-mobile-menu]')) {
        setIsSearchOpen(false);
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menus are open
  useEffect(() => {
    if (isSearchOpen || isCategoriesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, isCategoriesOpen]);
  
  return (
    <div className={cn(
      'min-h-screen flex flex-col',
      'bg-background text-copy',
      'transition-colors duration-200 ease-in-out',
      className
    )} data-mobile-menu>
      {showHeader && (
        <Header
          onSearchClick={(event) => {
            event.preventDefault();
            setIsSearchOpen(true);
          }}
          onCategoriesClick={(event) => {
            event.preventDefault();
            setIsCategoriesOpen(true);
          }}
          isScrolled={isScrolled}
          {...headerProps}
        />
      )}
      
      <main className={cn(
        'flex-1 w-full',
        'transition-all duration-200 ease-in-out',
        // Add top padding if header is sticky
        showHeader && 'pt-0'
      )}>
        {children}
      </main>
      {/* <MobileNav onSearchClick={(event) => {
            event.preventDefault();
            setIsSearchOpen(true);
          }}
          onCategoriesClick={(event) => {
            event.preventDefault();
            setIsCategoriesOpen(true);
          }}/> */}
      {showFooter && <Footer {...footerProps} />}
      
      {/* Mobile overlays */}
      <MobileSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      <MobileCategories 
        isOpen={isCategoriesOpen} 
        onClose={() => setIsCategoriesOpen(false)} 
      />
      
      {/* Backdrop for mobile menus */}
      {(isSearchOpen || isCategoriesOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            setIsSearchOpen(false);
            setIsCategoriesOpen(false);
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// Specialized layout variants
export const AdminLayout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Layout
      showHeader={false}
      showFooter={false}
      className="bg-surface-elevated"
      {...props}
    >
      {children}
    </Layout>
  );
};

export const AuthLayout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Layout
      showHeader={false}
      showFooter={false}
      className="bg-background"
      {...props}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </Layout>
  );
};

export const MinimalLayout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Layout
      showFooter={false}
      headerProps={{ minimal: true }}
      {...props}
    >
      {children}
    </Layout>
  );
};