import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear(); // Get current year
  const startYear = 2025;
  const displayYear = startYear === currentYear ? `${startYear}` : `${startYear} - ${currentYear}`;

  return (
    <div className="bottom-page">
      <div className="body-text">
        Copyright © {displayYear} <Link to="/">Banwee</Link>. All rights reserved.
      </div>
    </div>
  );
};

export default AdminFooter;
