
import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import { Navbar, Nav } from 'react-bootstrap';

import { Drawer } from 'antd';
import './BottomNavBar.css';
const BottomNavbar = ({ items,onActivePage,user }) => {
    const [open, setOpen] = useState(true);
    const showDrawer = () => {
        setOpen(!open);
    };
    
    const handleActivePage = (item, index)=>{
        onActivePage && onActivePage(item, index);
      }
    return (
        <div>
            {/* <div className={`drawer ${open?'drawer-open':'drawer-close'}`}>
                    sdsdsd
            </div> */}
            <Navbar fixed="bottom" bg="light" className="bottomnavbar px-4">
                
                
                <Nav className="d-flex justify-content-between w-100 py-0">
                    {items.slice(0,3).map((item, index) => (
                        <span onClick={()=>handleActivePage(item, index)}>{item}</span>
                    ))}
                    <Icon icon="ph:user-light" width="25" height="25" />
                    <Icon icon="ant-design:ellipsis-outlined" width="25" height="25" onClick={showDrawer} />
                </Nav>
            </Navbar>
        </div>
    );
};

export default BottomNavbar;
