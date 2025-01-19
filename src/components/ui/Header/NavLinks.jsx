import React from 'react';
import Globe from '../../icons/globe';
import Button from '../Button/Button';
import { Avatar, Dropdown, Space  } from 'antd';
/**
 * NavLinks Component
 * @param {boolean} isMobile - Indicates if the device is mobile.
 * @param {boolean} isScrolled - Indicates if the page has been scrolled.
 * @param {object} location - The current location object (e.g., from react-router).
 * @param {object} country - The country object containing `country` name and `flag`.
 * @returns {JSX.Element} - The navigation links.
 */


const items = [
  {
    key: '1',
    type: 'group',
    label: 'Group title',
    children: [
      {
        key: '1-1',
        label: '1st menu item',
      },
      {
        key: '1-2',
        label: '2nd menu item',
      },
    ],
  },
  {
    key: '2',
    label: 'sub menu',
    children: [
      {
        key: '2-1',
        label: '3rd menu item',
      },
      {
        key: '2-2',
        label: '4th menu item',
      },
    ],
  },
  {
    key: '3',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      {
        key: '3-1',
        label: '5d menu item',
      },
      {
        key: '3-2',
        label: '6th menu item',
      },
    ],
  },
];
const CategoryDropDown = ({isScrolled}) => {
  return (
    <Dropdown
        menu={{
          items,
        }}
        className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}
      >
        <a onClick={(e) => e.preventDefault()}>
          <span className='m-1 fw-bold d-flex flex-row align-items-center'>
            <i className="fa-light fa-list fs-lg me-1"></i>Categories
          </span>
        </a>
      </Dropdown>
  )
}

const NavLinks = ({ isMobile, isScrolled, location, country }) => {
    // console.log(isMobile, isScrolled, location, country)
  return (
    <span className="d-flex flex-row align-items-center">
      {isMobile ? (
        <>
          {location.pathname === '/' && (
            <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><Button
                        type='link'
                        text="Start for Free"
                        color="primary"
                        href='/shop'
                        onClick={() => console.log('Button clicked')}
                        />

            </span>
          )}

          {location.pathname === '/shop' && (
            <>
              <span className={`mx-2 p-1  ${isScrolled ? 'text-black' : 'text-white'}`}>
                <i className="fa-light fa-list fs-lg"></i>
              </span>
              
              <span className={`mx-2 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}>
                <i className="fa-light fa-message-lines fs-lg"></i>
              </span>
              <span className={`mx-2 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}>
                <i className="fa-light fa-cart-shopping fs-lg"></i>
              </span>
            </>
          )}
        </>
      ) : (
        <>
          {location.pathname === '/' && (
            <>
              <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><Globe width={22} height={22} color={`${isScrolled ? 'black' : 'white'}`} /><span className='m-1 fw-bold'>English</span></span>
              <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><span className='m-1 fw-bold'>Become A Supplier</span></span>
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
          )}

          {location.pathname === '/shop' && (
            <>
              <CategoryDropDown isScrolled={isScrolled} />
              
              <span className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}>
                <span className='m-1 fw-bold d-flex flex-row align-items-center'>
                  {country?.country}
                  <Avatar className='fs-lg ms-1' shape='square' src={country?.flag} size={18} />
                </span>
              </span>
              <span className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}>
                <Globe width={22} height={22} color={`${isScrolled ? 'black' : 'white'}`} />
                <span className='m-1 fw-bold'>English</span>
              </span>
              <span className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}>
                <i className="fa-light fa-message-lines fs-lg"></i>
              </span>
              <span className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}>
                <i className="fa-light fa-cart-shopping fs-lg"></i>
              </span>
              <span className={`mx-3 p-1 ${isScrolled ? 'text-black' : 'text-white'}`}>
                <i className="fa-light fa-user fs-lg"></i>
              </span>
            </>
          )}
        </>
      )}
    </span>
  );
};

export default NavLinks;
