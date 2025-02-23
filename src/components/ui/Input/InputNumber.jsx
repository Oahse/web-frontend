import React, { useState } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types'; // Import PropTypes
import './Input.css';


const InputNumber = ({ min = 0, max = 9999999999999999, value = 0, singlevalue, onChange, placeholder, style = {}, ...props }) => {
  const [val, setValue] = useState(value);

  function getSecondDigit(num) {
    // Ensure the number is two digits
    if (num < 10 || num > 99) {
      throw new Error('Input must be a two-digit number');
    }

    // Use modulus and division to extract the second digit
    return num % 10; // Gets the second digit directly
  }

  const handleNumberChange = (e) => {
    let newValue = e.target.value;

    // Convert to number and validate
    if (newValue === '' || isNaN(newValue)) {
      setValue('');
      return;
    }

    newValue = Number(newValue);

    // Validate against min and max
    if (newValue < min) {
      newValue = min;
    } else if (newValue > max) {
      if (singlevalue) {
        newValue = getSecondDigit(newValue);
      } else {
        newValue = max;
      }
    }

    // Update local state
    setValue(newValue);

    // Call the parent onChange if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Input
      type="number"
      className="input-number"
      placeholder={placeholder}
      value={val}
      onChange={handleNumberChange}
      style={style}
      min={min}
      max={max}
      {...props}
    />
  );
};

// Add PropTypes for validation
InputNumber.propTypes = {
  min: PropTypes.number, // min should be a number
  max: PropTypes.number, // max should be a number
  value: PropTypes.number, // value should be a number
  singlevalue: PropTypes.bool, // singlevalue should be a boolean
  onChange: PropTypes.func, // onChange should be a function
  placeholder: PropTypes.string, // placeholder should be a string
  style: PropTypes.object, // style should be an object
};

// Default values for optional props
InputNumber.defaultProps = {
  min: 0, // Min limit
  max: 9999999999999999, // Max limit
  value: 0, 
  singlevalue: false,
  onChange: null,
  placeholder: '',
  style: {},
};

export default InputNumber;
