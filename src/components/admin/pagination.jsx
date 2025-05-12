import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex items-center justify-between flex-wrap gap10">
      
      <ul className="wg-pagination">
        {/* Previous Button */}
        <li className={isFirst ? 'disabled' : ''}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!isFirst) handleClick(currentPage - 1);
            }}
            
            aria-disabled={isFirst}
          >
            <i className="icon-chevron-left"></i>
          </a>
        </li>

        {/* Page Numbers */}
        {pages.map((page) => (
          <li key={page} className={page === currentPage ? 'active' : ''}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        {/* Next Button */}
        <li className={isLast ? 'disabled' : ''}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!isLast) handleClick(currentPage + 1);
            }}
            aria-disabled={isLast}
          >
            <i className="icon-chevron-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
