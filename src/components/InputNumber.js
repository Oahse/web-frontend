import React, { useState } from 'react';
import { Input } from 'antd';

const MAX_PRICE = 9999999999999999; // Max limit
const MIN_PRICE = 0; // Min limit
const VALUE = 0

const InputNumber = ({ min = MIN_PRICE, max = MAX_PRICE, value = VALUE, singlevalue, onChange, placeholder,style }) => {
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
      }else{
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
      className="number"
      placeholder={placeholder}
      value={val}
      onChange={handleNumberChange}
      style={style}
      min={min}
      max={max}
    />
  );
};

export default InputNumber;
