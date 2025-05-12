import PropTypes from 'prop-types';
import Icon from "./Icon";

const Button = ({
  id = null,
  size = null,
  text = '',
  fill = true,
  className = '',
  type = 'button',
  icon = ''
}) => {
  return (
    <button
      id={id}
      type={type}
      className={`tf-btn ${size ? `btn-${size}` : ''} ${fill ? 'btn-fill' : ''} animate-hover-btn radius-3 w-100 justify-content-center ${className}`}
    >
      <span>{text}</span> <Icon icon={icon} />
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  size: PropTypes.oneOf([null, 'sm', 'md', 'lg']), // Adjust sizes as per your usage
  text: PropTypes.string,
  fill: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.string
};

export default Button;
