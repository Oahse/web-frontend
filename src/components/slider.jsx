import React, { useState } from "react";

function Slider({min=1, max=100, onChange}) {
  // separate states for min, max and current value
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [currentValue, setCurrentValue] = useState(maxValue);

  // Update currentValue when slider changes
  const handleSliderChange = (e) => {
    setCurrentValue(Number(e.target.value));
    if (onChange){
        onChange(Number(e.target.value));
    }
  };

  

  return (
    <input
        type="range"
        min={minValue}
        max={maxValue}
        value={currentValue}
        onChange={handleSliderChange}
        className="slider m-2"
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        aria-valuenow={currentValue}
        style={{ width: "100%", cursor:'pointer' }}
      />
  );
}

export default Slider;
