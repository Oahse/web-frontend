import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Email = ({ field=false, id=null, value = '', label, name = '', className='', placeholder = '' , ...props }) => {
  const inputField = <input
    id={id?id:name}
    className={`tf-field-input tf-input ${className}`}
    placeholder={placeholder}
    type="email"
    name={name}
    value={value}
    {...props}
  />
  return (
    <>
      {field?
        <fieldset className="email">
          {inputField}
        </fieldset>
        :
        <div className="tf-field style-1">
          
          {inputField}
          <label className="tf-field-label" htmlFor={name}>
            {label ? label : 'Email'} *
          </label>
        </div>
      }
    </>
    
  );
};

Email.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

const Text = ({ value = '', label, name = '', placeholder = ' ' }) => {
  return (
    <div className="tf-field style-1">
      <input
        id={name}
        className="tf-field-input tf-input"
        placeholder={placeholder}
        type="text"
        name={name}
        value={value}
      />
      <label className="tf-field-label" htmlFor={name}>
        {label} *
      </label>
    </div>
  );
};

Text.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};


const Password = ({ value = '', label, name = '', placeholder = ' ' }) => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="tf-field style-1 password">
      <input
        id={name}
        className="tf-field-input tf-input password-input"
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
      />
      <label className="tf-field-label" htmlFor={name}>
        {label ? label : 'Password'} *
      </label>
      <span
        className={`show-pass ${showPassword ? 'active' : ''}`}
        onClick={togglePasswordVisibility}
        style={{ cursor: 'pointer' }}
      >
        {showPassword ? 'Hide' : 'Show'}
      </span>
    </div>
  );
};

Password.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export { Email, Password, Text };
