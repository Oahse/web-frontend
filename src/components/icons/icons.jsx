import React from 'react';
import PropTypes from 'prop-types';

const BaseIcon = ({ width = 20, height = 20, color = 'currentColor', children, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {React.cloneElement(children, { stroke: color })}
    </svg>
  );
};

BaseIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default BaseIcon;
