import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  badge?: string | number;
  external?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline' | 'sidebar';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onItemClick?: (item: NavigationItem) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className,
  onItemClick,
}) => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (label: string) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(label)) {
      newOpenDropdowns.delete(label);
    } else {
      newOpenDropdowns.add(label);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const variantStyles = {
    default: {
      item: 'hover:bg-surface-hover rounded-md transition-colors',
      active: 'bg-primary/10 text-primary',
    },
    pills: {
      item: 'hover:bg-surface-hover rounded-full transition-colors',
      active: 'bg-primary text-white',
    },
    underline: {
      item: 'hover:text-primary border-b-2 border-transparent hover:border-primary/30 transition-all',
      active: 'text-primary border-primary',
    },
    sidebar: {
      item: 'hover:bg-surface-hover rounded-md transition-colors w-full justify-start',
      active: 'bg-primary/10 text-primary border-r-2 border-primary',
    },
  };

  const orientationStyles = {
    horizontal: 'flex flex-row items-center space-x-1',
    vertical: 'flex flex-col space-y-1',
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item.href);
    const isDropdownOpen = openDropdowns.has(item.label);

    const itemContent = (
      <div className={cn(
        'flex items-center justify-between w-full',
        sizeStyles[size],
        variantStyles[variant].item,
        isItemActive && variantStyles[variant].active,
        level > 0 && 'ml-4'
      )}>
        <div className="flex items-center space-x-2">
          {item.icon && (
            <span className="flex-shrink-0">{item.icon}</span>
          )}
          <span>{item.label}</span>
          {item.badge && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </div>
        {hasChildren && (
          <ChevronDownIcon 
            className={cn(
              'w-4 h-4 transition-transform',
              isDropdownOpen && 'rotate-180'
            )} 
          />
        )}
      </div>
    );

    if (hasChildren) {
      return (
        <div key={item.label} className="relative">
          <button
            onClick={() => toggleDropdown(item.label)}
            className="w-full text-left"
          >
            {itemContent}
          </button>
          {isDropdownOpen && (
            <div className={cn(
              'mt-1 space-y-1',
              orientation === 'horizontal' && 'absolute top-full left-0 bg-surface border border-border rounded-md shadow-lg p-2 min-w-[200px] z-50'
            )}>
              {item.children?.map(child => renderNavigationItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    const linkProps = {
      className: 'block w-full',
      onClick: () => {
        onItemClick?.(item);
        setIsMobileMenuOpen(false);
      },
      ...(item.external && { target: '_blank', rel: 'noopener noreferrer' }),
    };

    return (
      <Link key={item.href} to={item.href} {...linkProps}>
        {itemContent}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={cn(
        'hidden md:flex',
        orientationStyles[orientation],
        className
      )}>
        {items.map(item => renderNavigationItem(item))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            'flex items-center justify-center',
            sizeStyles[size],
            variantStyles[variant].item
          )}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <XIcon className="w-5 h-5" />
          ) : (
            <MenuIcon className="w-5 h-5" />
          )}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface border-t border-border shadow-lg z-50">
            <nav className="p-4 space-y-2">
              {items.map(item => renderNavigationItem(item))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

// Breadcrumb component for navigation hierarchy
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <span className="text-copy-muted" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="text-copy-light hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-copy font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};