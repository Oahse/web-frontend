// src/hooks/useAdminStyles.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const links = [
  'assets/fonts/fonts.css',
  'assets/css/bootstrap.css',
  'assets/css/bootstrap-select.min.css',
  'assets/css/animate.min.css',
  'assets/css/animate.css',
  'assets/icon/style.css',
  'assets/css/adminstyle.css',
];

const useAdminStyles = () => {
  const location = useLocation();
  const baseUrl = import.meta.env.MODE === 'production'? '':'/src/';
  console.log(import.meta.env.MODE,'====->>>>',baseUrl)
  const addStyles = () => {
    const head = document.head;
    links.forEach((href) => {
      const fullUrl = `${baseUrl}/${href}`
      if (!document.querySelector(`link[href="${fullUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fullUrl;
        head.appendChild(link);
      }
    });
  };

  const removeStyles = () => {
    links.forEach((href) => {
      const fullUrl = `${baseUrl}/${href}`
      const link = document.querySelector(`link[href="${fullUrl}"]`);
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
