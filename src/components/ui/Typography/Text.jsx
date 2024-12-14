import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const validTags = ['p', 'small', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'strong', 'em', 'u', 'mark', 'i', 'b'];

const Text = ({ 
  children, 
  className,
  fontSize = 'text-base',  // Default font size
  fontColor = 'text-black', // Default text color
  fontWeight = 'fw-600',
  bgColor = 'bg-transparent', // Default background color
  padding = 'p-0',            // Default padding
  margin = 'm-0',             // Default margin
  textDecoration = '',        // Default text decoration (e.g., underline)
  startIcon = null,           // Optional start icon
  endIcon = null,             // Optional end icon
  tag = 'p'                   // Default to <p> tag
}) => {
  // If the tag isn't valid, fall back to 'p'
  const Tag = validTags.includes(tag) ? tag : 'p'; 
  
  return (
    <Tag className={`${className} ${fontSize} ${fontColor} ${fontWeight} ${bgColor} ${padding} ${margin} ${textDecoration} flex items-center`}>
      {/* Render start icon if provided */}
      {startIcon && <span className="mr-2">{startIcon}</span>}

      {/* Main text content */}
      {children}

      {/* Render end icon if provided */}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </Tag>
  );
};

// PropTypes to validate props
Text.propTypes = {
  children: PropTypes.node.isRequired,  // `children` should be a React node (text, elements, etc.)
  fontSize: PropTypes.string,           // `fontSize` is a string representing Tailwind class
  bold: PropTypes.string,              // `bold` is a string representing Tailwind class for font weight
  fontColor: PropTypes.string,         // `fontColor` is a string for text color Tailwind class
  bgColor: PropTypes.string,           // `bgColor` is a string for background color Tailwind class
  padding: PropTypes.string,           // `padding` is a string for padding Tailwind class
  margin: PropTypes.string,            // `margin` is a string for margin Tailwind class
  textDecoration: PropTypes.string,    // `textDecoration` is for text decoration (e.g., underline)
  startIcon: PropTypes.node,           // `startIcon` can be any React node (an icon component or HTML element)
  endIcon: PropTypes.node,             // `endIcon` can be any React node (an icon component or HTML element)
  tag: PropTypes.string,               // `tag` is the tag to be rendered (default is 'p')
};

// Default props
Text.defaultProps = {
  fontSize: 'text-base',  // Default font size (standard text)
  bold: 'font-normal',    // Default font weight (normal)
  fontColor: 'text-black', // Default text color (black)
  bgColor: 'bg-transparent', // Default background color (transparent)
  padding: 'p-0',            // No padding by default
  margin: 'm-0',             // No margin by default
  textDecoration: '',        // No decoration by default
  startIcon: null,           // No start icon by default
  endIcon: null,             // No end icon by default
  tag: 'p',                   // Default to <p> tag
};

export default Text;
