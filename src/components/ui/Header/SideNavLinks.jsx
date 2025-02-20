import React from 'react';
import Globe from '../../icons/globe'; // Adjust import path as necessary
import { Avatar } from 'antd'; // Assuming Avatar is from Ant Design
import Button from '../Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';

const SideNavLinks = ({ location, isScrolled, country, label }) => {
    // console.log(location,isScrolled, country?.country,'+++++++')
  // Initialize an array to hold the JSX elements
  const links = [];

  // Conditional links based on the path
  if (location.pathname === '/') {
    links.push(
      <span className={`p-1 text-black`} key="english">
        <Globe width={22} height={22} color="black" />
        <span className="m-1 fw-bold">English</span>
      </span>,
      <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}>
        <span className={`p-1 ${isScrolled ? 'text-black' : 'text-white '}`}><Button
                    type='link'
                    text="DashBoard"
                    color="primary"
                    href='/admin/dashboard'
                    onClick={() => console.log('Button clicked')}
                    />

        </span>
    </span>,
      <span className="m-1 fw-bold" key="become-supplier">Become A Supplier</span>,
      <span className="m-1 fw-bold" key="user">
        <i className="fa-light fa-user fs-lg"></i>
      </span>
    );
  }

  if (location.pathname === '/shop') {
    links.push(
      
        <span className={`p-1 text-black`} key="country">
            <Avatar className="text-black" shape="square" src={country?.flag} size={20} />
            <span className="m-1 fw-bold">{country?.country}sfsfs</span>
        </span>,
      
        <span className={`p-1 text-black`} key="english-shop">
            <Globe width={22} height={22} color={`black`} />
            <span className="m-1 fw-bold">English</span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-user fs-lg"></i>
            </span>
        </span>
    );
  }
  if (location.pathname === '/admin/dashboard') {
      links.push(
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <Icon icon="bi:grid-1x2" width="16" height="16" /> <span className='ms-1'>{label && 'Dashboard'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <Icon icon="lsicon:order-edit-outline" width="22" height="22" strokeWidth={1} /><span className='ms-1'>{label && 'Orders'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <Icon icon="bi:archive" width="16" height="16" /> <span className='ms-1'>{label && 'Products'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <Icon icon="ph:user-list-light" width="25" height="25" /> <span className='ms-1'>{label && 'Customers'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <Icon icon="mingcute:content-ai-line" width="25" height="25" strokeWidth={0.5}  /> <span className='ms-1'>{label && 'Content'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <Icon icon="map:finance" width="25" height="25" /> <span className='ms-1'>{label && 'Finance'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
            <Icon icon="arcticons:google-analytics" width="25" height="25" strokeWidth={2} /><span className='ms-2'>{label && 'Analytics'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <Icon icon="streamline:discount-percent-circle" width="24" height="24" strokeWidth={0.5} />  <span className='ms-2'>{label && 'Discount'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-megaphone fs-lg"></i> <span className='ms-2'>{label && 'Marketing'}</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-tv fs-lg"></i> <span className='ms-2'>{label && 'Platform'}</span>
            </span>
        </span>
      )
  }

  // Return the array of JSX elements
  return links;
};

export default SideNavLinks;
