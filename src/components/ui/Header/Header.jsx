import React,{ useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar } from 'react-bootstrap';
import Logo from '../../../assets/oahse-logo.png';
import Logolight from '../../../assets/oahse-logo-light.png';
import Globe from '../../icons/globe';
import Button from '../Button/Button';
import Sidebar from '../SideBar/SideBar';
import './Header.css';


function Header({ Companyname, isScrolled,isMobile, user }) {
    
    const [sidebarstate, setSidebarState] = useState({ 
        visible: false, 
        placement: 'left', 
        title: 'Oahse', 
        items: [<><Globe width={22} height={22} color={'black'} /><span className='m-1 fw-bold'>English</span></>, 
            <span className='m-1 fw-bold'>Become A Supplier</span>] 
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
                                        href='/shop'
                                        onClick={() => console.log('Button clicked')}
                                        />

                            </span>
                        </span>
                    </span>
                    {isMobile?<span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><i className={`fa-light ${sidebarstate.visible?'fa-x':'fa-bars'} `} style={{ fontSize: '24px' }} onClick={showDrawer}></i></span>:null}
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
