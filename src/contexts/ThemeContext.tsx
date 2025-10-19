import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { ThemeMode, themeUtils, ThemeConfig, defaultTheme } from '../lib/theme';

interface ThemeContextType {
  theme: ThemeMode;
  currentTheme: 'light' | 'dark';
  config: ThemeConfig;
  setTheme: (theme: ThemeMode) => void;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
  isSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user, updateUserPreferences } = useAuth();
  
  // Initialize theme from user preferences, localStorage, or default
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (user?.preferences?.theme) {
      return user.preferences.theme;
    }
    return themeUtils.loadThemePreference();
  });
  
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(() => 
    themeUtils.getEffectiveTheme(theme)
  );
  
  const [config, setConfig] = useState<ThemeConfig>(defaultTheme);

  // Apply theme changes
  const applyTheme = useCallback((newTheme: ThemeMode) => {
    themeUtils.applyTheme(newTheme);
    const effectiveTheme = themeUtils.getEffectiveTheme(newTheme);
    setCurrentTheme(effectiveTheme);
    
    // Save to localStorage
    themeUtils.saveThemePreference(newTheme);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('themeChange', { 
      detail: { theme: newTheme, effectiveTheme } 
    }));
  }, []);

  // Handle theme changes
  useEffect(() => {
    applyTheme(theme);
    
    // Watch for system theme changes if using system theme
    if (theme === 'system') {
      const cleanup = themeUtils.watchSystemTheme((isDark) => {
        setCurrentTheme(isDark ? 'dark' : 'light');
        themeUtils.applyTheme('system');
      });
      return cleanup;
    }
  }, [theme, applyTheme]);

  // Sync with user preferences
  useEffect(() => {
    if (user?.preferences?.theme && user.preferences.theme !== theme) {
      setThemeState(user.preferences.theme);
    }
  }, [user?.preferences?.theme, theme]);

  const setTheme = useCallback(async (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    
    // Update user preferences if authenticated
    if (user) {
      try {
        await updateUserPreferences({
          theme: newTheme
        });
      } catch (error) {
        console.error('Failed to update theme preference:', error);
      }
    }
  }, [user, updateUserPreferences]);

  const updateThemeConfig = useCallback((newConfig: Partial<ThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const value: ThemeContextType = {
    theme,
    currentTheme,
    config,
    setTheme,
    updateThemeConfig,
    isSystemTheme: theme === 'system',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};