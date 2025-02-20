import React from 'react';
import Globe from '../../icons/globe';
import Button from '../Button/Button';
import { Avatar } from 'antd';
import CategoryDropDown from './NavLinks/Components/CategoryDropdown';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

/**
 * NavLinks Component
 * @param {boolean} isMobile - Indicates if the device is mobile.
 * @param {boolean} isScrolled - Indicates if the page has been scrolled.
 * @param {object} location - The current location object (e.g., from react-router).
 * @param {object} country - The country object containing `country` name and `flag`.
 * @returns {JSX.Element} - The navigation links.
 */

const NavLinks = ({ isMobile, isScrolled, location, country }) => {
    // console.log(isMobile, isScrolled, location, country)
    return (
        <span className="d-flex flex-row align-items-center">
            {isMobile ? (
              <>
                {location.pathname === '/' ? (
                  <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><Button
                              type='link'
                              text="Start for Free"
                              color="primary"
                              href='/shop'
                              onClick={() => console.log('Button clicked')}
                              />

                  </span>
                  )

                  : location.pathname === '/admin/dashboard' ?(
                    <>
                      <Link to="/user" className={`mx-2 p-1 ${isScrolled ? 'text-black' : 'text-white '}`} >
                        <Icon icon="circum:mail" width="25" height="25" />
                      </Link> <Link to="/user" className={`mx-2 p-1 ${isScrolled ? 'text-black' : 'text-white '}`} >
                        <Icon icon="material-symbols-light:notifications-outline-rounded" width="25" height="25" />
                      </Link> 
                      <Link to="/user" className={`mx-2 p-1 ${isScrolled ? 'text-black' : 'text-white '}`} >
                        <Icon icon="ph:user-light" width="25" height="25" />
                      </Link> 
                    </>
                  ): (
                    <>
                      <Link to="/message" className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`} >
                        <Icon icon="circum:mail" width="25" height="25" />
                      </Link> 
                      
                      <Link to="/cart" className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`} >
                        <Icon icon="hugeicons:shopping-basket-01" width="24" height="24" />
                      </Link> 
                      <Link to="/user" className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`} >
                        <Icon icon="ph:user-light" width="25" height="25" />
                      </Link> 
                    </>
                  )
                }
              </>
            ) : (
              <>
                {location.pathname === '/' ?(
                  <>
                    <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><Globe width={22} height={22} color={`${isScrolled ? 'black' : 'white'}`} /><span className='m-1 fw-bold'>English</span></span>
                    <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><span className='m-1 fw-bold'>Become A Supplier</span></span>
                    
                    <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}>
                          <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><Button
                                      type='link'
                                      text="DashBoard"
                                      color="primary"
                                      href='/admin/dashboard'
                                      onClick={() => console.log('Button clicked')}
                                      />

                          </span>
                      </span>
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
                  </>
                ):
                
                  
                    location.pathname === '/admin/dashboard' ?(
                      <>
                        <Link to="/user" className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`} >
                          <Icon icon="circum:mail" width="25" height="25" />
                        </Link> <Link to="/user" className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white '}`} >
                          <Icon icon="material-symbols-light:notifications-outline-rounded" width="25" height="25" />
                        </Link> 
                        <Link to="/user" className={`p-1 text-black`} >
                          <Icon icon="ph:user-light" width="25" height="25" />
                        </Link> 
                      </>
                    ): (
                      <>
                        <CategoryDropDown isScrolled={isScrolled} />
                        
                        <span className={`mx-3 disabled p-1`}>
                          <span className='m-1 fw-bold d-flex flex-row align-items-center'>
                            {country?.country}
                            <Avatar className='fs-lg ms-1' shape='square' src={country?.flag} size={18} />
                          </span>
                        </span>
                        <span className={`mx-3 p-1 disabled `}>
                          <Globe width={22} height={22} className='disabled' />
                          <span className='m-1 fw-bold'>English</span>
                        </span>
                        
                        <Link to="/message" className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`} >
                          <Icon icon="circum:mail" width="25" height="25" />
                        </Link> 
                        
                        <Link to="/cart" className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`} >
                          <Icon icon="hugeicons:shopping-basket-01" width="24" height="24" />
                        </Link> 
                        <Link to="/user" className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`} >
                          <Icon icon="ph:user-light" width="25" height="25" />
                        </Link> 
                          
                      </>
                    )}
                  
                  
                
              </>
            )}
        </span>
    );
};

export default NavLinks;
