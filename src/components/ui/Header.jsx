import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar } from 'react-bootstrap';
import Logo from '../../assets/oahse-logo.png';
import Globe from '../icons/globe';
import Button from './Button/Button';
import useDeviceType from '../../hooks/useDeviceType';

function Header({ Companyname, isScrolled }) {
    const { isMobile } = useDeviceType();
    return (
        <nav className='navbar'>
            <Container className={`bg-none ${isScrolled ? 'header-scrolled' : ''}`} fluid={isScrolled}>
                <Navbar.Brand href="/">
                    <img
                    src={Logo}
                    width="80"
                    height="46"
                    className="navbar-logo"
                    alt={`${Companyname} Logo`}
                    />
                    <span className="navbar-title">{Companyname}</span>
                </Navbar.Brand>

                {/* Align this div to the right */}
                <div className="d-flex align-items-center">
                    <span className="d-flex flex-row align-items-center">
                    {!isMobile?
                    <>
                    <span className='text-white p-1'><Globe width={22} height={22} color="white" /><span className='text-white m-1 fw-bold'>English</span></span>
                    <span className='text-white p-1'><span className='text-white m-1 fw-bold'>Become A Supplier</span></span>
                    </>:null}
                    <span className='text-white p-1'>
                            <span className='text-white m-1'><Button
                                        type='link'
                                        text="Start for Free"
                                        color="primary"
                                        onClick={() => console.log('Button clicked')}
                                        />

                            </span>
                        </span>
                    </span>
                    {isMobile?<span className='text-white p-1'><i className="fa-light fa-bars " style={{ fontSize: '24px' }}></i></span>:null}
                </div>
            </Container>
        </nav>
        
    );
}

// Prop Validation
Header.propTypes = {
  Companyname: PropTypes.string.isRequired, // Companyname must be a string and is required
  isScrolled: PropTypes.bool.isRequired,   // isScrolled must be a boolean and is required
};

export default Header;
