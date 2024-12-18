import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Link component for anchor tags (if needed)
import './Button.css';
const Button = ({
  type = 'button', // Default is button
  variant = 'contained', // Default is contained button
  color = 'primary', // Default color is primary
  htmlType = 'button', // HTML type for the button (submit, button)
  text,
  isLoading = false,
  className = '',
  onClick,
  style = {},
  startIcon: StartIcon,
  endIcon: EndIcon,
  children,
  fontWeight,
  ...props
}) => {
  // Generate button class dynamically
  const buttonClass = (() => {
    if (type === 'link') {
      return `button button-link-${variant}-${color} ${className} ${fontWeight}`;
    }
    return `button button-${variant}-${color} ${className} ${fontWeight}`;
  })();

  // Render a loading spinner if the button is loading
  const renderLoadingSpinner = () => {
    return isLoading && <div className="spinner-border" role="status"></div>;
  };

  // Render button contents with icons and text
  const renderButtonContent = () => {
    return (
      <>
        {renderLoadingSpinner()}
        {StartIcon && !isLoading && <span >{StartIcon}</span> }
        <span className='mx-2' >{children?children:text}</span>
        {EndIcon && !isLoading && <span >{EndIcon}</span>}
      </>
    );
  };

  // Render the button as a standard button or a link (if type is 'link')
  return (
    <>
      {type === 'link' ? (
        <Link to={props.href} className={buttonClass} style={style}>
          {renderButtonContent()}
        </Link>
      ) : (
        <button
          type={htmlType}
          className={buttonClass}
          onClick={onClick}
          style={style}
          children
          {...props}
        >
          {renderButtonContent()}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'link']), // Button types
  variant: PropTypes.oneOf(['contained', 'outlined']), // Button variants (outlined or contained)
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'success',
    'warning',
  ]), // Color options
  htmlType: PropTypes.oneOf(['button', 'submit']), // HTML button types
  text: PropTypes.string.isRequired, // Button text
  isLoading: PropTypes.bool, // If true, show the loading spinner
  className: PropTypes.string, // Additional custom class names
  onClick: PropTypes.func, // onClick handler
  style: PropTypes.object, // Inline styles
};

export default Button;
