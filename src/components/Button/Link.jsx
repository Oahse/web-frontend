import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Icon from './Icon';

const Link = ({
  to = '#',
  text = '',
  icon = '',
  children,
  className = '',
  classNameReplace =false,
  dataBsToggle,
  target,
  rel,
  ...rest
}) => {
  const isInternal = to && to.startsWith('/');

  const content = children || (
    <>
      {text}
      {icon && <span className='ms-2'><Icon icon={icon}></Icon></span>}
    </>
  );

  const commonProps = {
    className: `${(classNameReplace ===true) && 'btn-link fw-6 w-100 link text-decoration-none'} ${className}`.trim(),
    ...(dataBsToggle && { 'data-bs-toggle': dataBsToggle }),
    ...rest,
  };

  return isInternal ? (
    <RouterLink to={to} {...commonProps}>
      {content}
    </RouterLink>
  ) : (
    <a href={to} target={target} rel={rel} {...commonProps}>
      {content}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  classNameReplace:PropTypes.bool,
  dataBsToggle: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
};

export default Link;
