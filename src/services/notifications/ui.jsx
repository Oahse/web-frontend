import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

const notify = ({ text, type = 'default' }) => {
  switch (type) {
    case 'success':
      toast.success(text);
      break;
    case 'info':
      toast.info(text);
      break;
    case 'warning':
      toast.warn(text);
      break;
    case 'error':
      toast.error(text);
      break;
    default:
      toast(text);
  }
};

notify.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'default']),
};

export { ToastContainer, notify };
