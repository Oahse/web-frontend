import React from 'react';
import PropTypes from 'prop-types';

const BreadCrumbs = ({ links = [], prev = null, next = null, back = null }) => {
    return (
        <div className="tf-breadcrumb">
            <div className="container">
                <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
                    <div className="tf-breadcrumb-list">
                        {links.map((link, index) => (
                            <React.Fragment key={index}>
                                {index < links.length - 1 ? (
                                    <>
                                        <a href={link.href} className="text">{link.name}</a>
                                        <i className="icon icon-arrow-right"></i>
                                    </>
                                ) : (
                                    <span className="text">{link.name}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="tf-breadcrumb-prev-next">
                        {prev && (
                            <a href={prev.href} className="tf-breadcrumb-prev hover-tooltip center">
                                <i className="icon icon-arrow-left"></i>
                                <span className="tooltip">{prev.tooltip}</span>
                            </a>
                        )}
                        {back && (
                            <a href={back.href} className="tf-breadcrumb-back hover-tooltip center">
                                <i className="icon icon-shop"></i>
                                <span className="tooltip">{back.tooltip}</span>
                            </a>
                        )}
                        {next && (
                            <a href={next.href} className="tf-breadcrumb-next hover-tooltip center">
                                <i className="icon icon-arrow-right"></i>
                                <span className="tooltip">{next.tooltip}</span>
                            </a>
                        )}
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
