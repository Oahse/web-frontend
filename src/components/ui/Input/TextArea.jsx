import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './Input.css';

const TextArea = ({ 
    type = 'text', 
    placeholder = "Type your text here...", 
    value, 
    onChange, 
    required = false, 
    className, 
    disabled = false,
    style = {}, 
    rows = "6",
    cols = "50",
    ...props
}) => {
    return (
        <textarea
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
            required={required}
            disabled={disabled}
            rows={rows}
            cols={cols}
            style={style} // apply custom inline styles if provided
            {...props}
        />
    );
};

// Define prop types for the TextArea component
TextArea.propTypes = {
    type: PropTypes.string,         // The type of the input (text, password, etc.)
    placeholder: PropTypes.string,  // The placeholder text
    value: PropTypes.string.isRequired,  // The value of the textarea (required)
    onChange: PropTypes.func.isRequired,  // The change handler for the textarea (required)
    required: PropTypes.bool,      // Whether the textarea is required (default: false)
    disabled: PropTypes.bool,
    className: PropTypes.string,   // Custom class name for the textarea
    style: PropTypes.object,       // Inline styles to apply to the textarea
    rows: PropTypes.string,        // Number of rows for the textarea
    cols: PropTypes.string,        // Number of columns for the textarea
};

// Define default props for the TextArea component
TextArea.default = {
    type: 'text',  // Default input type is text
    required: false, // Default is not required
    disabled: false,
    style: {},      // Default is no custom styles
    rows: '4',      // Default number of rows
    cols: '50',     // Default number of columns
};

export default TextArea;
