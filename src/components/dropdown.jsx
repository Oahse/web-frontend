import React, { useState } from "react";
import PropTypes from "prop-types";

const DropDown = ({ active = 0, items = [], onSelect=() => {}, callcomponent=null }) => {
  const [selectedIndex, setSelectedIndex] = useState(active);
  const [show, setShow] = useState(false);
  const handleSelect = (item, index) => {
      setSelectedIndex(index);
      if(onSelect){
          onSelect(item);
      }
  };

  return (
    <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
      <div className="btn-select" onClick={()=>setShow(!show)}>
        {callcomponent || <>
        <span className="text-sort-value">{items[selectedIndex]?.label || "Select"}</span>
        <span className="icon icon-arrow-down"></span></>}
      </div>
      <div className={`dropdown-menu ${show && ' show'}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`select-item ${index === selectedIndex ? "active" : ""}`}
            data-sort-value={item.sortValue || undefined}
            onClick={() => handleSelect(item, index)}
            style={{ cursor: "pointer" }}
          >
            <span className="text-value-item">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  active: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      sortValue: PropTypes.string,
    })
  ),
};

export default DropDown;
