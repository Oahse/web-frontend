// src/hooks/useAdminStyles.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const links = [
  'src/assets/fonts/fonts.css',
  'src/assets/css/bootstrap.css',
  'src/assets/css/bootstrap-select.min.css',
  'src/assets/css/animate.min.css',
  'src/assets/css/animate.css',
  'src/assets/icon/style.css',
  'src/assets/css/adminstyle.css',
];

const useAdminStyles = () => {
  const location = useLocation();

  const addStyles = () => {
    const head = document.head;
    links.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        head.appendChild(link);
      }
    });
  };

  const removeStyles = () => {
    links.forEach((href) => {
      const link = document.querySelector(`link[href="${href}"]`);
      if (link) {
        link.remove();
      }
    });
  };

  useEffect(() => {
    const isAdminPath =
      location.pathname.includes('/admin') ||
      location.href.includes('/admin') ||
      location.hash.includes('/admin');

    if (isAdminPath) {
      addStyles();
    } else {
      removeStyles();
    }

    return () => {
      removeStyles();
    };
  }, [location.pathname, location.hash, location.href]);
};

export default useAdminStyles;
