import React from 'react';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <div className="bottom-page">
      <div className="body-text">
        Copyright © {currentYear} <a href="../index.html">Ecomus</a>. Design by Themesflat. All rights reserved.
      </div>
    </div>
  );
};

export default AdminFooter;
