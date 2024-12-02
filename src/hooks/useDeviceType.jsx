import { useState, useEffect } from 'react';

/**
 * Custom hook to determine the device type.
 * @returns {Object} - Object containing `isMobile`, `isTablet`, and `isDesktop` booleans.
 */
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // Define media queries
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
    const desktopQuery = window.matchMedia('(min-width: 1025px)');

    const updateDeviceType = () => {
      setDeviceType({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
      });
    };

    // Add listeners to media queries
    mobileQuery.addEventListener('change', updateDeviceType);
    tabletQuery.addEventListener('change', updateDeviceType);
    desktopQuery.addEventListener('change', updateDeviceType);

    // Initialize the device type on first render
    updateDeviceType();

    // Cleanup listeners on unmount
    return () => {
      mobileQuery.removeEventListener('change', updateDeviceType);
      tabletQuery.removeEventListener('change', updateDeviceType);
      desktopQuery.removeEventListener('change', updateDeviceType);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
