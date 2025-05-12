import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon = '', children }) => {
  return (
    <i className={`icon ${children ? children : icon}`}></i>
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node
};

export default Icon;
