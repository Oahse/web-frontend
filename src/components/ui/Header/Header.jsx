import React,{ useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar } from 'react-bootstrap';
import Logo from '../../../assets/oahse_logo_text_dark.png';
import Logolight from '../../../assets/oahse_logo_text_light.png';

import Sidebar from '../SideBar/SideBar';
import './Header.css';
import { useNavigate,useLocation } from 'react-router-dom';
import {useCountryByLocation} from '../../../hooks/useCountry';
import { Avatar } from 'antd';
import NavLinks from './NavLinks';
import SideNavLinks from './SideNavLinks';


function Header({ Companyname, isScrolled,isMobile, user }) {
    const navigate = useNavigate();
    const { country, error } = useCountryByLocation();
    // console.log(country,'=========')
    const location = useLocation(); // Get the current location
    if (location.pathname === '/shop') {
        console.log('Current URL is /shop');
        // Perform actions specific to the /shop route
    }

    const sidebarlinks = SideNavLinks({ location, isScrolled, country });
    const [sidebarstate, setSidebarState] = useState({ 
        visible: false, 
        placement: 'left', 
        title: 'Oahse', 
        items: sidebarlinks
 
      });
    
    const showDrawer = () => {
        console.log(sidebarstate)
        setSidebarState((prevState) => ({
            ...prevState, // spread previous state
            visible: true, // update only the `visible` property
          }));
      };
    
    const onClose = () => {
        setSidebarState((prevState) => ({
            ...prevState, // spread previous state
            visible: false, // update only the `visible` property
          }));
      };
    
    const onChange = e => {
        setSidebarState((prevState) => ({
            ...prevState, // spread previous state
            placement: e.target.value,
          }));
        
      };
    return (
        <nav className={`navbar`}>
            <Container className={`${isScrolled ? 'header-scrolled bg-white' : 'bg-none'}`} fluid={isScrolled}>
                <Navbar.Brand href="/">
                    <img
                    src={`${isScrolled ? Logo : Logolight}`}
                    width="70"
                    className="navbar-logo"
                    alt={`${Companyname} Logo`}
                    />
                    
                    
                    {/* <span className="navbar-title">{Companyname}</span> */}
                </Navbar.Brand>

                {/* Align this div to the right */}
                <div className="d-flex align-items-center">
                    <NavLinks isMobile={isMobile} isScrolled={isScrolled} location={location} country={country}/>
                    
                    {isMobile?<span className={`p-1 mx-2  ${isScrolled ? 'text-black' : 'text-white '}`}><i className={`fa-light ${sidebarstate.visible?'fa-x':'fa-bars'} m-auto`} style={{ fontSize: '24px' }} onClick={showDrawer}></i></span>:null}
                </div>
            </Container>
            {/* Sidebar component */}
            <Sidebar
                logo={Logo}
                visible={sidebarstate.visible}
                onClose={onClose}
                placement={sidebarstate?.placement}
                title={sidebarstate.title}
                items={sidebarstate.items}
                user={user}
            />
            {/* Bottom Navbar for mobile and tablet */}
            {/* {(isMobile || isTablet) ? <BottomNavbar renderLinks={renderLinks} /> : null} */}
            
        </nav>
        
    );
}

// Prop Validation
Header.propTypes = {
  Companyname: PropTypes.string.isRequired, // Companyname must be a string and is required
  isScrolled: PropTypes.bool.isRequired,   // isScrolled must be a boolean and is required
};

export default Header;
