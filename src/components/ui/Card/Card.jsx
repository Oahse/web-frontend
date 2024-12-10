import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Create a CSS file for styles or use inline styles

const Card = ({ className, onClick, style, header, body, footer, children}) => {
  return (
    <div
      className={`card ${className}`} // Combine base class with custom classes
      onClick={onClick}
      style={style}
    >
      {header && <div className='card-header'>{header} </div>}
      {body && <div className='card-body'> {body}</div>}
      {children && <div className="card-body">{children}</div>} {/* Supports children */}
      {footer && <div className='card-footer'> {footer}</div>}
    </div>
  );
};

// Define PropTypes for better reusability and error checking
Card.propTypes = {
  children: PropTypes.node.isRequired, // Card content
  className: PropTypes.string, // Additional custom classes
  onClick: PropTypes.func, // Optional onClick handler
  style: PropTypes.object, // Inline styles
};

Card.defaultProps = {
  className: '', // Default to no additional classes
  onClick: null, // Default to no onClick action
  style: {}, // Default to no custom inline styles
};

export default Card;
