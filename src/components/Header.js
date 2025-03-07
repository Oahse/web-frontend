import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'; // useLocation to detect URL changes

import BottomNavbar from './ui/BottomNavBar/BottomNavBar';
import { isDesktop, isMobile, isTablet } from 'react-device-detect';
import { Avatar, Drawer, Dropdown, Menu } from 'antd';
import Button from './ui/Button/Button';

const Header = ({ Companyname, isloggedIn, userDetails }) => {
    const location = useLocation(); // Get the current location (URL)
    const [activeLink, setActiveLink] = useState(location.pathname); // Track the active link based on the current path
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [toggle, setToogle] =useState('fa-bars')
  
    // Function to toggle the Drawer
    const toggleDrawer = () => {
        if (toggle === 'fa-bars'){
            setToogle('fa-x')
        }else{
            setToogle('fa-bars')
        }
        setIsDrawerVisible(!isDrawerVisible);
    };
    const links = [
        !isloggedIn ? { name: 'Home', url: '/home', icon: <i className="fa-light fa-house nav-icons"></i> } : null,
        { name: 'MarketPlace', url: '/', icon: <i className="fa-light fa-grid-2 nav-icons"></i> },
        { name: 'Cart', url: '/cart', icon: <i className="fa-light fa-cart-shopping nav-icons"></i> },
        { name: 'User', url: '/user', icon: <i className="fa-light fa-user nav-icons"></i> },
    ].filter(Boolean); // Remove null values
    // Dropdown menu for User options
    const userMenu = (
        <Menu>
            {
                isloggedIn?
                <>
                    <Menu.Item key="email">
                        <span>{userDetails?.email}</span>
                    </Menu.Item>
                    <Menu.Item key="logout">
                        <Link to="/logout" className='text-dark'>Logout</Link>
                    </Menu.Item>
                </>
                :
                <Menu.Item key="login">
                    <Link to="/login" className='text-dark'>Login</Link> 
                </Menu.Item>
            }
        </Menu>
    );


    // Update active link based on the URL change
    useEffect(() => {
        setActiveLink(location.pathname); // Set the active link to the current URL path
    }, [location]); // Only run when the URL changes

    const renderLinks = () => {

        return links.map((link, index) => (
            
            link.url === '/user'?
                <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                    <span className="nav-link" style={{ cursor: 'pointer' }}>
                        <Avatar style={{padding:'10px' }} icon={<i className="fa-light fa-user nav-icons"></i>} />
                        <small className='m-2 text-dark'>{userDetails?.first_name}</small>
                    </span>
                </Dropdown>:
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
                <Container>
                    <Navbar.Brand href="/">
                        {/* <img src={Logo} width="80" height="46" className="navbar-logo" alt="Company Logo" /> */}
                        <span className="navbar-title"> {Companyname}</span>
                    </Navbar.Brand>
                    <div className="d-flex justify-content-between align-items-center" style={{ marginLeft: 'auto' }}>
                    <span className="d-flex flex-row align-items-center">
                                {activeLink === '/home'?
                                    <>
                                        <Link 
                                            to='/contactus' 
                                            className="m-2 icon-container"
                                        >
                                            <div className="d-flex align-items-center">
                                                {isDesktop ? <span className='text-dark fw-bold mr-1'>support</span>:
                                                    <i className={`fa-light fa-headset nav-icons m-1 ${activeLink === '/contactus' ? 'text-white fw-bold' : ''}`}></i>}
                                            </div>
                                        </Link>
                                        
                                        <Link 
                                            to='/' 
                                            className="m-2 icon-container"
                                        >
                                            <Button type='button' htmlType='button' className='' text={<span>Start for free<i className="fa-light fa-chevron-right m-2"></i></span>} />
                                        </Link>
                                        {/* Hamburger icon for Drawer toggle */}
                                        {isDesktop ? <i className={`fa-light ${toggle} nav-icons mr-2`} style={{ cursor: 'pointer' }} onClick={toggleDrawer}></i>:null}
                                    </>
                                :
                                isDesktop ?
                                    <>
                                        {renderLinks()}
                                        {/* <Link to="/messages" className="m-2 icon-container">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-light fa-message-lines nav-icons"></i>
                                                {isDesktop?<span className='text-dark ms-1'>Messages</span>:null}
                                            </div>
                                        </Link> */}
                                    </>:
                                    null
                                    }
                                
                            </span>
                    </div>
                </Container>
            </Navbar>

            {/* Bottom Navbar for mobile and tablet */}
            {(isMobile || isTablet) ? <BottomNavbar renderLinks={renderLinks} /> : null}
            {/* Drawer component */}
            <Drawer
                title="Navigation"
                placement="left"
                onClose={toggleDrawer}
                visible={isDrawerVisible}
            >
                {links.map((link, index) => (
                    <p key={index}><Link to={link.url} className={`${activeLink === link.url ? 'text-light fw-bold' : 'text-dark'}`}>{link.icon}<span className='ms-3'>{link.name}</span></Link></p>
                ))}
                {isloggedIn?<Link 
                    to='/logout' 
                    className="m-2 icon-container"
                >
                    <Button type='button' htmlType='button' className='' text={<span>Logout <i className="fa-light fa-left-to-bracket m-2"></i></span>} />
                </Link>:<Link 
                    to='/login' 
                    className="m-2 icon-container"
                >
                    <Button type='button' htmlType='button' className='' text={<span>Login<i className="fa-light fa-right-to-bracket m-2"></i></span>} />
                </Link>}
                
            </Drawer>
        </>
    );
};

export default Header;
