import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ items = [], itemsPerPage = 12, onPageChange = () => {} }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
  
    const totalPages = Math.ceil(items.length / itemsPerPage);
  
    // Effect to update the displayed items based on the current page
    useEffect(() => {
      const indexOfLastProduct = currentPage * itemsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
      setCurrentItems(items.slice(indexOfFirstProduct, indexOfLastProduct));
    }, [currentPage, items, itemsPerPage]); // Trigger when page, items, or itemsPerPage changes
  
    const handleClick = (page) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page); // Only update the currentPage
    };
  
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
        <ul className="wg-pagination tf-pagination-list">
          <span className='d-flex justify-content-center align-items-center'>
            {items.length} items
          </span>
          {currentPage >1 && <li>
            <a
            href="javascript:void(0)"

              onClick={() => handleClick(currentPage - 1)}
              className="pagination-link animate-hover-btn"
              disabled={currentPage === 1}
            >
              <span className="icon icon-arrow-left"></span>
            </a>
          </li>}

          {pageNumbers.map((page) => (
            <li key={page} className={page === currentPage ? 'active' : ''}>
              <a href="javascript:void(0)"

                onClick={() => handleClick(page)}
                className="pagination-link animate-hover-btn"
              >
                {page}
              </a>
            </li>
          ))}

          {currentPage < totalPages && <li>
            <a
            href="javascript:void(0)"

              onClick={() => handleClick(currentPage + 1)}
              className="pagination-link animate-hover-btn"
              disabled={currentPage === totalPages}
            >
              <span className="icon icon-arrow-right"></span>
            </a>
          </li>}
        </ul>
        {/* Notify parent component of the current page's items */}
        <div className="pagination-items">
          {onPageChange && onPageChange({ page: currentPage, currentItems })}
        </div>
    </>
  );
};

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
