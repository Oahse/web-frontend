import React from 'react';
import { Link } from 'react-router-dom';
const Breadcrumbs = ({ items }) => {
  return (
    <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <li>
            {item.href ? (
              <Link to={item.href} className="text-decoration-none">
                <div className="text-tiny">{item.label}</div>
              </Link>
            ) : (
              <div className="text-tiny">{item.label}</div>
            )}
          </li>
          {index < items.length - 1 && (
            <li>
              <i className="icon-chevron-right"></i>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
