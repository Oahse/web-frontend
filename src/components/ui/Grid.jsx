import React from 'react';
import PropTypes from 'prop-types';

function Grid({ children }) {
  return <div className="grid">{children}</div>;
}

Grid.propTypes = {
  children: PropTypes.node.isRequired, // Accepts any valid React child nodes
};

export default Grid;
