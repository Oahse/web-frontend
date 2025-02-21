import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Navbar, Nav } from 'react-bootstrap';
import { Drawer, Menu } from 'antd';
import './BottomNavBar.css';

const BottomNavbar = ({ items, onActivePage, user,draweritems }) => {
  const [open, setOpen] = useState(false); // Start with the drawer closed

  const showDrawer = () => {
    setOpen(!open); // Toggle the drawer visibility
  };

  const handleActivePage = (item, index) => {
    console.log(item,index)
    onActivePage && onActivePage(item, index); // Call onActivePage handler when an item is clicked
  };

  return (
    <div>
      {/* Drawer component */}
      <Drawer 
        placement="bottom" 
        closable={false} 
        visible={open} 
        onClose={showDrawer}
        style={{ zIndex: 10}}  // Ensure drawer is above other content
      >
        {/* Title centered at the top */}
        <div className="drawer-title">
            <span onClick={showDrawer} ></span>
        </div>

        <Menu theme="light" mode='vertical' >
            {draweritems.slice(3, draweritems.length).map((item, index) => (
            <Menu.Item key={index+3} onClick={()=>handleActivePage(item, index+3)}>{item}</Menu.Item>
            ))}
        </Menu>
      </Drawer>

      {/* Bottom Navbar */}
      <Navbar fixed="bottom" bg="light" className="bottomnavbar px-4">
        <Nav className="d-flex justify-content-between w-100 py-0">
          {/* Render navigation items dynamically */}
          {items.slice(0, 3).map((item, index) => (
            <span key={index} onClick={() => handleActivePage(item, index)}>
              {item}
            </span>
          ))}
          
          {/* User Icon */}
          <Icon icon="ph:user-light" width="25" height="25" />

          {/* Ellipsis Icon to toggle Drawer */}
          <Icon icon="ant-design:ellipsis-outlined" width="25" height="25" onClick={showDrawer} />
        </Nav>
      </Navbar>
    </div>
  );
};

export default BottomNavbar;
