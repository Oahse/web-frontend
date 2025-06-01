import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ links = [], dir='left'}) => {
    const dirClass = {
        left: 'd-flex align-items-center justify-content-start',
        center: 'd-flex align-items-center justify-content-center',
        right: 'd-flex align-items-center justify-content-end',
      }[dir] || '';
      
    return (
        <div className="tf-breadcrumb">
            <div className={`container ${dirClass}`}>
                <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
                    <div className="tf-breadcrumb-list">
                        {links.map((link, index) => (
                            <React.Fragment key={index}>
                                {index < links.length - 1 ? (
                                    <>
                                        <Link to={link.href} className="text">{link.name}</Link>
                                        <i className="icon icon-arrow-right"></i>
                                    </>
                                ) : (
                                    <span className="text">{link.name}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

BreadCrumbs.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string
        })
    ),
    dir:PropTypes.oneOf['center', 'left', 'right'],
    prev: PropTypes.shape({
        href: PropTypes.string.isRequired,
        tooltip: PropTypes.string.isRequired
    }),
    next: PropTypes.shape({
        href: PropTypes.string.isRequired,
        tooltip: PropTypes.string.isRequired
    }),
    back: PropTypes.shape({
        href: PropTypes.string.isRequired,
        tooltip: PropTypes.string.isRequired
    })
};

export default BreadCrumbs;
