import PropTypes from 'prop-types';

const Icon = ({size=24, name, color="currentColor", className, onClick, ...props}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} onClick={onClick} className={className} {...props}>
            <path fill={color} d={name} ></path>
        </svg>
    );
};

// Define PropTypes for the Icon component
Icon.propTypes = {
    size: PropTypes.number,       // size should be a number, default is 24
    name: PropTypes.string.isRequired,   // name is a required string (path data)
    color: PropTypes.string,      // color should be a string, default is "currentColor"
    onClick: PropTypes.func,      // onClick should be a function
};

// Define default values for props
Icon.defaultProps = {
    size: 24,                // default size is 24
    color: "currentColor",   // default color is "currentColor"
    onClick: null,           // default onClick is null (no action by default)
};

export default Icon;
