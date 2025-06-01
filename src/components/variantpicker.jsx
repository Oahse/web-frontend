import React, { useState } from 'react';
// const sizes = [
//   { label: 'S', id: 'values-s', price: 0 },
//   { label: 'M', id: 'values-m', price: 9 },
//   { label: 'L', id: 'values-l', price: 10 },
//   { label: 'XL', id: 'values-xl', price: 12 },
// ];

const VariantPicker = ({ sizes=[], onSelect }) => {
  const [selectedSize, setSelectedSize] = useState('S');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedSize(value);

    const selected = sizes.find(size => size.label === value);
    if (onSelect) {
      onSelect(selected);
    }
  };

  return (
    <div className="variant-picker-values">
      {sizes.map((size) => (
        <React.Fragment key={size.id}>
          <input
            type="radio"
            name="size1"
            id={size.id}
            value={size.label}
            checked={selectedSize === size.label}
            onChange={handleChange}
          />
          <label
            className="style-text size-btn"
            htmlFor={size.id}
            data-price={size.price}
            data-value={size.label}
          >
            <p>{size.label}</p>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default VariantPicker;
