import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'; // useLocation to detect URL changes
import Logo from '../assets/oahse-logo.png';
import BottomNavbar from './BottomNavBar';
import { isDesktop, isMobile, isTablet } from 'react-device-detect';

const Header = ({ Companyname, isloggedIn, userDetails }) => {
    const location = useLocation(); // Get the current location (URL)
    const [activeLink, setActiveLink] = useState(location.pathname); // Track the active link based on the current path

    // Update active link based on the URL change
    useEffect(() => {
        setActiveLink(location.pathname); // Set the active link to the current URL path
    }, [location]); // Only run when the URL changes

    const renderLinks = () => {
        const links = [
            { name: 'Home', url: '/home', icon: <i className="fa-light fa-house nav-icons"></i> },
            { name: 'MarketPlace', url: '/', icon: <i className="fa-light fa-grid-2 nav-icons"></i> },
            { name: 'Map', url: '/map', icon: <i className="fa-light fa-location-crosshairs nav-icons"></i> },
            { name: 'Cart', url: '/cart', icon: <i className="fa-light fa-cart-shopping nav-icons"></i> },
            { name: 'User', url: '/user', icon: <i className="fa-light fa-user nav-icons"></i> },
        ];

        return links.map((link, index) => (
            <Link 
                key={index} 
                to={link.url} 
                className="m-2 icon-container"
            >
                <div className="d-flex align-items-center">
                    {/* Conditionally apply 'text-white fw-bold' to the active link */}
                    
                    {isDesktop ?
                        <i className={`${link.icon.props.className} ${activeLink === link.url ? 'text-dark fw-bold' : ''}`}></i>: 
                        <i className={`${link.icon.props.className} ${activeLink === link.url ? 'text-white fw-bold' : ''}`}></i>}
                    {isDesktop && <span className='text-dark ms-1'>{link.name}</span>}
                </div>
            </Link>
        ));
    };

    return (
        <>
            <Navbar bg="light" expand="lg" fixed="top" className="m-0 p-0">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img src={Logo} width="80" height="46" className="navbar-logo" alt="Logo" />
                        <span className="navbar-title"> {Companyname}</span>
                    </Navbar.Brand>
                    <div className="d-flex justify-content-between align-items-center" style={{ marginLeft: 'auto' }}>
                        {isloggedIn ? (
                            <span className="d-flex flex-row align-items-center">
                                <i className="fa-light fa-message-lines nav-icons"></i>
                                {isDesktop && <span className='text-dark ms-1'>Messages</span>}
                            </span>
                        ) : (
                            <span className="d-flex flex-row align-items-center">
                                {isDesktop ?renderLinks():null}
                                <Link to="/messages" className="m-2 icon-container">
                                    <div className="d-flex align-items-center">
                                        <i className="fa-light fa-message-lines nav-icons"></i>
                                        {isDesktop?<span className='text-dark ms-1'>Messages</span>:null}
                                    </div>
                                </Link>
                            </span>
                        )}
                    </div>
                </Container>
            </Navbar>

            {/* Bottom Navbar for mobile and tablet */}
            {(isMobile || isTablet) ? <BottomNavbar renderLinks={renderLinks} /> : null}
        </>
    );
};

export default Header;
