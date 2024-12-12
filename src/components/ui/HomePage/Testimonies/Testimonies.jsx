import React from 'react';
import PropTypes from 'prop-types';
import './Testimonies.css';

const HomepageTestimonies = ({ isMobile }) => {
  return (
    <div className={`homepage-testimonies row m-0 mb-3 bg-blue`}>
      {isMobile ? (
        // Mobile View: One column, two rows, full width
        <>
          <div className="col-12 mb-3 bg-light">
            <div className="content">
              <p>Testimony 1</p>
            </div>
          </div>
          <div className="col-12 bg-light">
            <div className="content">
              <p>Testimony 2</p>
            </div>
          </div>
        </>
      ) : (
        // Non-Mobile View: Two columns, one row, with percentage widths
        <>
          <div className="col-md-7 bg-light" style={{ height: '60%' }}>
            <div className="content">
              <p>Testimony 1</p>
            </div>
          </div>
          <div className="col-md-5 bg-light" style={{ height: '40%' }}>
            <div className="content">
              <p>Testimony 2</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
// Prop Validation
HomepageTestimonies.propTypes = {
    isMobile: PropTypes.bool.isRequired,   // isScrolled must be a boolean and is required
  };
  
export default HomepageTestimonies;
