import React, { useState, useEffect, useRef } from 'react';

import './DropDown.css';

const Dropdown = ({ dropdownbtn = null, content = null, isImage=true }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
        className={`dropdown no-text ${isImage && 'image-select'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing the dropdown on button click
        ref={dropdownRef}
      >
        {/* Button that toggles the dropdown */}
        <div className='dropdown-btn' onClick={toggleDropdown} aria-expanded={isOpen} aria-haspopup="true">
          {dropdownbtn}
        </div>

        {/* Conditionally render the dropdown menu based on isOpen */}
        <div className={`dropdown-menu dropdown-menu-end has-content ${isOpen ? 'show' : ''}`}>
          {content}
        </div>
    </div>
  );
};

export default Dropdown;
