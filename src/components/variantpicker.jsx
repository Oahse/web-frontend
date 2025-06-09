import React, { useState, useEffect } from 'react';

const defaultSizes = [
  { label: 'S', id: 'values-s', price: 0 },
  { label: 'M', id: 'values-m', price: 9 },
  { label: 'L', id: 'values-l', price: 10 },
  { label: 'XL', id: 'values-xl', price: 12 }
];

const VariantPicker = ({ sizes = [], onSelect, showall, editable = false }) => {
  const visibleSizes = showall ? defaultSizes : sizes;

  // Initialize selected size to first visible size or null
  const [selectedSize, setSelectedSize] = useState(visibleSizes[0]?.label);

  useEffect(() => {
    if (visibleSizes.length && onSelect) {
      onSelect(visibleSizes[0]);
    }
  }, [visibleSizes, onSelect]);

  const handleChange = (e) => {
    if (!editable) return; // Prevent change if not editable

    const value = e.target.value;
    console.log(value,'--')
    setSelectedSize(value);

    const selected = visibleSizes.find(size => size.label === value);
    if (onSelect) {
        onSelect(selected);
    }
  };

  return (
    <div className="variant-picker-values">
      {visibleSizes.map((size) => (
        <React.Fragment key={size.id}>
          <input
            type="radio"
            name="size"
            id={size.id}
            value={size.label}
            checked={selectedSize === size.label}
            onChange={handleChange}
            onClick={handleChange}
            disabled={!editable} // Disable input when not editable
          />
          <label
            className={`style-text size-btn ${!editable ? 'disabled' : ''}`}
            htmlFor={size.id}
            data-price={size.price}
            data-value={size.label}
            style={{ cursor: editable ? 'pointer' : 'not-allowed' }}
          >
            <p>{size.label}</p>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default VariantPicker;
