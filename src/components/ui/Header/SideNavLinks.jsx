import React from 'react';
import Globe from '../../icons/globe'; // Adjust import path as necessary
import { Avatar } from 'antd'; // Assuming Avatar is from Ant Design

const SideNavLinks = ({ location, isScrolled, country }) => {
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
                <i className="bi bi-grid-1x2 fs-lg"></i> <span className='ms-2'>Dashboard</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-file-pen fs-lg"></i> <span className='ms-2'>Orders</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="bi bi-archive fs-lg"></i> <span className='ms-2'>Products</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-users fs-lg"></i> <span className='ms-2'>Customers</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-money-bill fs-lg"></i> <span className='ms-2'>Finance</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="bi bi-pie-chart fs-lg"></i> <span className='ms-2'>Analytics</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-percent fs-lg" ></i> <span className='ms-2'>Discount</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-megaphone fs-lg"></i> <span className='ms-2'>Marketing</span>
            </span>
        </span>,
        <span className={`p-1 text-black`}>
            <span className="m-1 fw-bold">
                <i className="fa-light fa-tv fs-lg"></i> <span className='ms-2'>Platform</span>
            </span>
        </span>
      )
  }

  // Return the array of JSX elements
  return links;
};

export default SideNavLinks;
