import React, { useEffect } from 'react';
import { Avatar, Drawer} from 'antd';
import './SideBar.css';
import Text from '../Typography/Text';
import Button from '../Button/Button';

const Sidebar = ({ logo, visible, onClose, placement, title,items,user }) => {

    // Disable scrolling when drawer is visible
  useEffect(() => {
    
    if (visible) {
        document.body.style.overflow = 'hidden'; // Disable scrolling
        document.body.style.position = 'fixed';
        document.body.style.width = '100%'; // Prevent layout shift
      } else {
        document.body.style.position = '';
        document.body.style.width = ''; // Reset to normal
        document.body.style.overflow = ''; // Enable scrolling
      }
      
  }, [visible]);
    
    return (
        <Drawer
        className='sidebar'
        title={<span className='d-flex flex-row'><Avatar size={40} icon={logo} className='mr-3'/><span className='m-auto'>{title}</span></span>}
        
        placement={placement}
        closable={false}
        onClose={onClose}
        open={visible}
        footer={<div className='sidebar-footer m-auto'>
            {!user?.isloggedin?
            <span className='d-flex flex-row'>
              <Button
                type='link'
                text="Login"
                color="secondary"
                className='fw-500 m-auto'
                href={'/login'}
                onClick={() => console.log('Button clicked')}
                startIcon={<i className="fa-thin fa-right-to-bracket"></i>}
              />
            </span>
            :
            <span className='d-flex flex-row'>
                <Avatar size={40}/> 
                <span className='ms-4'>
                    {user?.email}
                    <Text fontWeight='fw-500' fontSize='fs-md'>{user?.firstname}{user?.lastname}</Text>
            
                    </span>    
                </span>}
        </div>}
        >
        <div>
            {items && items.map((item, index) => (
            <p key={index}>{item}</p>
            ))}
        </div>
        
        </Drawer>
    );
};

export default Sidebar;
