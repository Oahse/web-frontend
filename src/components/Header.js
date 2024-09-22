import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/oahse-logo.png';
import BottomNavbar from './BottomNavBar'; // Import your BottomNavbar component
import { isDesktop, isMobile, isTablet } from 'react-device-detect';

const Header = ({ Companyname, isloggedIn, userDetails }) => {
    const renderLinks = () => {
        const links = [
            { name: 'Explore', url: '/', icon: <i className="fa-light fa-compass nav-icons"></i> },
            { name: 'MarketPlace', url: '/marketplace', icon: <i className="fa-light fa-grid-2 nav-icons"></i> },
            { name: 'Map', url: '/map', icon: <i className="fa-light fa-location-crosshairs nav-icons" ></i> },
            { name: 'Cart', url: '/cart', icon: <i className="fa-light fa-cart-shopping nav-icons"></i> },
            { name: 'User', url: '/user', icon: <i className="fa-light fa-user nav-icons" ></i> },
        ];

        return (
            links.map((link, index) => (
                link !== 'User' ?<Link key={index} to={link.url} className="m-2 icon-container">
                <div className="d-flex align-items-center">
                    {link.icon}
                    {isDesktop && <span className='text-dark ms-1'>{link.name}</span>}
                </div>
            </Link>:<Link key={index} to={link.url} className="m-2 icon-container">
                    <div className="d-flex align-items-center">
                        {userDetails?userDetails?.profileImage:link.icon}
                        {isDesktop && <span className='text-dark ms-1'>{link.name}</span>}
                    </div>
                </Link>
            ))
        );
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
                        {isloggedIn ? 
                        <span className="d-flex flex-row align-items-center">
                            <i class="fa-light fa-message-lines nav-icons"></i>
                            {isDesktop && <span className='text-dark ms-1'>Messages</span>}
                        </span>
                        :
                        (isDesktop && <span className="d-flex flex-row align-items-center">
                            {renderLinks()}
                            <Link key={4} to={'/messages'} className="m-2 icon-container">
                                <div className="d-flex align-items-center">
                                    <i class="fa-light fa-message-lines nav-icons"></i>
                                    <span className='text-dark ms-1'>Messages</span>
                                </div>
                            </Link></span>)
                        }
                        
                        
                    </div>
                </Container>
            </Navbar>

            {/* Bottom Navbar for mobile and tablet */}
            {(isMobile || isTablet) && isloggedIn ? <BottomNavbar renderLinks={renderLinks} /> : null}
        </>
    );
};

export default Header;
