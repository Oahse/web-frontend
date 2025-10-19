import React from 'react';
import { lazy, ComponentType, LazyExoticComponent } from 'react';
import { Suspense } from 'react';

// Generic lazy loading wrapper with error boundary
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): LazyExoticComponent<T> => {
  return lazy(importFunc);
};

// HOC for wrapping lazy components with Suspense
export const withSuspense = <P extends object>(
  Component: LazyExoticComponent<ComponentType<P>>,
  fallback?: React.ReactNode
) => {
  return (props: P) => (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      {React.createElement(Component, props)}
    </Suspense>
  );
};

// Preload function for critical components
export const preloadComponent = (
  importFunc: () => Promise<{ default: ComponentType<any> }>
) => {
  return importFunc();
};

// Route-based code splitting helper
export const createLazyRoute = (
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  preload = false
) => {
  if (preload) {
    // Preload critical routes
    setTimeout(() => preloadComponent(importFunc), 100);
  }
  return createLazyComponent(importFunc);
};

// Component-based code splitting for large components
export const createLazyModal = (
  importFunc: () => Promise<{ default: ComponentType<any> }>
) => {
  return createLazyComponent(importFunc);
};     

// Intersection Observer based lazy loading for components
export const useLazyComponentLoader = () => {
  const loadComponent = (
    target: Element,
    importFunc: () => Promise<{ default: ComponentType<any> }>
  ) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadComponent(importFunc);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  };

  return { loadComponent };
};