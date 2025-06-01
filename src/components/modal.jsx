import React, { useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const Modal = ({ id, show = false, onClose, children = null, className = '', centered = true, title, fade = true, closable = true, body = null }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
  
  
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);
  
  
  
  return (
    <div
      className={`modal ${centered ? 'modalCentered' : 'fullRight'} ${fade ? 'fade' : ''} ${className}`}
      id={id}
    >
      <div
        className={`modal-dialog ${centered ? 'modal-dialog-centered' : 'fullRight'}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // Prevent inside click from bubbling
      >
        <div className="modal-content">
          {children ? (
            children
          ) : (
            <>
              <div className="header">
                {title && <div className="demo-title">{title}</div>}
                {closable && (
                  <span
                    className="icon-close icon-close-popup"
                    data-bs-dismiss="modal"
                    role="button"
                    aria-label="Close"
                  ></span>
                )}
              </div>
              {body && body}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  fade: PropTypes.bool,
  closable: PropTypes.bool,
  body: PropTypes.node,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default Modal;
