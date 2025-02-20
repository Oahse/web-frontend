import React from 'react';
import PropTypes from 'prop-types';
import './Tile.css'; // Create a CSS file for styles or use inline styles

const Tile = ({ className, onClick, style, header, body, footer, children,cardBodyClass}) => {
    const tileBody = "tile-body "+cardBodyClass;
    return (
        <div
        className={`tile ${className}`} // Combine base class with custom classes
        onClick={onClick}
        style={style}
        >
        {header && <div className='tile-header'>{header} </div>}
        {body && <div className={tileBody}> {body}</div>}
        {children && <div className={tileBody}>{children}</div>} {/* Supports children */}
        {footer && <div className='tile-footer'> {footer}</div>}
        </div>
    );
};

// Define PropTypes for better reusability and error checking
Tile.propTypes = {
    children: PropTypes.node.isRequired, // Card content
    className: PropTypes.string, // Additional custom classes
    onClick: PropTypes.func, // Optional onClick handler
    style: PropTypes.object, // Inline styles
};

Tile.defaultProps = {
    className: '', // Default to no additional classes
    onClick: null, // Default to no onClick action
    style: {}, // Default to no custom inline styles
};

export default Tile;