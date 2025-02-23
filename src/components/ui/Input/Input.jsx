import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './Input.css';

const Input = ({ 
    type='text', 
    placeholder, 
    value, 
    onChange, 
    required = false, 
    className, 
    style = {}, 
    onSearch,
    isFilter 
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
            required={required}
            style={{
                paddingRight: isFilter 
                ? `calc(30px + ${(type === 'password' || onSearch) ? '30px' : '0px'})`  // If filter is true, 30px + 30px if password or onSearch
                : (type === 'password' || onSearch) 
                    ? '30px'  // If password or onSearch, just 30px
                    : '0px',   // Default to 0px if none of the conditions match
                ...style
            }}
        />
    );
};

// Define prop types for the Input component
Input.propTypes = {
    type: PropTypes.string,         // The type of the input (text, password, etc.)
    placeholder: PropTypes.string,  // The placeholder text
    value: PropTypes.string.isRequired,  // The value of the input (required)
    onChange: PropTypes.func.isRequired,  // The change handler for the input (required)
    required: PropTypes.bool,      // Whether the input is required (default: false)
    className: PropTypes.string,   // Custom class name for the input
    style: PropTypes.object,       // Inline styles to apply to the input
    onSearch: PropTypes.func,       // Optional function for search functionality (if relevant)
    isFilter: PropTypes.bool       // Optional function for filter functionality (if relevant)
};

// Define default props for the Input component
Input.defaultProps = {
    type: 'text',  // Default input type is text
    required: false, // Default is not required
    style: {},      // Default is no custom styles
    onSearch: null, // Default is no onSearch handler
    isFilter: false, // Default is no isFilter: handler
};

export default Input;
