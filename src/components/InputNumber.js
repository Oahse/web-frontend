import React, { useState } from 'react';
import { Input } from 'antd';

const MAX_PRICE = 9999999999999999; // Max limit
const MIN_PRICE = 0; // Min limit

const InputNumber = ({ min = MIN_PRICE, max = MAX_PRICE, value = 0, onChange, placeholder,style }) => {
  const [val, setValue] = useState(value);

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
      newValue = max;
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
