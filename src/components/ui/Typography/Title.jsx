import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const Title = ({ 
  children, 
  as = 'h1', // Default to 'h1', can be changed to any heading tag
  fontSize = 'text-3xl', 
  bold = 'font-semibold', 
  fontColor = 'text-black',   // Default font color
  bgColor = 'bg-transparent', // Default background color
  padding = 'p-0',            // Default padding
  margin = 'm-0',             // Default margin
  textDecoration = '',        // Default text decoration
  startIcon = null,           // Optional start icon
  endIcon = null,             // Optional end icon
}) => {
  const Tag = as; // Dynamically render the specified tag (h1, h2, h3, etc.)

  return (
    <Tag className={`${fontSize} ${bold} ${fontColor} ${bgColor} ${padding} ${margin} ${textDecoration} flex items-center`}>
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
Title.propTypes = {
  children: PropTypes.node.isRequired,  // `children` should be a React node (text, elements, etc.)
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']), // Limit the `as` prop to heading tags only
  fontSize: PropTypes.string,           // `fontSize` is a string representing Tailwind class
  bold: PropTypes.string,              // `bold` is a string representing Tailwind class for font weight
  fontColor: PropTypes.string,         // `fontColor` is a string for text color Tailwind class
  bgColor: PropTypes.string,           // `bgColor` is a string for background color Tailwind class
  padding: PropTypes.string,           // `padding` is a string for padding Tailwind class
  margin: PropTypes.string,            // `margin` is a string for margin Tailwind class
  textDecoration: PropTypes.string,    // `textDecoration` is for text decoration (e.g., underline)
  startIcon: PropTypes.node,           // `startIcon` can be any React node (an icon component or HTML element)
  endIcon: PropTypes.node,             // `endIcon` can be any React node (an icon component or HTML element)
};

// Default props
Title.defaultProps = {
  as: 'h1',  // Default tag is 'h1'
  fontSize: 'text-3xl',
  bold: 'font-semibold',
  fontColor: 'text-black',
  bgColor: 'bg-transparent',
  padding: 'p-0',
  margin: 'm-0',
  textDecoration: '',  // No decoration by default
  startIcon: null,     // No start icon by default
  endIcon: null,       // No end icon by default
};

export default Title;
