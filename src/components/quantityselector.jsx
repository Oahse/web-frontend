import React, { useState } from 'react';

const QuantitySelector = ({value =1, onChange, editable=false}) => {
  const [quantity, setQuantity] = useState(value||1);

  const handleIncrease = () => {
    setQuantity(prev => {
      const newQuantity = prev + 1;
      if (onChange) {
        onChange(newQuantity);
      }
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity(prev => {
      const newQuantity = prev > 1 ? prev - 1 : 1;
      if (onChange) {
        onChange(newQuantity);
      }
      return newQuantity;
    });
  };

  return (
    <div className="wg-quantity">
      <span className="btn-quantity btn-decrease" onClick={handleDecrease}>
          <svg className="d-inline-block" width="9" height="1"
              viewBox="0 0 9 1" fill="currentColor">
              <path
                  d="M9 1H5.14286H3.85714H0V1.50201e-05H3.85714L5.14286 0L9 1.50201e-05V1Z">
              </path>
          </svg>
      </span>
      <input
          type="text"
          className={!editable ? "quantity-product" : ""}

          name="number"
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) {
              setQuantity(val);
              if (onChange) onChange(val);
            }
          }}
          readOnly={!editable}

      />
      <span className="btn-quantity btn-increase" onClick={handleIncrease}>
          <svg className="d-inline-block" width="9" height="9"
              viewBox="0 0 9 9" fill="currentColor">
              <path
                  d="M9 5.14286H5.14286V9H3.85714V5.14286H0V3.85714H3.85714V0H5.14286V3.85714H9V5.14286Z">
              </path>
          </svg>
      </span>
    </div>
  );
};

export default QuantitySelector;
