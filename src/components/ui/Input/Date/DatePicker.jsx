import React from "react";
import { DatePicker as AntDatePicker } from "antd";
import dayjs from "dayjs";
import PropTypes from 'prop-types'; // Import PropTypes
import './DatePicker.css';

const DatePicker = ({ placeholder, value, onChange, style = {},disabled=false, ...props }) => {
  // Ensure the value is a valid dayjs object
  const validValue = value ? dayjs(value) : dayjs(Date.now());

  return (
    <AntDatePicker
      placeholder={placeholder}
      value={validValue.isValid() ? validValue : null}  // Only pass a valid dayjs object or null
      onChange={onChange}
      style={style}
      disabled={disabled}
      {...props}
    />
  );
};

// Add PropTypes for validation
DatePicker.propTypes = {
  placeholder: PropTypes.string,         // Placeholder for the input field
  value: PropTypes.oneOfType([          // Value should be a dayjs object or a date string
    PropTypes.instanceOf(dayjs),
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  disabled:PropTypes.bool,                                    // You can accept date strings or Date objects as well
  onChange: PropTypes.func.isRequired,   // onChange function is required
  style: PropTypes.object,               // style prop (optional)
};

// Set default values for props
DatePicker.defaultProps = {
  style: {}, 
  disabled:false                            // Default style to an empty object if not passed
};

export default DatePicker;
