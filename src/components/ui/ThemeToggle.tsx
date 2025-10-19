import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

interface ThemeToggleProps {
  variant?: 'buttons' | 'dropdown' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'buttons',
  size = 'md',
  showLabels = false,
  className,
}) => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'light', label: 'Light', icon: SunIcon },
    { key: 'dark', label: 'Dark', icon: MoonIcon },
    { key: 'system', label: 'System', icon: MonitorIcon },
  ] as const;

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
          className={cn(
            'appearance-none bg-surface border border-border rounded-md px-3 py-2',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
            'text-copy cursor-pointer',
            size === 'sm' && 'text-sm px-2 py-1',
            size === 'lg' && 'text-base px-4 py-3'
          )}
        >
          {themes.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-copy-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'switch') {
    const currentIndex = themes.findIndex(t => t.key === theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    const CurrentIcon = themes[currentIndex].icon;

    return (
      <Button
        variant="ghost"
        size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
        onClick={() => setTheme(nextTheme.key)}
        className={cn('relative', className)}
        aria-label={`Switch to ${nextTheme.label} theme`}
      >
        <CurrentIcon className="w-5 h-5" />
        {showLabels && (
          <span className="ml-2 hidden sm:inline">
            {themes[currentIndex].label}
          </span>
        )}
      </Button>
    );
  }

  // Default: buttons variant
  return (
    <div className={cn(
      'flex items-center bg-surface-hover rounded-lg p-1 border border-border',
      className
    )}>
      {themes.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={cn(
            'flex items-center justify-center rounded-md transition-all duration-200',
            'hover:bg-surface-active focus:outline-none focus:ring-2 focus:ring-primary/50',
            size === 'sm' && 'p-1.5',
            size === 'md' && 'p-2',
            size === 'lg' && 'p-3',
            theme === key ? [
              'bg-primary text-white shadow-sm',
              'hover:bg-primary-dark'
            ] : [
              'text-copy-light',
              'hover:text-copy hover:bg-surface'
            ]
          )}
          aria-label={`Switch to ${label} theme`}
          title={`Switch to ${label} theme`}
        >
          <Icon className={cn(
            size === 'sm' && 'w-4 h-4',
            size === 'md' && 'w-5 h-5',
            size === 'lg' && 'w-6 h-6'
          )} />
          {showLabels && (
            <span className={cn(
              'ml-2 hidden sm:inline font-medium',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base'
            )}>
              {label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// Theme indicator component for showing current theme
export const ThemeIndicator: React.FC<{ className?: string }> = ({ className }) => {
  const { currentTheme } = useTheme();
  
  return (
    <div className={cn(
      'flex items-center space-x-2 text-sm text-copy-light',
      className
    )}>
      <div className={cn(
        'w-2 h-2 rounded-full',
        currentTheme === 'dark' ? 'bg-slate-600' : 'bg-yellow-400'
      )} />
      <span className="capitalize">{currentTheme} mode</span>
    </div>
  );
};