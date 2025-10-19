import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SkeletonConfig {
  animation: 'shimmer' | 'pulse' | 'wave';
  minLoadingTime: number;
  showSkeletonDelay: number;
  respectReducedMotion: boolean;
}

interface SkeletonContextType {
  config: SkeletonConfig;
  updateConfig: (newConfig: Partial<SkeletonConfig>) => void;
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

const defaultConfig: SkeletonConfig = {
  animation: 'shimmer',
  minLoadingTime: 300,
  showSkeletonDelay: 100,
  respectReducedMotion: true
};

const SkeletonContext = createContext<SkeletonContextType | undefined>(undefined);

export const useSkeletonContext = () => {
  const context = useContext(SkeletonContext);
  if (!context) {
    throw new Error('useSkeletonContext must be used within a SkeletonProvider');
  }
  return context;
};

interface SkeletonProviderProps {
  children: ReactNode;
  initialConfig?: Partial<SkeletonConfig>;
}

export const SkeletonProvider: React.FC<SkeletonProviderProps> = ({
  children,
  initialConfig = {}
}) => {
  const [config, setConfig] = useState<SkeletonConfig>({
    ...defaultConfig,
    ...initialConfig
  });
  
  const [globalLoading, setGlobalLoading] = useState(false);

  const updateConfig = (newConfig: Partial<SkeletonConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  // Check for reduced motion preference
  React.useEffect(() => {
    if (config.respectReducedMotion) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          updateConfig({ animation: 'pulse' });
        }
      };

      if (mediaQuery.matches) {
        updateConfig({ animation: 'pulse' });
      }

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [config.respectReducedMotion]);

  const value: SkeletonContextType = {
    config,
    updateConfig,
    globalLoading,
    setGlobalLoading
  };

  return (
    <SkeletonContext.Provider value={value}>
      {children}
    </SkeletonContext.Provider>
  );
};