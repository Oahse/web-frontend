import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import Logo from '../../../assets/oahse_logo_text_dark.png';
import Logolight from '../../../assets/oahse_logo_text_light.png';
import Sidebar from '../SideBar/SideBar';
import './Header.css';
import { useNavigate,useLocation} from 'react-router-dom';
import {useCountryByLocation} from '../../../hooks/useCountry';
import { Layout} from 'antd';
import NavLinks from './NavLinks';
import SideNavLinks from './SideNavLinks';
import SearchInput from '../Input/SearchInput';
import { Icon } from '@iconify/react/dist/iconify.js';


function AdminHeader({ Companyname, isScrolled,isMobile, user,onSearch,onActivePage }) {
    const navigate = useNavigate();
    const { country, error } = useCountryByLocation();
    
    // console.log(country,'=========')
    const location = useLocation(); // Get the current location
    
      const [isVisible, setIsVisible] = useState(false); // State to toggle visibility

      const handleSearchClick = () => {
          setIsVisible(!isVisible); // Toggle visibility when search icon is clicked
      };
      const sidebarlinks = SideNavLinks({ location, isScrolled, country });
    const [sidebarstate, setSidebarState] = useState({ 
        visible: false, 
        placement: 'left', 
        title: 'Oahse', 
        items: sidebarlinks
 
      });
      const showDrawer = () => {
        // console.log(sidebarstate)
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
    const handleActivePage = (item, index)=>{
        onActivePage(item, index);
    }
    
    return (
        <Layout.Header 
            style={{
                display: 'flex',
                justifyContent:'space-between',
                alignItems: 'center',
                paddingLeft:8,
                paddingRight:8,
                backgroundColor:'white'
            }} >
                
            <Navbar.Brand href="/">
                            <img
                            src={`${isScrolled ? Logo : Logolight}`}
                            width="70"
                            className="navbar-logo mb-2 ml-4"
                            alt={`${Companyname} Logo`}
                            />
                {/* <span className="navbar-title">{Companyname}</span> */}
            </Navbar.Brand>
            {(!isMobile && onSearch) && 
                    <div className="d-flex align-items-center mt-3 mx-auto" style={{minWidth:'400px'}} >
                        <SearchInput placeholder='Search Products' onSearch={onSearch} style={{width:'100%'}} />
                    </div>
                }
            
            {/* Align this div to the right */}
            <div className="d-flex align-items-center">
                {/* admin searchbar */}
                {(isMobile && onSearch) && 
                <div className="d-flex flex-row align-items-right">
                    <span className={`mx-2 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}  onClick={handleSearchClick} style={{cursor:'pointer'}}>
                        <Icon icon="iconamoon:search-thin" width="24" height="24"onClick={handleSearchClick}/>                
                    </span> 
                    <div 
                        className="d-flex align-items-center " 
                        style={{
                            position: 'absolute',  // Position input absolutely
                            top: '100%',  // Position below the icon
                            left: 0,
                            right: 0,
                            padding:'8px',
                            visibility: isVisible ? 'visible' : 'hidden',  // Toggle visibility
                            opacity: isVisible ? 1 : 0,  // Fade in/out effect
                            transition: 'visibility 0.3s, opacity 0.3s',  // Smooth transition for visibility
                            zIndex: 10,  // Make sure it appears above other elements
                        }}
                    >
                        <SearchInput placeholder='Search Products' className={' shadow-lg'} onSearch={onSearch} style={{width:'100%'}} />
                    </div>
                </div>}
                <NavLinks isMobile={isMobile} isScrolled={isScrolled} location={location} country={country}/>
                {isMobile?<span className={`p-1 mx-2  ${isScrolled ? 'text-black' : 'text-white '}`}>
                    {sidebarstate.visible?
                    <Icon icon="iconamoon:close-thin" width="25" height="25" onClick={showDrawer} style={{cursor:'pointer'}} />:

                    <Icon icon="heroicons:bars-3-solid" width="25" height="25" onClick={showDrawer} style={{cursor:'pointer'}} /> }
                    
                    </span>:null}
            </div>
            
            {/* Sidebar component */}
            {isMobile && <Sidebar
                isMobile={isMobile}
                logo={Logo}
                visible={sidebarstate.visible}
                onClose={onClose}
                placement={sidebarstate?.placement}
                title={sidebarstate.title}
                items={sidebarstate.items}
                user={user}
                onActivePage={handleActivePage}
            />}
            
        </Layout.Header>
        
        
        
    );
}

// Prop Validation
AdminHeader.propTypes = {
  Companyname: PropTypes.string.isRequired, // Companyname must be a string and is required
  isScrolled: PropTypes.bool.isRequired,   // isScrolled must be a boolean and is required
};

export default AdminHeader;
