import React from 'react';
import { Card as AntdCard } from "antd";
import PropTypes from 'prop-types';
import Meta from 'antd/es/card/Meta';

const Card = ({ className, variant = "borderless", size = "small", onClick, style, title, description }) => {
  return (
    <AntdCard variant={variant} size={size} className={className} style={style} onClick={onClick}>
        <Meta
            className="mb-2"
            title={title}
            description={description}
        />
    </AntdCard>
  );
};

// Define PropTypes for better reusability and error checking
Card.propTypes = {
  className: PropTypes.string,  // Optional custom classes
  variant: PropTypes.oneOf(["borderless", "outlined"]),  // Specify accepted values for variant
  size: PropTypes.oneOf(["small", "medium", "large"]), // Accepted values for size
  onClick: PropTypes.func, // Optional onClick handler
  style: PropTypes.object,  // Inline styles
  title: PropTypes.string.isRequired,  // Title of the card
  description: PropTypes.string,  // Optional description text
};

Card.defaultProps = {
  className: '', // Default to no additional classes
  variant: 'borderless', // Default variant
  size: 'small', // Default size
  onClick: null, // Default to no onClick action
  style: {}, // Default to no custom inline styles
  description: '', // Default to empty description
};

export default Card;
