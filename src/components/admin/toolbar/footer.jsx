import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <div className="bottom-page">
      <div className="body-text">
        Copyright © {currentYear} <Link to="/">Banwe</Link>. Design by Themesflat. All rights reserved.
      </div>
    </div>
  );
};

export default AdminFooter;
