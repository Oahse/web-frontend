import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar } from 'react-bootstrap';
import Logo from '../../../assets/oahse-logo.png';
import Globe from '../../icons/globe';
import Button from '../Button/Button';
import useDeviceType from '../../../hooks/useDeviceType';
import './Header.css';

function Header({ Companyname, isScrolled }) {
    const { isMobile } = useDeviceType();
    return (
        <nav className={`navbar`}>
            <Container className={`${isScrolled ? 'header-scrolled bg-white' : 'bg-none'}`} fluid={isScrolled}>
                <Navbar.Brand href="/">
                    <img
                    src={`${isScrolled ? Logo : Logo}`}
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
                    <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><Globe width={22} height={22} color={`${isScrolled ? 'black' : 'white'}`} /><span className='m-1 fw-bold'>English</span></span>
                    <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><span className='m-1 fw-bold'>Become A Supplier</span></span>
                    </>:null}
                    <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}>
                            <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><Button
                                        type='link'
                                        text="Start for Free"
                                        color="primary"
                                        onClick={() => console.log('Button clicked')}
                                        />

                            </span>
                        </span>
                    </span>
                    {isMobile?<span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><i className="fa-light fa-bars " style={{ fontSize: '24px' }}></i></span>:null}
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
